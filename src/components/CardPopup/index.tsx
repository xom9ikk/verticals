/* eslint-disable no-nested-ternary */
import React, {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import {
  EnumColors, EnumTodoStatus, EnumTodoType, ITodo,
} from '@/types';
import { Checkbox } from '@comp/Checkbox';
import { IRootState } from '@/store/reducers/state';
import { SystemActions, TodosActions } from '@/store/actions';
import { Menu } from '@comp/Menu';
import { Loader } from '@comp/Loader';
import { CardContextMenu } from '@comp/CardContextMenu';
import { TextArea } from '@comp/TextArea';
import { Comments } from '@comp/Comments';
import { forwardTo } from '@/router/history';
import { useShiftEnterRestriction } from '@/use/shiftEnterRestriction';

interface ICardPopup {
  columnId: number;
  cardType: EnumTodoType;
}

export const CardPopup: FC<ICardPopup> = ({
  columnId,
  cardType,
}) => {
  const dispatch = useDispatch();

  const {
    todos,
    system: { activeTodoId, activeBoardReadableId },
  } = useSelector((state: IRootState) => state);

  const [todo, setTodo] = useState<ITodo>();
  const [isProgress, setIsProgress] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string | undefined>(todo?.title);
  const [descriptionValue, setDescriptionValue] = useState<string | undefined>(todo?.description);
  const { shiftEnterRestriction } = useShiftEnterRestriction();

  const titleInputRef = useRef<any>(null);

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

  const closeHandler = () => forwardTo(`/userId/${activeBoardReadableId}`);

  const changeStatusHandler = () => {
    const newStatus = todo!.status === EnumTodoStatus.Done
      ? EnumTodoStatus.Todo
      : EnumTodoStatus.Done;
    dispatch(TodosActions.updateCompleteStatus({
      id: todo!.id,
      status: newStatus,
    }));
  };

  useEffect(() => {
    setTodo(todos.find((t: ITodo) => t.id === activeTodoId && t.columnId === columnId));
  }, [activeTodoId, todos]);

  useEffect(() => {
    setTitleValue(todo?.title);
    setDescriptionValue(todo?.description);
  }, [todo]);

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
    if (!todo || todo.title === titleValue) return;
    debounceSave(todo!.id, {
      newTitle: titleValue,
    });
  }, [titleValue]);

  useEffect(() => {
    if (!todo || todo.description === descriptionValue) return;
    debounceSave(todo!.id, {
      newDescription: descriptionValue,
    });
  }, [descriptionValue]);

  // @ts-ignore
  const colorClass = todo?.color !== undefined ? `card-popup__inner--${Object.values(EnumColors)[todo.color]?.toLowerCase()}` : '';

  const memoCardPopup = useMemo(() => (
    <>
      {
            todo ? (
              <div
                className={`card-popup ${todo ? 'card-popup--opened' : ''}`}
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
                        todo.status === EnumTodoStatus.Doing ? (
                          <div
                            className="card__overlay-doing"
                            style={{
                              marginTop: 6,
                              width: 9,
                              height: 18,
                            }}
                          />
                        ) : todo.status === EnumTodoStatus.Canceled ? (
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
                          isActive={todo.status === EnumTodoStatus.Done}
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
                          id={todo.id}
                          columnId={todo.columnId}
                          isArchived={todo.isArchived}
                          isActive={false}
                          isHover
                          isNotificationsEnabled={todo.isNotificationsEnabled}
                          color={todo.color}
                          status={todo.status}
                          size={36}
                          imageSize={24}
                          isPrimary
                          isColored
                          onStartEdit={() => {
                                titleInputRef.current?.focus();
                          }}
                          onChangeColor={(newColor) => {
                            dispatch(TodosActions.updateColor({
                              id: todo.id,
                              color: todo.color !== newColor ? newColor : null,
                            }));
                          }}
                        />
                      </div>
                      <Menu
                        imageSrc={`/assets/svg/bell${todo.isNotificationsEnabled ? '-active' : ''}.svg`}
                        tooltip={`Turn ${todo.isNotificationsEnabled ? 'off' : 'on'} card notifications`}
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
                            id: todo.id,
                            isNotificationsEnabled: !todo.isNotificationsEnabled,
                          }));
                        }}
                      />
                    </div>
                    <hr />
                  </div>
                  <Comments todoId={activeTodoId!} />
                </div>
              </div>
            ) : (
              <div className="card-popup" />
            )
          }
    </>
  ),
  [todo, titleValue, descriptionValue, isProgress, cardType]);

  return (
    <>
      { memoCardPopup }
    </>
  );
};
