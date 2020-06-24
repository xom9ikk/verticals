import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {
  Draggable, DraggableProvided, DraggableStateSnapshot, Droppable,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '../Menu';
import { Card } from '../Card';
import { CardToolbar } from '../CardToolbar';
import { MenuButton } from '../MenuButton';
import { Divider } from '../Divider';
import {
  ColumnsActions, SystemActions, TodosActions,
} from '../../store/actions';
import { EnumColors, ITodos } from '../../types';
import { useFocus } from '../../use/focus';
import { IRootState } from '../../store/reducers/state';
import { ColorPicker } from '../ColorPicker';

interface IColumn {
  index: number;
  columnId?: string;
  color?: number;
  boardId: string;
  title?: string;
  description?: string;
  todos?: ITodos;
  isDraggable?: boolean;
}

export const Column: FC<IColumn> = ({
  index,
  columnId,
  color,
  boardId,
  title: initialTitle,
  description: initialDescription,
  todos,
  isDraggable = true,
}) => {
  const dispatch = useDispatch();
  const { focus } = useFocus();
  const [isOpenNewCard, setIsOpenNewCard] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isHoverHeader, setIsHoverHeader] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>();
  const { system: { isEditableColumn }, boards } = useSelector((state: IRootState) => state);
  const [titleValue, setTitleValue] = useState<string>(initialTitle || '');
  const [descriptionValue, setDescriptionValue] = useState<string>(initialDescription || '');
  const titleInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);

  const saveCard = (
    id?: string,
    newTitle?: string,
    newDescription?: string,
    newIsDone?: boolean,
    newColor?: number,
  ) => {
    console.log('id', id, '->', newTitle, '->', newDescription);
    if (id) {
      if (newTitle) {
        dispatch(TodosActions.updateTitle(id, newTitle));
      }
      if (newDescription) {
        dispatch(TodosActions.updateDescription(id, newDescription));
      }
      if (newIsDone !== undefined) {
        dispatch(TodosActions.updateIsDone(id, newIsDone));
      }
      if (newColor !== undefined) {
        dispatch(TodosActions.updateColor(id, newColor));
      }
    } else if (newTitle || newDescription) {
      dispatch(TodosActions.add(columnId || 'todo-this-case', newTitle, newDescription, newIsDone));
    }
    setIsOpenNewCard(false);
  };

  useEffect(() => {
    focus(titleInputRef);
  }, [isEditable]);

  const getNewData = () => ({
    newTitle: initialTitle !== titleValue
      ? titleValue.trim()
      : undefined,
    newDescription: initialDescription !== descriptionValue
      ? descriptionValue.trim()
      : undefined,
  });

  const saveColumn = (newColor?: number) => {
    const { newTitle, newDescription } = getNewData();
    if (columnId) {
      if (newTitle) {
        dispatch(ColumnsActions.updateTitle(columnId, newTitle));
      }
      if (newDescription) {
        dispatch(ColumnsActions.updateDescription(columnId, newDescription));
      }
      if (newColor !== undefined) {
        dispatch(ColumnsActions.updateColor(columnId, newColor));
      }
    } else if (newTitle || newDescription) {
      dispatch(ColumnsActions.add(boardId, newTitle, newDescription));
      if (!isDraggable) {
        setTitleValue('');
        setDescriptionValue('');
      }
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
        saveColumn();
        setIsEditable(false);
      }
    }
  };

  const changeHandler = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  const colorPickHandler = (newColor: number) => {
    dispatch(SystemActions.setIsOpenPopup(false));
    saveColumn(newColor);
  };

  useEffect(() => {
    if (isDoubleClicked) {
      setIsDoubleClicked(false);
      dispatch(SystemActions.setIsEditableColumn(true));
      if (!isEditableColumn && isDoubleClicked) {
        setIsEditable(true);
      }
    }
  }, [isDoubleClicked]);

  useEffect(() => {
    if (isDoubleClicked === false && !isEditableColumn && isEditable) {
      setIsEditable(false);
      saveColumn();
      setIsDoubleClicked(undefined);
    }
  }, [isEditableColumn]);

  const doubleClickHandler = () => {
    if (isEditableColumn) {
      dispatch(SystemActions.setIsEditableColumn(false));
    }
    setIsDoubleClicked(true);
  };

  const addCard = useMemo(() => (
    (!isOpenNewCard && isDraggable) && (
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
  ), [isHover, isOpenNewCard, isDraggable]);

  const newCard = useMemo(() => (
    isOpenNewCard && (
      <Card
        cardType={boards
          .filter((board) => board.id === boardId)[0]?.cardType}
        isEditableDefault
        onExitFromEditable={(t, d, isDone) => saveCard(undefined, t, d, isDone)}
      />
    )
  ), [isOpenNewCard]);

  const todoCards = useMemo(() => (
    <Droppable
      droppableId={columnId || 'todo-this-case'}
      type="QUOTE"
    >
      {
            (dropProvided, dropSnapshot) => (
              <div
                className="column__container"
                ref={dropProvided.innerRef}
              >
                <div style={{ paddingBottom: `${dropSnapshot.isDraggingOver ? '36px' : '0px'}` }}>
                  {
                    todos
                      ?.sort((a, b) => a.position - b.position)
                      ?.map((todo, todoIndex) => (
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
                              cardType={boards
                                .filter((board) => board.id === boardId)[0]?.cardType}
                              provided={dragProvided}
                              snapshot={dragSnapshot}
                              key={todo.id}
                              title={todo.title}
                              description={todo.description}
                              isDone={todo.isDone}
                              color={todo.color}
                              onExitFromEditable={
                                (newTitle, newDescription,
                                  isDone, newColor) => saveCard(
                                  todo.id, newTitle, newDescription, isDone, newColor,
                                )
                              }
                            />
                          )}
                        </Draggable>
                      ))
                  }
                </div>
                { newCard }
                { addCard }
                {dropProvided.placeholder}
              </div>
            )
          }
    </Droppable>
  ), [boards, todos, columnId, isOpenNewCard, isHover]);

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
      <ColorPicker onPick={colorPickHandler} activeColor={color} />
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
  ), [isHover, color]);

  const cardToolbar = useMemo(() => (
    <CardToolbar
      isHoverBlock={isHover}
      onClickCard={() => setIsOpenNewCard(true)}
      onClickHeading={() => console.log('open heading')}
    />
  ), [isHover]);

  const memoDescription = useMemo(() => (
    <>
      {
          isEditable ? (
            <TextareaAutosize
              ref={descriptionInputRef}
              className="column__description column__description--editable"
              value={descriptionValue}
              placeholder="Notes"
              minRows={1}
              maxRows={4}
              onChange={(event) => changeHandler(event, true)}
              onKeyUp={(event) => keydownHandler(event, true)}
            />
          ) : (
            <span
              className={`column__description ${!descriptionValue ? 'column__description--empty' : ''}`}
            >
              {descriptionValue || 'Notes'}
            </span>
          )
        }
    </>
  ), [isEditable, descriptionValue]);

  const memoTitle = useMemo(() => (
    <div
      className="column__header-container"
    >
      {
          isEditable ? (
            <TextareaAutosize
              ref={titleInputRef}
              className="column__title column__title--editable"
              value={titleValue}
              placeholder="New column"
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
  ), [isEditable, titleValue, descriptionValue, todos, contextMenu, color]);

  // @ts-ignore
  const colorClass = `column__header--${Object.keys(EnumColors)[color]?.toLowerCase()}`;

  const memoColumn = useMemo(() => (
    <Draggable
      draggableId={`${columnId}-${index}` || `new-${index}`}
      index={index}
      isDragDisabled={!isDraggable}
    >
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
              className={`column__header 
              ${color !== undefined ? colorClass : ''}
              ${isEditable ? 'column__header--editable' : ''}
              `}
              {...provided.dragHandleProps}
              // aria-label={`${titleValue} quote list`}
              onMouseEnter={() => setIsHoverHeader(true)}
              onMouseLeave={() => setIsHoverHeader(false)}
              onDoubleClick={doubleClickHandler}
            >
              { memoTitle }
              { memoDescription }
            </div>
            { todoCards }
          </div>
          { cardToolbar }
        </div>
      )}
    </Draggable>
  ),
  [
    index, boards, todos, color, columnId, isHover,
    isHoverHeader, isOpenNewCard, isEditable,
    titleValue, descriptionValue,
  ]);

  return (
    <>{memoColumn}</>
  );
};
