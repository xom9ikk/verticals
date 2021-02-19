import React, { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import isFuture from 'date-fns/isFuture';
import isThisYear from 'date-fns/isThisYear';
import isTomorrow from 'date-fns/isTomorrow';
import { SystemActions } from '@store/actions';
import { DatePickerPopup } from '@comp/DatePicker/Popup';

interface IDateBadge {
  popupId: string;
  todoId: number;
  date?: Date;
  position?: 'top' | 'left' | 'right' | 'bottom' | 'normal';
  style?: React.CSSProperties;
}

export const DateBadge: FC<IDateBadge> = ({
  popupId,
  todoId,
  date,
  position = 'right',
  style,
}) => {
  if (!date) {
    return null;
  }

  const dispatch = useDispatch();
  const badgeRef = useRef<any>();

  const today = isToday(date);
  const tomorrow = isTomorrow(date);
  const past = !isFuture(date) && !isToday(date);

  const img = today ? 'star' : 'calendar-2';

  const formattedYear = isThisYear(date) ? '' : `'${format(date, 'yy')}`;
  const formattedDate = `${format(date, 'LLL dd')}${formattedYear}`;

  const handleSelectDate = (selectedDate?: Date) => {
    console.log(selectedDate);
    dispatch(SystemActions.setActivePopupId(null));
  };

  return (
    <>
      <DatePickerPopup
        position={position}
        popupId={`date-badge-${popupId}-${todoId}`}
        sourceRef={badgeRef}
        onSelectDate={handleSelectDate}
      />
      <div
        ref={badgeRef}
        className={cn('date-badge', {
          'date-badge--yellow': today,
          'date-badge--red': past,
        })}
        style={style}
      >
        <img src={`/assets/svg/board/${img}.svg`} alt="badge" />
        {today && <span>Today</span>}
        {tomorrow && <span>Tomorrow</span>}
        {!today && !tomorrow && <span>{formattedDate}</span>}
      </div>
    </>
  );
};
