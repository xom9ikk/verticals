import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { EnumCardType, EnumTodoStatus, IColor } from '@type/entities';
import { Bullet } from '@comp/Bullet';
import { DateBadge } from '@comp/DateBadge';
import { TextArea } from '@comp/TextArea';
import { CardPopupToolbar } from '@comp/CardPopup/Toolbar';
import { TodoContextMenu } from '@comp/Card/Todo/ContextMenu';
import { useTranslation } from 'react-i18next';
import { useShiftEnterRestriction } from '@use/shiftEnterRestriction';
import { useFocus } from '@use/focus';
import { useEffectState } from '@use/effectState';
import { useDebounce } from '@use/debounce';
import { useNewValues } from '@use/newValues';
import { Loader } from '@comp/Loader';

interface ICardPopupHeader {
  cardId: number;
  parentId: number;
  title: string;
  description?: string;
  cardType: EnumCardType;
  status: EnumTodoStatus;
  color: IColor;
  expirationDate: Date | null;
  isNotificationsEnabled: boolean;
  onChangeStatus: (status: EnumTodoStatus) => void;
  onSelectDate: (date: Date | null) => void;
  onChangeColor: (color: IColor) => void;
  onSwitchNotifications: () => void;
  onSave: (title: string, description?: string) => void;
}

export const CardPopupHeader: FC<ICardPopupHeader> = ({
  cardId,
  parentId,
  title,
  description,
  cardType,
  status,
  color,
  expirationDate,
  isNotificationsEnabled,
  onChangeStatus,
  onSelectDate,
  onChangeColor,
  onSwitchNotifications,
  onSave,
}) => {
  const { t } = useTranslation();
  const { shiftEnterRestriction } = useShiftEnterRestriction();
  const { focus } = useFocus();
  const { isNewValues } = useNewValues();

  const titleInputRef = useRef<any>(null);

  const [isProgress, setIsProgress] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useEffectState<string>(title);
  const [descriptionValue, setDescriptionValue] = useEffectState<string | undefined>(description);

  const debounceSave = useDebounce(({ old, newValue }) => {
    const isNew = isNewValues([old.title, newValue.title], [old.description, newValue.description]);
    if (isNew) {
      setIsProgress(true);
      onSave(newValue.title, newValue.description);
    }
  }, 500);

  const handleChangeText = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  const handleStartEdit = () => {
    focus(titleInputRef);
  };

  useEffect(() => {
    debounceSave({
      old: { title, description },
      newValue: { title: titleValue, description: descriptionValue },
    });
  }, [titleValue, descriptionValue]);

  useEffect(() => {
    if (isProgress) {
      const timeout = setTimeout(() => {
        setIsProgress(false);
      }, 800);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isProgress]);

  return (
    <>
      <Loader
        isOpen={isProgress}
        style={{
          position: 'absolute',
          right: 40,
          top: 7,
        }}
      />
      <div className="card-popup__header">
        <div className="card-popup__input-container">
          {cardType === EnumCardType.Checkboxes && (
            <Bullet
              type={cardType}
              status={status}
              onChangeStatus={onChangeStatus}
              size="large"
              style={{ margin: '5px' }}
            />
          )}
          <DateBadge
            popupId={`card-popup-${cardId}`}
            position="bottom"
            style={{
              position: 'absolute',
              top: 5,
              left: 25,
            }}
            date={expirationDate}
            onSelectDate={onSelectDate}
          />
          <div className="card-popup__textarea-inner">
            <TextArea
              ref={titleInputRef}
              className="card__textarea card-popup__textarea"
              placeholder={t('Card Title')}
              value={titleValue || ''}
              onKeyDown={shiftEnterRestriction}
              onChange={(event: any) => handleChangeText(event, false)}
              minRows={1}
              maxRows={3}
            />
            <TextArea
              className="card__textarea card-popup__textarea card-popup__textarea--description"
              placeholder={t('Notes')}
              value={descriptionValue || ''}
              onKeyDown={shiftEnterRestriction}
              onChange={(event: any) => handleChangeText(event, true)}
              minRows={1}
              maxRows={3}
            />
          </div>
        </div>
        <CardPopupToolbar
          cardId={cardId!}
          isNotificationsEnabled={isNotificationsEnabled!}
          expirationDate={expirationDate}
          onSwitchNotifications={onSwitchNotifications}
          onSelectDate={onSelectDate}
        >
          <TodoContextMenu
            menuId="popup"
            todoId={cardId}
            title={title}
            headingId={parentId}
            isActive={false}
            isNotificationsEnabled={isNotificationsEnabled}
            expirationDate={expirationDate}
            color={color}
            status={status}
            size={36}
            imageSize={24}
            isPrimary
            isColored
            isTransformedPosition={false}
            onStartEdit={handleStartEdit}
            onChangeColor={onChangeColor}
          />
        </CardPopupToolbar>
      </div>
    </>
  );
};
