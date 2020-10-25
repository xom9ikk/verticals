/* eslint-disable no-nested-ternary */
import React, {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import {
  EnumColors, EnumTodoStatus, EnumTodoType,
} from '@/types/entities';
import { Checkbox } from '@comp/Checkbox';
import {
  CommentAttachmentsActions, CommentsActions, SystemActions, TodosActions,
} from '@/store/actions';
import { Menu } from '@comp/Menu';
import { Loader } from '@comp/Loader';
import { CardContextMenu } from '@comp/CardContextMenu';
import { TextArea } from '@comp/TextArea';
import { Comments } from '@comp/Comments';
import { forwardTo } from '@/router/history';
import { useShiftEnterRestriction } from '@/use/shiftEnterRestriction';
import {
  getActiveBoardReadableId,
  getActiveTodoId,
  getTodoById,
  getUsername,
} from '@/store/selectors';

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

  const changeTextHandler = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  const closeHandler = () => forwardTo(`/${username}/${activeBoardReadableId}`);

  const changeStatusHandler = () => {
    const newStatus = activeTodo!.status === EnumTodoStatus.Done
      ? EnumTodoStatus.Todo
      : EnumTodoStatus.Done;
    dispatch(TodosActions.updateCompleteStatus({
      id: activeTodo!.id,
      status: newStatus,
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

  // @ts-ignore
  const colorClass = activeTodo?.color !== undefined ? `card-popup__inner--${Object.values(EnumColors)[activeTodo.color]?.toLowerCase()}` : '';

  const memoCardPopup = useMemo(() => (
    <>
      {
        activeTodo && activeTodo.columnId === columnId ? (
          <div
            className={`card-popup ${activeTodo ? 'card-popup--opened' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(SystemActions.setIsOpenPopup(false));
            }}
          >
            <div className={`card-popup__inner ${colorClass}`}>
              <Loader
                isOpen={isProgress}
                style={{
                  position: 'absolute',
                  right: 40,
                  top: 12,
                }}
              />
              <Menu
                imageSrc="/assets/svg/close.svg"
                alt="close"
                imageSize={24}
                size={30}
                isShowPopup={false}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                }}
                onClick={closeHandler}
              />
              <div className="card-popup__header">
                <div className="card-popup__input-container">
                  {
                    activeTodo.status === EnumTodoStatus.Doing ? (
                      <div
                        className="card__overlay-doing"
                        style={{
                          marginTop: 6,
                          width: 9,
                          height: 18,
                        }}
                      />
                    ) : activeTodo.status === EnumTodoStatus.Canceled ? (
                      <div
                        className="card__overlay-canceled"
                        style={{
                          marginTop: 6,
                          width: 18,
                          height: 18,
                        }}
                      />
                    ) : null
                  }
                  {
                    cardType === EnumTodoType.Checkboxes && (
                    <Checkbox
                      isActive={activeTodo.status === EnumTodoStatus.Done}
                      onChange={changeStatusHandler}
                      style={{
                        marginTop: 6,
                        width: 18,
                        height: 18,
                      }}
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
                      onChange={(event: any) => changeTextHandler(event, false)}
                      minRows={1}
                      maxRows={5}
                    />
                    <TextArea
                      className="card__textarea card-popup__textarea card-popup__textarea--description"
                      placeholder="Notes"
                      value={descriptionValue}
                      onKeyDown={shiftEnterRestriction}
                      onChange={(event: any) => changeTextHandler(event, true)}
                      minRows={1}
                      maxRows={5}
                    />
                  </div>
                </div>
                <div className="card-popup__toolbar">
                  <div>
                    <Menu
                      imageSrc="/assets/svg/calendar.svg"
                      tooltip="Date"
                      alt="date"
                      imageSize={24}
                      size={36}
                      isShowPopup={false}
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
                      onStartEdit={() => {
                            titleInputRef.current?.focus();
                      }}
                      onChangeColor={(newColor) => {
                        dispatch(TodosActions.updateColor({
                          id: activeTodo.id,
                          color: activeTodo.color !== newColor ? newColor : null,
                        }));
                      }}
                    />
                  </div>
                  <Menu
                    imageSrc={`/assets/svg/bell${activeTodo.isNotificationsEnabled ? '-active' : ''}.svg`}
                    tooltip={`Turn ${activeTodo.isNotificationsEnabled ? 'off' : 'on'} card notifications`}
                    alt="notification"
                    imageSize={24}
                    size={36}
                    isShowPopup={false}
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
              <Comments todoId={activeTodo.id} />
            </div>
          </div>
        ) : (
          <div className="card-popup" />
        )
      }
    </>
  ),
  [activeTodo, titleValue, descriptionValue, isProgress, cardType]);

  return (
    <>
      { memoCardPopup }
    </>
  );
};
