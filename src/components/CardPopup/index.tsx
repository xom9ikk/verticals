import React, {
  FC, useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import debounce from 'lodash.debounce';
import { EnumColors, EnumTodoStatus, ITodo } from '../../types';
import { Checkbox } from '../Checkbox';
import { IRootState } from '../../store/reducers/state';
import { SystemActions, TodosActions } from '../../store/actions';
import { Menu } from '../Menu';
import { Loader } from '../Loader';
import { CardContextMenu } from '../CardContextMenu';
import { CommentForm } from '../CommentForm';
import { CommentList } from '../CommentList';
import { TextArea } from '../TextArea';

interface ICardPopup {
  columnId: string;
}

export const CardPopup: FC<ICardPopup> = ({
  columnId,
}) => {
  const dispatch = useDispatch();
  const { system: { currentTodoId } } = useSelector((state: IRootState) => state);
  const { todos } = useSelector((state: IRootState) => state);
  const [todo, setTodo] = useState<ITodo>();
  const [isProgress, setIsProgress] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string | undefined>(todo?.title);
  const [descriptionValue, setDescriptionValue] = useState<string | undefined>(todo?.description);
  const titleInputRef = useRef<any>(null);

  // console.log('CardPopup currentTodoId', currentTodoId);

  useEffect(() => {
    console.log('currentTodoId', currentTodoId);
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
        dispatch(TodosActions.updateTitle(id, newTitle));
      }
      if (newDescription) {
        dispatch(TodosActions.updateDescription(id, newDescription));
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

  if (!todo) {
    return (
      <div className="card-popup" />
    );
  }

  return (
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
          imageSrc="/svg/close.svg"
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
            <Checkbox
              isActive={todo.status === EnumTodoStatus.Done}
              onClick={() => {
                dispatch(TodosActions.updateCompleteStatus(
                  todo.id,
                  todo.status === EnumTodoStatus.Done
                    ? EnumTodoStatus.Todo
                    : EnumTodoStatus.Done,
                ));
              }}
              style={{
                marginTop: 6,
                width: 18,
                height: 18,
              }}
            />
            <div className="card-popup__textarea-inner">
              <TextArea
                className="card__textarea card-popup__textarea"
                placeholder="Card Title"
                value={titleValue}
                onChange={(event) => changeHandler(event, false)}
                min={50}
                max={200}
              />
              {/* <TextareaAutosize */}
              {/*  ref={titleInputRef} */}
              {/*  className="card__textarea card-popup__textarea" */}
              {/*  value={titleValue} */}
              {/*  placeholder="Card Title" */}
              {/*  minRows={1} */}
              {/*  maxRows={3} */}
              {/*  onChange={(event) => changeHandler(event, false)} */}
              {/* /> */}
              <TextArea
                className="card__textarea card-popup__textarea card-popup__textarea--description"
                placeholder="Notes"
                value={descriptionValue}
                onChange={(event) => changeHandler(event, true)}
                min={27}
                max={300}
              />
              {/* <TextareaAutosize */}
              {/*  className="car
              d__textarea card-popup__textarea card-popup__textarea--description" */}
              {/*  value={descriptionValue} */}
              {/*  placeholder="Notes" */}
              {/*  minRows={1} */}
              {/*  maxRows={3} */}
              {/*  onChange={(event) => changeHandler(event, true)} */}
              {/* /> */}
            </div>
          </div>
          <div className="card-popup__toolbar">
            <div>
              <Menu
                imageSrc="/svg/calendar.svg"
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
                  titleInputRef.current.focus();
                }}
                onChangeColor={(newColor) => {
                  dispatch(TodosActions.updateColor(todo.id, newColor));
                }}
              />
            </div>
            <Menu
              imageSrc={`/svg/bell${todo.isNotificationsEnabled ? '-active' : ''}.svg`}
              alt="date"
              imageSize={24}
              size={36}
              isShowPopup={false}
              style={{
                justifySelf: 'flex-end',
              }}
              onClick={() => {
                dispatch(TodosActions.switchNotificationsEnabled(todo.id));
              }}
            />
          </div>
          <hr />
        </div>
        <div className="card-popup__comments-wrapper">
          <CommentList />
          <CommentForm todoId={todo.id} />
        </div>
      </div>
    </div>
  );
};
