/* eslint-disable no-nested-ternary */
import React, {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import {
  EnumDroppedZoneType, EnumTodoStatus, EnumTodoType,
} from '@type/entities';
import {
  CommentAttachmentsActions, CommentsActions, SystemActions, TodosActions,
} from '@store/actions';
import { Loader } from '@comp/Loader';
import { CardContextMenu } from '@comp/CardContextMenu';
import { TextArea } from '@comp/TextArea';
import { Comments } from '@comp/Comments';
import { forwardTo } from '@router/history';
import { useShiftEnterRestriction } from '@use/shiftEnterRestriction';
import {
  getActiveBoardReadableId,
  getActiveTodoId,
  getTodoById,
  getUsername,
} from '@store/selectors';
import { Bullet } from '@comp/Bullet';
import { DropZone } from '@comp/DropZone';
import { ControlButton } from '@comp/ControlButton';
import { useColorClass } from '@use/colorClass';

interface ICardPopup {
  columnId: number;
  cardType: EnumTodoType;
}

export const CardPopup: FC<ICardPopup> = ({
  columnId,
  cardType,
}) => {
  const dispatch = useDispatch();
  const { shiftEnterRestriction } = useShiftEnterRestriction();

  const titleInputRef = useRef<any>(null);

  const activeTodoId = useSelector(getActiveTodoId);
  const activeTodo = useSelector(getTodoById(activeTodoId));
  const activeBoardReadableId = useSelector(getActiveBoardReadableId);
  const username = useSelector(getUsername);

  const colorClass = useColorClass('card-popup__inner', activeTodo?.color);

  const [titleValue, setTitleValue] = useState<string>();
  const [descriptionValue, setDescriptionValue] = useState<string>();
  const [isProgress, setIsProgress] = useState<boolean>(false);

  const debounceSave = useCallback(
    debounce((id: number, { newTitle, newDescription } : any) => {
      setIsProgress(true);
      if (newTitle) {
        dispatch(TodosActions.updateTitle({
          id,
          title: newTitle,
        }));
      }
      if (newDescription) {
        dispatch(TodosActions.updateDescription({
          id,
          description: newDescription,
        }));
      }
    }, 500),
    [],
  );

  const handleChangeText = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  const handleClose = () => {
    forwardTo(`/${username}/${activeBoardReadableId}`);
  };

  const handleChangeStatus = (newStatus: EnumTodoStatus) => {
    dispatch(TodosActions.updateCompleteStatus({
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

  useEffect(() => {
    if (activeTodo && activeTodo.columnId === columnId) {
      setTitleValue(activeTodo.title);
      setDescriptionValue(activeTodo.description);
      dispatch(CommentsActions.fetchByTodoId({ todoId: activeTodo.id }));
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

  const memoCardPopup = useMemo(() => (
    <>
      {
        activeTodo && activeTodo.columnId === columnId ? (
          <div
            className={cn('card-popup', {
              'card-popup--open': activeTodo,
            })}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(SystemActions.setIsOpenPopup(false));
            }}
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
                  size={32}
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
                    <div className="card-popup__textarea-inner">
                      <TextArea
                        ref={titleInputRef}
                        className="card__textarea card-popup__textarea"
                        placeholder="Card Title"
                        value={titleValue}
                        onKeyDown={shiftEnterRestriction}
                        onChange={(event: any) => handleChangeText(event, false)}
                        minRows={1}
                        maxRows={5}
                      />
                      <TextArea
                        className="card__textarea card-popup__textarea card-popup__textarea--description"
                        placeholder="Notes"
                        value={descriptionValue}
                        onKeyDown={shiftEnterRestriction}
                        onChange={(event: any) => handleChangeText(event, true)}
                        minRows={1}
                        maxRows={5}
                      />
                    </div>
                  </div>
                  <div className="card-popup__toolbar">
                    <div>
                      <ControlButton
                        imageSrc="/assets/svg/calendar.svg"
                        tooltip="Date"
                        alt="date"
                        imageSize={24}
                        size={36}
                        isColored
                      />
                      <CardContextMenu
                        id={activeTodo.id}
                        title={activeTodo.title}
                        columnId={activeTodo.columnId}
                        isArchived={activeTodo.isArchived}
                        isActive={false}
                        isHover
                        isNotificationsEnabled={activeTodo.isNotificationsEnabled}
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
                          dispatch(TodosActions.updateColor({
                            id: activeTodo.id,
                            color: newColor,
                          }));
                        }}
                      />
                    </div>
                    <ControlButton
                      imageSrc={`/assets/svg/bell${activeTodo.isNotificationsEnabled ? '-active' : ''}.svg`}
                      tooltip={`Turn ${activeTodo.isNotificationsEnabled ? 'off' : 'on'} card notifications`}
                      alt="notification"
                      imageSize={24}
                      size={36}
                      isColored
                      style={{
                        justifySelf: 'flex-end',
                      }}
                      onClick={() => {
                        dispatch(TodosActions.updateNotificationEnabled({
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
        )
      }
    </>
  ),
  [
    activeTodo,
    titleValue,
    descriptionValue,
    isProgress,
    cardType,
  ]);

  return (
    <>
      { memoCardPopup }
    </>
  );
};
