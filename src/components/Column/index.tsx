import React, {
  FC, SyntheticEvent, useEffect, useMemo, useRef, useState,
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
import { ColumnsActions, SystemActions, TodosActions } from '../../store/actions';
import { EnumColors, EnumTodoStatus, ITodos } from '../../types';
import { useFocus } from '../../use/focus';
import { IRootState } from '../../store/reducers/state';
import { ColorPicker } from '../ColorPicker';
import { useFilterTodos } from '../../use/filterTodos';
import { useClickPreventionOnDoubleClick } from '../../use/clickPreventionOnDoubleClick';

interface IColumn {
  index: number;
  columnId?: string;
  color?: number;
  isMinimize?: boolean;
  boardId: string;
  title?: string;
  description?: string;
  todos?: ITodos;
  isDraggable?: boolean;
}

enum EnumMenuActions {
  EditColumn,
  Duplicate,
  AddCard,
  AddHeading,
  AddColumnAfter,
  Delete,
}

export const Column: FC<IColumn> = ({
  index,
  columnId,
  color,
  isMinimize,
  boardId,
  title: initialTitle,
  description: initialDescription,
  todos,
  isDraggable = true,
}) => {
  const dispatch = useDispatch();
  const { focus } = useFocus();
  const { filterTodos } = useFilterTodos();
  const [isOpenNewCard, setIsOpenNewCard] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isHoverHeader, setIsHoverHeader] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>();
  const {
    system: { isEditableColumn, query },
    boards,
  } = useSelector((state: IRootState) => state);
  const [titleValue, setTitleValue] = useState<string>(initialTitle || '');
  const [descriptionValue, setDescriptionValue] = useState<string>(initialDescription || '');
  const titleInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);

  const saveCard = (
    id?: string,
    newTitle?: string,
    newDescription?: string,
    newStatus?: EnumTodoStatus,
    newColor?: number,
  ) => {
    // console.log('id', id, '->', newTitle, '->', newDescription);
    if (id) {
      if (newTitle) {
        dispatch(TodosActions.updateTitle(id, newTitle));
      }
      if (newDescription) {
        dispatch(TodosActions.updateDescription(id, newDescription));
      }
      if (newStatus !== undefined) {
        dispatch(TodosActions.updateCompleteStatus(id, newStatus));

        // if (newStatus === EnumTodoStatus.Done) {
        //   dispatch(TodosActions.updateCompleteStatus(id, EnumTodoStatus.Done));
        // } else {
        //   dispatch(TodosActions.updateCompleteStatus(id, EnumTodoStatus.Todo));
        // }
      }
      if (newColor !== undefined) {
        const todoToChange = todos?.find((todo) => todo.id === id);
        if (todoToChange?.color === newColor) {
          dispatch(TodosActions.resetColor(id));
        } else {
          dispatch(TodosActions.updateColor(id, newColor));
        }
      }
    } else if (newTitle || newDescription) {
      dispatch(TodosActions.add(columnId || 'todo-this-case', newTitle, newDescription, newStatus));
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
    if (columnId || columnId === 'new-column') {
      if (newTitle) {
        dispatch(ColumnsActions.updateTitle(columnId, newTitle));
      }
      if (newDescription) {
        dispatch(ColumnsActions.updateDescription(columnId, newDescription));
      }
      if (newColor !== undefined) {
        if (color === newColor) {
          dispatch(ColumnsActions.resetColor(columnId));
        } else {
          dispatch(ColumnsActions.updateColor(columnId, newColor));
        }
      }
      if (columnId === 'new-column' && (newTitle)) {
        dispatch(ColumnsActions.generateNewId(columnId));
      } else {
        dispatch(ColumnsActions.removeNewColumns());
      }
    } else if (newTitle || newDescription) {
      dispatch(ColumnsActions.add(boardId, newTitle, newDescription));
      if (!isDraggable) {
        setTitleValue('');
        setDescriptionValue('');
      }
    }
    setIsHover(false);
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

  const clickHandler = (event: SyntheticEvent) => {
    if (isEditable) {
      event.stopPropagation();
    } else {
      setIsHoverHeader(false);
      dispatch(ColumnsActions.updateIsMinimize(columnId!, !isMinimize));
    }
  };

  const doubleClickHandler = () => {
    if (isEditableColumn) {
      dispatch(SystemActions.setIsEditableColumn(false));
    }
    setIsDoubleClicked(true);
  };

  useEffect(() => {
    if (columnId === 'new-column') {
      doubleClickHandler();
    }
  }, []);

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(clickHandler, doubleClickHandler, isEditable);

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    setIsHoverHeader(false);
    setIsHover(false);
  };

  const menuButtonClickHandler = (action: EnumMenuActions, payload?: any) => {
    switch (action) {
      case EnumMenuActions.EditColumn: {
        doubleClickHandler();
        break;
      }
      case EnumMenuActions.Duplicate: {
        const newColumnId = `column-${Math.random().toString()}`;
        dispatch(ColumnsActions.duplicate(columnId!, newColumnId));
        dispatch(TodosActions.duplicateForColumn(columnId!, newColumnId));
        break;
      }
      case EnumMenuActions.AddCard: {
        setIsOpenNewCard(true);
        break;
      }
      case EnumMenuActions.AddHeading: {
        break;
      }
      case EnumMenuActions.AddColumnAfter: {
        dispatch(ColumnsActions.removeNewColumns());
        dispatch(ColumnsActions.addColumnAfter(columnId!, boardId));
        break;
      }
      case EnumMenuActions.Delete: {
        dispatch(ColumnsActions.remove(columnId!));
        break;
      }
      default: break;
    }
    hidePopup();
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
    <>
      {
            todos
                ?.sort((a, b) => a.position - b.position)
                ?.filter(filterTodos)
                ?.map((todo, todoIndex) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id}
                    index={todoIndex}
                    isDragDisabled={!!query}
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
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                        status={todo.status}
                        color={todo.color}
                        onExitFromEditable={
                                (newTitle, newDescription,
                                  newStatus, newColor) => saveCard(
                                  todo.id, newTitle, newDescription, newStatus, newColor,
                                )
                              }
                      />
                    )}
                  </Draggable>
                ))
          }
    </>
  ), [boards, todos, columnId, isOpenNewCard, query]);

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
        onClick={() => menuButtonClickHandler(EnumMenuActions.EditColumn)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Duplicate"
        imageSrc="/svg/menu/duplicate.svg"
        onClick={() => menuButtonClickHandler(EnumMenuActions.Duplicate)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Add card"
        imageSrc="/svg/menu/add-card.svg"
        onClick={() => menuButtonClickHandler(EnumMenuActions.AddCard)}
      />
      <MenuButton
        text="Add heading"
        imageSrc="/svg/menu/add-heading.svg"
        onClick={() => menuButtonClickHandler(EnumMenuActions.AddHeading)}
      />
      <MenuButton
        text="Add column after"
        imageSrc="/svg/menu/add-column.svg"
        onClick={() => menuButtonClickHandler(EnumMenuActions.AddColumnAfter)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Delete"
        imageSrc="/svg/menu/delete.svg"
        hintText="⌫"
        onClick={() => menuButtonClickHandler(EnumMenuActions.Delete)}
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
  const colorClass = `column__wrapper--${Object.keys(EnumColors)[color]?.toLowerCase()}`;

  const memoColumn = useMemo(() => (
    <Draggable
      draggableId={`${columnId || 'new'}-${index}`}
      index={index}
      isDragDisabled={!isDraggable || !!query}
    >
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <>
          {
              isMinimize ? (
                <>
                  <div
                    role="button"
                    tabIndex={0}
                    className={`column column--compact ${snapshot.isDragging ? 'column--dragging' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    onMouseEnter={() => setIsHoverHeader(true)}
                    onMouseLeave={() => setIsHoverHeader(false)}
                    onClick={handleClick}
                  >
                    <div
                      className={`column__wrapper column__wrapper--compact
                    ${isHoverHeader && !isEditable ? 'column__wrapper--hovered' : ''}
                    ${snapshot.isDragging ? 'column__wrapper--dragging' : ''}
                    ${color !== undefined ? colorClass : ''}
                    `}
                      {...provided.dragHandleProps}
                    >
                      <div className="column__inner">
                        <div className="column__counter">
                          <div className="column__compact-text">
                            {
                              query ? todos?.filter(filterTodos).length : todos?.length
                            }
                          </div>
                        </div>
                        <div className="column__compact-text">{titleValue}</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className={`column ${snapshot.isDragging ? 'column--dragging' : ''}`}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  onMouseOver={() => setIsHover(true)}
                  onMouseOut={() => setIsHover(false)}
                >
                  <div
                    className={`column__wrapper
                    ${isHoverHeader && !isEditable ? 'column__wrapper--hovered' : ''}
                    ${snapshot.isDragging ? 'column__wrapper--dragging' : ''}
                    `}
                  >
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
                              <div
                                role="button"
                                tabIndex={0}
                                className={`column__header
                                ${color !== undefined ? colorClass : ''}
                                ${isEditable ? 'column__header--editable' : ''}
                                `}
                                {...provided.dragHandleProps}
                                onMouseEnter={() => setIsHoverHeader(true)}
                                onMouseLeave={() => setIsHoverHeader(false)}
                                onClick={handleClick}
                                onDoubleClick={handleDoubleClick}
                              >
                                { memoTitle }
                                { memoDescription }
                              </div>
                              { todoCards }
                            </div>
                            { newCard }
                            { addCard }
                            {dropProvided.placeholder}
                          </div>
                        )
                      }
                    </Droppable>
                  </div>
                  { cardToolbar }
                </div>
              )
            }
        </>
      )}
    </Draggable>
  ),
  [
    index, boards, todos, color, columnId, isHover,
    isHoverHeader, isOpenNewCard, isEditable,
    titleValue, descriptionValue, query, isMinimize,
  ]);

  return (
    <>{memoColumn}</>
  );
};
