import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {
  Draggable, DraggableProvided, DraggableStateSnapshot, Droppable,
} from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { Menu } from '../Menu';
import { Card } from '../Card';
import { CardToolbar } from '../CardToolbar';
import { MenuButton } from '../MenuButton';
import { Divider } from '../Divider';
import { ColumnsActions, TodosActions } from '../../store/actions';
import { ITodos } from '../../types';
import { useFocus } from '../../use/focus';

interface IColumn {
  index?: number;
  columnId?: string;
  boardId: string;
  title?: string;
  description?: string;
  todos?: ITodos;
}

export const Column: FC<IColumn> = ({
  index, columnId, boardId, title: initialTitle, description: initialDescription, todos,
}) => {
  const dispatch = useDispatch();
  const { focus } = useFocus();
  const [isOpenNewCard, setIsOpenNewCard] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isHoverHeader, setIsHoverHeader] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>(initialTitle || '');
  const [descriptionValue, setDescriptionValue] = useState<string>(initialDescription || '');
  const titleInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);

  const exitFromCardEditableHandler = (
    newTitle?: string,
    newDescription?: string,
    isDone?: boolean,
    id?: string,
  ) => {
    console.log('id', id, '->', newTitle, '->', newDescription);
    if (id) {
      if (newTitle) {
        dispatch(TodosActions.updateTitle(id, newTitle));
      }
      if (newDescription) {
        dispatch(TodosActions.updateDescription(id, newDescription));
      }
    } else if (newTitle || newDescription) {
      dispatch(TodosActions.add(columnId || 'todo-this-case', newTitle, newDescription, isDone));
    }
    setIsOpenNewCard(false);
  };

  useEffect(() => {
    focus(titleInputRef);
  }, [isEditable]);

  const getNewData = () => ({
    newTitle: initialTitle !== titleValue ? titleValue.trim() : undefined,
    newDescription: initialDescription !== descriptionValue ? descriptionValue.trim() : undefined,
  });

  const saveData = () => {
    const { newTitle, newDescription } = getNewData();
    if (columnId) {
      if (newTitle) {
        dispatch(ColumnsActions.updateTitle(columnId, newTitle));
      }
      if (newDescription) {
        dispatch(ColumnsActions.updateDescription(columnId, newDescription));
      }
    } else if (newTitle || newDescription) {
      dispatch(ColumnsActions.add(boardId, newTitle, newDescription));
    }
  };

  const keydownHandler = (event: any, isDescription: boolean) => {
    const {
      key, ctrlKey, shiftKey,
    } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey) {
      if (!isDescription) {
        focus(descriptionInputRef);
        setTitleValue(titleValue.trim());
      } else {
        console.log('3');
        saveData();
        setIsEditable(false);
      }
    }
  };

  const changeHandler = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    console.log(value);
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  const todoCards = useMemo(() => (
    <Droppable
      droppableId={columnId || 'todo-this-case'}
      type="QUOTE"
    >
      {
            (dropProvided) => (
              <div
                ref={dropProvided.innerRef}
                style={{ minHeight: 36 }}
              >
                {
                    todos?.map((todo, todoIndex) => (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id}
                        index={todoIndex}
                      >
                        {(
                          dragProvided: DraggableProvided,
                          dragSnapshot: DraggableStateSnapshot,
                        ) => (
                          <Card
                            provided={dragProvided}
                            snapshot={dragSnapshot}
                            key={todo.id}
                            title={todo.title}
                            description={todo.description}
                            isDone={todo.isDone}
                            onExitFromEditable={
                                    (newTitle, newDescription,
                                      isDone) => exitFromCardEditableHandler(
                                      newTitle, newDescription, isDone, todo.id,
                                    )
                                  }
                          />
                        )}
                      </Draggable>
                    ))
                  }
                {dropProvided.placeholder}
              </div>
            )
          }
    </Droppable>
  ), [todos, columnId, exitFromCardEditableHandler]);

  const contextMenu = useMemo(() => (
    <Menu
      imageSrc="/svg/dots.svg"
      alt="menu"
      imageSize={22}
      size={24}
      isHide
      isHoverBlock={isHover}
      position="bottom"
    >
      <MenuButton
        text="Edit column"
        imageSrc="/svg/menu/edit.svg"
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Duplicate"
        imageSrc="/svg/menu/duplicate.svg"
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Add card"
        imageSrc="/svg/menu/add-card.svg"
      />
      <MenuButton
        text="Add heading"
        imageSrc="/svg/menu/add-heading.svg"
      />
      <MenuButton
        text="Add column after"
        imageSrc="/svg/menu/add-column.svg"
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Delete"
        imageSrc="/svg/menu/delete.svg"
        hintText="⌫"
      />
    </Menu>
  ), [isHover]);

  const addCard = useMemo(() => (
    !isOpenNewCard && (
    <Menu
      imageSrc="/svg/add.svg"
      alt="add"
      text="Add card"
      isHide
      isHoverBlock={isHover}
      isMaxWidth
      isShowPopup={false}
      onClick={() => setIsOpenNewCard(true)}
    />
    )
  ), [isHover, isOpenNewCard]);

  const newCard = useMemo(() => (
    isOpenNewCard && (
    <Card
      isEditableDefault
      onExitFromEditable={(t, d) => exitFromCardEditableHandler(t, d)}
    />
    )
  ), [isOpenNewCard, exitFromCardEditableHandler]);

  const cardToolbar = useMemo(() => (
    <CardToolbar
      isHoverBlock={isHover}
      onClickCard={() => setIsOpenNewCard(true)}
      onClickHeading={() => console.log('open heading')}
    />
  ), [isHover]);

  const column = useMemo(() => (
    <Draggable draggableId={titleValue} index={index || 777}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className="column"
          ref={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            className={`column__wrapper
            ${isHoverHeader && !isEditable ? 'column__wrapper--hovered' : ''}
            ${snapshot.isDragging ? 'column__wrapper--dragging' : ''}
            `}
          >
            <div
              className={`column__header ${isEditable ? 'column__header--editable' : ''}`}
              {...provided.dragHandleProps}
              aria-label={`${titleValue} quote list`}
              onMouseEnter={() => setIsHoverHeader(true)}
              onMouseLeave={() => setIsHoverHeader(false)}
              onDoubleClick={() => setIsEditable(true)}
            >
              <div
                className="column__header-container"
              >
                {
                  isEditable ? (
                    <TextareaAutosize
                      ref={titleInputRef}
                      className="column__title column__title--editable"
                      defaultValue={titleValue}
                      placeholder="New Column"
                      minRows={1}
                      maxRows={4}
                      onChange={(event) => changeHandler(event, false)}
                      onKeyUp={(event) => keydownHandler(event, false)}
                    />
                  ) : (
                    <>
                      <span
                        className={`column__title ${!titleValue ? 'column__title--empty' : ''}`}
                      >
                        {titleValue || 'New column'}
                      </span>
                      { (titleValue || descriptionValue || todos?.length) ? contextMenu : null }
                    </>
                  )
                }
              </div>
              {
                isEditable ? (
                  <TextareaAutosize
                    ref={descriptionInputRef}
                    className="column__description column__description--editable"
                    defaultValue={descriptionValue}
                    placeholder="Notes"
                    minRows={1}
                    maxRows={4}
                    onChange={(event) => changeHandler(event, true)}
                    onKeyDownCapture={(event) => keydownHandler(event, true)}
                  />
                ) : (
                  <span
                    className={`column__description ${!descriptionValue ? 'column__description--empty' : ''}`}
                  >
                    {descriptionValue || 'Notes'}
                  </span>
                )
              }
            </div>
            { todoCards }
            { newCard }
            { addCard }
          </div>
          { cardToolbar }
        </div>
      )}
    </Draggable>
  ),
  [todos, columnId, isHover, isHoverHeader, isOpenNewCard, isEditable]);

  return (
    <>{column}</>
  );
};
