import useKeys from '@rooks/use-keys';
import React, {
  FC, useEffect, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DatePicker } from '@comp/DatePicker';
import { Popup } from '@comp/Popup';
import { SystemActions } from '@store/actions';
import { getActivePopupId } from '@store/selectors';

interface IDatePickerPopup {
  popupId: string;
  sourceRef: any;
  selectedDate?: Date | null;
  onSelectDate: (payload: Date | null) => void;
  position?: 'top' | 'left' | 'right' | 'bottom' | 'normal';
}

export const DatePickerPopup: FC<IDatePickerPopup> = ({
  popupId,
  sourceRef,
  selectedDate = null,
  onSelectDate,
  position = 'right',
}) => {
  const dispatch = useDispatch();
  const activePopupId = useSelector(getActivePopupId);
  const isOpen = useRef<boolean>(false);

  isOpen.current = activePopupId === popupId;

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (isOpen.current) {
      dispatch(SystemActions.setActivePopupId(null));
    } else {
      dispatch(SystemActions.setActivePopupId(popupId));
    }
  };

  const handleEsc = () => {
    dispatch(SystemActions.setActivePopupId(null));
  };

  useKeys(['Escape'], handleEsc, {
    when: isOpen.current,
  });

  useEffect(() => {
    sourceRef.current?.addEventListener('click', handleClick);
    return () => {
      sourceRef.current?.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Popup
      isAbsolute
      isOpen={isOpen.current}
      position={position}
      sourceRef={sourceRef}
      style={{ zIndex: 2 }}
      width={328}
    >
      <DatePicker
        isOpen={isOpen.current}
        onSelectDate={onSelectDate}
        selectedDate={selectedDate}
      />
    </Popup>
  );
};
