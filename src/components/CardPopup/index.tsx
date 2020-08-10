import React, {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { icons } from '@/icons';
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

interface ICardPopup {
  columnId: string;
  cardType: EnumTodoType;
}

export const CardPopup: FC<ICardPopup> = ({
  columnId,
  cardType,
}) => {
  const dispatch = useDispatch();
  const { system: { currentTodoId } } = useSelector((state: IRootState) => state);
  const { todos } = useSelector((state: IRootState) => state);
  const [todo, setTodo] = useState<ITodo>();
  const [isProgress, setIsProgress] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string | undefined>(todo?.title);
  const [descriptionValue, setDescriptionValue] = useState<string | undefined>(todo?.description);
  const titleInputRef = useRef<any>(null);

  useEffect(() => {
    setTodo(todos.find((t: ITodo) => t.id === currentTodoId && t.columnId === columnId));
  }, [currentTodoId, todos]);

  useEffect(() => {
    setTitleValue(todo?.title);
    setDescriptionValue(todo?.description);
  }, [todo]);

  const debounceSave = useCallback(
    debounce((id: string, { newTitle, newDescription } : any) => {
      console.log('debounce save', id, newTitle, newDescription);
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

  const colorClass = todo?.color !== undefined ? `card-popup__inner--${Object.keys(EnumColors)[todo.color]?.toLowerCase()}` : '';

  const changeHandler = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  useEffect(() => {
    console.log('new todo', todo);
  }, [todo]);

  const memoCardPopup = useMemo(() => {
    console.log('todo', todo);
    return (
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
                    imageSrc={icons.close}
                    alt="close"
                    imageSize={24}
                    size={30}
                    isShowPopup={false}
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                    }}
                    onClick={() => dispatch(SystemActions.setCurrentTodoId(''))}
                  />
                  <div className="card-popup__header">
                    <div className="card-popup__input-container">
                      {
                          todo.status === EnumTodoStatus.Doing && (
                          <div
                            className="card__overlay-doing"
                            style={{
                              marginTop: 6,
                              width: 9,
                              height: 18,
                            }}
                          />
                          )
                        }
                      {
                        cardType === EnumTodoType.Checkboxes && (
                        <Checkbox
                          isActive={todo.status === EnumTodoStatus.Done}
                          onClick={() => {
                            const newStatus = todo.status === EnumTodoStatus.Done
                              ? EnumTodoStatus.Todo
                              : EnumTodoStatus.Done;
                            dispatch(TodosActions.updateCompleteStatus({
                              id: todo.id,
                              status: newStatus,
                            }));
                          }}
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
                          onChange={(event: any) => changeHandler(event, false)}
                          minRows={1}
                          maxRows={5}
                        />
                        <TextArea
                          className="card__textarea card-popup__textarea card-popup__textarea--description"
                          placeholder="Notes"
                          value={descriptionValue}
                          onChange={(event: any) => changeHandler(event, true)}
                          minRows={1}
                          maxRows={5}
                        />
                      </div>
                    </div>
                    <div className="card-popup__toolbar">
                      <div>
                        <Menu
                          imageSrc={icons.calendar}
                          alt="date"
                          imageSize={24}
                          size={36}
                          isShowPopup={false}
                        />
                        <CardContextMenu
                          id={todo.id}
                          isArchive={todo.isArchive}
                          isActive={false}
                          isHover
                          isNotificationsEnabled={todo.isNotificationsEnabled}
                          color={todo.color}
                          status={todo.status}
                          size={36}
                          imageSize={24}
                          isPrimary
                          onStartEdit={() => {
                                titleInputRef.current?.focus();
                          }}
                          onChangeColor={(newColor) => {
                            dispatch(TodosActions.updateColor({
                              id: todo.id,
                              color: newColor,
                            }));
                          }}
                        />
                      </div>
                      <Menu
                        imageSrc={todo.isNotificationsEnabled ? icons.bellActive : icons.bell}
                        alt="date"
                        imageSize={24}
                        size={36}
                        isShowPopup={false}
                        style={{
                          justifySelf: 'flex-end',
                        }}
                        onClick={() => {
                          dispatch(TodosActions.switchNotificationsEnabled({ id: todo.id }));
                        }}
                      />
                    </div>
                    <hr />
                  </div>
                  <Comments todoId={currentTodoId} />
                </div>
              </div>
            ) : (
              <div className="card-popup" />
            )
          }
      </>
    );
  }, [todo, titleValue, descriptionValue, isProgress, cardType]);

  return (
    <>
      { memoCardPopup }
    </>
  );
};
