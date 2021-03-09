import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  EnumDroppedZoneType, EnumTodoStatus, EnumTodoType,
} from '@type/entities';
import {
  CommentAttachmentsActions, CommentsActions, SystemActions, TodosActions,
} from '@store/actions';
import { redirectTo } from '@router/history';
import {
  getActiveBoardReadableId,
  getActiveTodoId,
  getTodoById,
  getUsername,
} from '@store/selectors';
import { Loader } from '@comp/Loader';
import { Bullet } from '@comp/Bullet';
import { TextArea } from '@comp/TextArea';
import { Comments } from '@comp/Comments';
import { DropZone } from '@comp/DropZone';
import { DateBadge } from '@comp/DateBadge';
import { ControlButton } from '@comp/ControlButton';
import { CardContextMenu } from '@comp/CardContextMenu';
import { DatePickerPopup } from '@comp/DatePicker/Popup';
import { useDebounce } from '@use/debounce';
import { useColorClass } from '@use/colorClass';
import { useShiftEnterRestriction } from '@use/shiftEnterRestriction';
import { useTranslation } from 'react-i18next';

interface ICardPopup {
  columnId: number;
  cardType: EnumTodoType;
}

export const CardPopup: FC<ICardPopup> = ({
  columnId,
  cardType,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { shiftEnterRestriction } = useShiftEnterRestriction();

  const buttonRef = useRef<any>(null);
  const titleInputRef = useRef<any>(null);

  const activeTodoId = useSelector(getActiveTodoId);
  const activeTodo = useSelector(getTodoById(activeTodoId));
  const activeBoardReadableId = useSelector(getActiveBoardReadableId);
  const username = useSelector(getUsername);

  const colorClass = useColorClass('card-popup__inner', activeTodo?.color);

  const [titleValue, setTitleValue] = useState<string>();
  const [descriptionValue, setDescriptionValue] = useState<string>();
  const [isProgress, setIsProgress] = useState<boolean>(false);

  const debounceSave = useDebounce((id: number, { newTitle, newDescription } : any) => {
    setIsProgress(true);
    if (newTitle) {
      dispatch(TodosActions.effect.update({
        id,
        title: newTitle,
      }));
    }
    if (newDescription) {
      dispatch(TodosActions.effect.update({
        id,
        description: newDescription,
      }));
    }
  }, 500);

  const handleChangeText = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  const handleClose = () => {
    redirectTo(`/${username}/${activeBoardReadableId}`);
  };

  const handleChangeStatus = (newStatus: EnumTodoStatus) => {
    dispatch(TodosActions.effect.update({
      id: activeTodo!.id,
      status: newStatus,
    }));
  };

  const handleDropFiles = (files: FileList) => {
    dispatch(SystemActions.setDroppedFiles({
      type: EnumDroppedZoneType.CardPopup,
      files,
    }));
  };

  const handleSelectDate = (selectedDate: Date | null) => {
    dispatch(SystemActions.setActivePopupId(null));
    dispatch(TodosActions.effect.update({
      id: activeTodo!.id,
      expirationDate: selectedDate,
    }));
  };

  useEffect(() => {
    if (activeTodo && activeTodo.columnId === columnId) {
      setTitleValue(activeTodo.title);
      setDescriptionValue(activeTodo.description);
      dispatch(CommentsActions.effects.fetchByTodoId({ todoId: activeTodo.id }));
      dispatch(CommentAttachmentsActions.fetchByTodoId({ todoId: activeTodo.id }));
    }
  }, [activeTodo]);

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

  useEffect(() => {
    if (!activeTodo || activeTodo.title === titleValue) return;
    debounceSave(activeTodo!.id, {
      newTitle: titleValue,
    });
  }, [titleValue]);

  useEffect(() => {
    if (!activeTodo || activeTodo.description === descriptionValue) return;
    debounceSave(activeTodo!.id, {
      newDescription: descriptionValue,
    });
  }, [descriptionValue]);

  return useMemo(() => (activeTodo && activeTodo.columnId === columnId ? (
    <div
      className={cn('card-popup', {
        'card-popup--open': activeTodo,
      })}
      // onClick={() => {
      //   dispatch(SystemActions.setIsOpenPopup(false));
      // }}
    >
      <div
        className={cn('card-popup__inner', {
          [colorClass]: colorClass,
        })}
      >
        <DropZone onOpen={handleDropFiles}>
          <Loader
            isOpen={isProgress}
            style={{
              position: 'absolute',
              right: 40,
              top: 12,
            }}
          />
          <ControlButton
            imageSrc="/assets/svg/close.svg"
            alt="close"
            imageSize={16}
            size={26}
            style={{
              position: 'absolute',
              right: 6,
              top: 6,
            }}
            onClick={handleClose}
          />
          <div className="card-popup__header">
            <div className="card-popup__input-container">
              {
                cardType === EnumTodoType.Checkboxes && (
                <Bullet
                  type={cardType}
                  status={activeTodo.status!}
                  onChangeStatus={handleChangeStatus}
                  size="large"
                  style={{ margin: '5px' }}
                />
                )
              }
              <DateBadge
                popupId="card-popup"
                position="bottom"
                todoId={activeTodoId!}
                style={{
                  position: 'absolute',
                  top: 5,
                  left: 25,
                }}
                date={activeTodo.expirationDate}
                onSelectDate={handleSelectDate}
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
            <div className="card-popup__toolbar">
              <div>
                <ControlButton
                  ref={buttonRef}
                  imageSrc="/assets/svg/calendar.svg"
                  tooltip={t('Date')}
                  alt="date"
                  imageSize={24}
                  size={36}
                  isColored
                />
                <DatePickerPopup
                  popupId={`card-popup-${activeTodoId}`}
                  sourceRef={buttonRef}
                  onSelectDate={handleSelectDate}
                  selectedDate={activeTodo.expirationDate}
                />
                <CardContextMenu
                  menuId="popup"
                  todoId={activeTodo.id}
                  title={activeTodo.title}
                  columnId={activeTodo.columnId}
                  isArchived={activeTodo.isArchived}
                  isActive={false}
                  isHover
                  isNotificationsEnabled={activeTodo.isNotificationsEnabled}
                  isRemoved={activeTodo.isRemoved}
                  expirationDate={activeTodo.expirationDate}
                  color={activeTodo.color}
                  status={activeTodo.status}
                  size={36}
                  imageSize={24}
                  isPrimary
                  isColored
                  isTransformedPosition={false}
                  onStartEdit={() => {
                    titleInputRef.current?.focus();
                  }}
                  onChangeColor={(newColor) => {
                    dispatch(TodosActions.effect.update({
                      id: activeTodo.id,
                      color: newColor,
                    }));
                  }}
                />
              </div>
              <ControlButton
                imageSrc={`/assets/svg/bell${activeTodo.isNotificationsEnabled ? '-active' : ''}.svg`}
                tooltip={`${activeTodo.isNotificationsEnabled
                  ? t('Turn off')
                  : t('Turn on')} ${t('card notifications')}`}
                alt="notification"
                imageSize={24}
                size={36}
                isColored
                style={{
                  justifySelf: 'flex-end',
                }}
                onClick={() => {
                  dispatch(TodosActions.effect.update({
                    id: activeTodo.id,
                    isNotificationsEnabled: !activeTodo.isNotificationsEnabled,
                  }));
                }}
              />
            </div>
            <hr />
          </div>
          <Comments />
        </DropZone>
      </div>
    </div>
  ) : (
    <div className="card-popup" />
  )),
  [
    t,
    activeTodo,
    titleValue,
    descriptionValue,
    isProgress,
    cardType,
  ]);
};
