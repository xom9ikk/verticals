import React, {
  FC, SyntheticEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  Draggable, DraggableProvided, DraggableStateSnapshot, Droppable,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@comp/Menu';
import { Card } from '@comp/Card';
import { CardToolbar } from '@comp/CardToolbar';
import { MenuButton } from '@comp/MenuButton';
import { Divider } from '@comp/Divider';
import {
  ColumnsActions, SystemActions, TodosActions,
} from '@/store/actions';
import {
  EnumColors, EnumTodoStatus, EnumTodoType, ITodo, ITodos,
} from '@/types';
import { useFocus } from '@/use/focus';
import { IRootState } from '@/store/reducers/state';
import { ColorPicker } from '@comp/ColorPicker';
import { useFilterTodos } from '@/use/filterTodos';
import { useClickPreventionOnDoubleClick } from '@/use/clickPreventionOnDoubleClick';
import { ArchiveContainer } from '@comp/ArchiveContainer';
import { CardsContainer } from '@comp/CardsContainer';
import { CardPopup } from '@comp/CardPopup';
import { TextArea } from '@comp/TextArea';

interface IColumn {
  index: number;
  columnId?: number;
  belowId?: number;
  color?: number;
  isCollapsed?: boolean;
  boardId: number;
  title?: string;
  description?: string;
  todos?: ITodos;
  isNew?: boolean;
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
  belowId,
  color,
  isCollapsed,
  boardId,
  title: initialTitle,
  description: initialDescription,
  todos,
  isNew,
}) => {
  const dispatch = useDispatch();
  const { focus } = useFocus();
  const { filterTodos } = useFilterTodos();
  const [isOpenNewCard, setIsOpenNewCard] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isTopHover, setIsTopHover] = useState<boolean>(false);
  const [isDraggingCard, setIsDraggingCard] = useState<boolean>(false);
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
  const { cardType } = boards.filter((board) => board.id === boardId)[0] || EnumTodoType.Checkboxes;

  const saveCard = (
    id?: number,
    title?: string,
    description?: string,
    status?: EnumTodoStatus,
    newColor?: number,
  ) => {
    console.log('save card id', id, '->', title, '->', description);
    if (id) {
      if (title) {
        dispatch(TodosActions.updateTitle({
          id,
          title,
        }));
      }
      if (description) {
        dispatch(TodosActions.updateDescription({
          id,
          description,
        }));
      }
      if (status !== undefined) {
        dispatch(TodosActions.updateCompleteStatus({
          id,
          status,
        }));
      }
      if (newColor !== undefined) {
        const todoToChange = todos?.find((todo) => todo.id === id);
        dispatch(ColumnsActions.updateColor({
          id,
          color: todoToChange?.color === newColor ? newColor : null,
        }));
        // if (todoToChange?.color === newColor) {
        //   dispatch(TodosActions.resetColor({ id }));
        // } else {
        //   dispatch(TodosActions.updateColor({
        //     id,
        //     color: newColor,
        //   }));
        // }
      }
      // if (id === 'new-todo' && newTitle) {
      //   dispatch(TodosActions.generateNewId({ id }));
      // } else {
      //   dispatch(TodosActions.removeNewTodo());
      // }
    } else if (title) {
      // if (belowId) {
      //   dispatch(ColumnsActions.removeTemp());
      // }
      dispatch(TodosActions.create({
        columnId: columnId!,
        title,
        description: description || undefined,
        status,
      }));
    }
    // else if (newTitle || newDescription) {
    //   dispatch(TodosActions.add(
    //     {
    //       columnId: columnId!,
    //       title: newTitle,
    //       description: newDescription,
    //       status: newStatus,
    //     },
    //   ));
    // }
    setIsOpenNewCard(false);
  };

  useEffect(() => {
    focus(titleInputRef);
  }, [isEditable]);

  const getNewData = () => ({
    title: initialTitle !== titleValue
      ? titleValue.trim()
      : undefined,
    description: initialDescription !== descriptionValue
      ? descriptionValue.trim()
      : undefined,
  });

  const saveColumn = (newColor?: number) => {
    const { title, description } = getNewData();
    if (columnId && !belowId) {
      if (title) {
        dispatch(ColumnsActions.updateTitle({
          id: columnId,
          title,
        }));
      }
      if (description) {
        dispatch(ColumnsActions.updateDescription({
          id: columnId,
          description,
        }));
      }
      if (newColor !== undefined) {
        dispatch(ColumnsActions.updateColor({
          id: columnId,
          color: color !== newColor ? newColor : null,
        }));
      }
    } else if (title) {
      // if (belowId) {
      //   dispatch(ColumnsActions.removeTemp());
      // }
      dispatch(ColumnsActions.create({
        boardId,
        title,
        description: description || undefined,
        belowId,
      }));
      if (isNew) {
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

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    setIsHoverHeader(false);
    setIsHover(false);
  };

  const colorPickHandler = (newColor: number) => {
    saveColumn(newColor);
    hidePopup();
  };

  const doubleClickHandler = () => {
    if (isEditableColumn) {
      dispatch(SystemActions.setIsEditableColumn(false));
    }
    setIsDoubleClicked(true);
  };

  const clickHandler = (event: SyntheticEvent) => {
    if (isEditable) {
      event.stopPropagation();
    } else if (!isNew) {
      setIsHoverHeader(false);
      dispatch(ColumnsActions.updateIsCollapsed({
        id: columnId!,
        isCollapsed: !isCollapsed,
      }));
    } else {
      doubleClickHandler();
    }
  };

  useEffect(() => {
    console.log('=========================belowId', belowId);
    if (belowId) {
      doubleClickHandler();
    }
  }, []);

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(clickHandler, doubleClickHandler, isEditable);

  const menuButtonClickHandler = (action: EnumMenuActions, payload?: any) => {
    console.log(payload);
    switch (action) {
      case EnumMenuActions.EditColumn: {
        doubleClickHandler();
        break;
      }
      case EnumMenuActions.Duplicate: {
        dispatch(ColumnsActions.duplicate({
          columnId: columnId!,
        }));
        // dispatch(TodosActions.duplicateForColumn({
        //   columnId: columnId!,
        //   newColumnId,
        // }));
        break;
      }
      case EnumMenuActions.AddCard: {
        setIsOpenNewCard(true);
        break;
      }
      case EnumMenuActions.AddHeading: {
        // TODO:
        break;
      }
      case EnumMenuActions.AddColumnAfter: {
        dispatch(ColumnsActions.removeTemp());
        dispatch(ColumnsActions.drawBelow({
          belowId: columnId!,
          boardId,
        }));
        break;
      }
      case EnumMenuActions.Delete: {
        dispatch(ColumnsActions.remove({ id: columnId! }));
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
    (!isOpenNewCard && !isNew) && (
    <>
      <Menu
        imageSrc="/assets/svg/add.svg"
        alt="add"
        text="Add card"
        isHide
        isHoverBlock={(isTopHover && !isDraggingCard) || todos?.length === 0}
        isMaxWidth
        isShowPopup={false}
        onClick={() => setIsOpenNewCard(true)}
      />
    </>
    )
  ), [isTopHover, isDraggingCard, todos, isOpenNewCard, isNew]);

  const newCard = useMemo(() => (
    isOpenNewCard && (
      <Card
        cardType={cardType}
        isEditableDefault
        onExitFromEditable={(t, d, isDone) => saveCard(undefined, t, d, isDone)}
      />
    )
  ), [isOpenNewCard]);

  const todoCards = useMemo(() => (
    <CardsContainer
      todos={todos
        ?.sort((a, b) => a.position - b.position)
        ?.filter((todo: ITodo) => !todo.isArchive)
        ?.filter(filterTodos)}
      cardType={cardType}
      isActiveQuery={!!query}
      onExitFromEditable={saveCard}
    />
  ), [boards, todos, columnId, isOpenNewCard, query]);

  // const archiveCards = useMemo(() => (
  //   <>
  //     {
  //           todos
  //               ?.sort((a, b) => a.position - b.position)
  //               ?.filter((todo: ITodo) => todo.isArchive)
  //               ?.filter(filterTodos)
  //               ?.map((todo, todoIndex) => (
  //                 <Draggable
  //                   key={todo.id}
  //                   draggableId={todo.id}
  //                   index={todoIndex}
  //                   isDragDisabled={!!query}
  //                 >
  //                   {(
  //                     dragProvided: DraggableProvided,
  //                     dragSnapshot: DraggableStateSnapshot,
  //                   ) => (
  //                     <Card
  //                       cardType={boards
  //                         .filter((board) => board.id === boardId)[0]?.cardType}
  //                       provided={dragProvided}
  //                       snapshot={dragSnapshot}
  //                       key={todo.id}
  //                       id={todo.id}
  //                       title={todo.title}
  //                       description={todo.description}
  //                       status={todo.status}
  //                       color={todo.color}
  //                       onExitFromEditable={
  //                               (newTitle, newDescription,
  //                                 newStatus, newColor) => saveCard(
  //                                 todo.id, newTitle, newDescription, newStatus, newColor,
  //                               )
  //                             }
  //                     />
  //                   )}
  //                 </Draggable>
  //               ))
  //         }
  //   </>
  // ), [boards, todos, columnId, isOpenNewCard, query]);

  const contextMenu = useMemo(() => (
    <Menu
      imageSrc="/assets/svg/dots.svg"
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
        imageSrc="/assets/svg/menu/edit.svg"
        onClick={() => menuButtonClickHandler(EnumMenuActions.EditColumn)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Duplicate"
        imageSrc="/assets/svg/menu/duplicate.svg"
        onClick={() => menuButtonClickHandler(EnumMenuActions.Duplicate)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Add card"
        imageSrc="/assets/svg/menu/add-card.svg"
        onClick={() => menuButtonClickHandler(EnumMenuActions.AddCard)}
      />
      <MenuButton
        text="Add heading"
        imageSrc="/assets/svg/menu/add-heading.svg"
        onClick={() => menuButtonClickHandler(EnumMenuActions.AddHeading)}
      />
      <MenuButton
        text="Add column after"
        imageSrc="/assets/svg/menu/add-column.svg"
        onClick={() => menuButtonClickHandler(EnumMenuActions.AddColumnAfter)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Delete"
        imageSrc="/assets/svg/menu/remove.svg"
        hintText="⌫"
        onClick={() => menuButtonClickHandler(EnumMenuActions.Delete)}
      />
    </Menu>
  ), [isHover, color]);

  const cardToolbar = useMemo(() => (
    <CardToolbar
      isHoverBlock={isHover && !isHoverHeader}
      onClickCard={() => setIsOpenNewCard(true)}
      onClickHeading={() => console.log('open heading')}
    />
  ), [isHover, isHoverHeader]);

  const memoDescription = useMemo(() => (
    <>
      {
        (!isNew || isEditable) && (
          isEditable ? (
            <TextArea
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
        )
      }
    </>
  ), [isEditable, descriptionValue]);

  const memoTitle = useMemo(() => (
    <>
      {
          (!isNew || isEditable) && (
            <div
              className="column__header-container"
            >
              {
              isEditable ? (
                <TextArea
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
          )
        }
    </>
  ), [isEditable, titleValue, descriptionValue, todos, contextMenu, color]);

  // @ts-ignore
  const colorKey = Object.keys(EnumColors)[color]?.toLowerCase();
  const colorClass = colorKey ? `column__wrapper--${colorKey}` : '';

  const memoColumn = useMemo(() => (
    <Draggable
      draggableId={`column-${columnId}`}
      // draggableId={`${columnId || 'new'}-${index}`}
      index={index}
      isDragDisabled={isNew || !!query}
    >
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <>
          {
              isCollapsed ? (
                <>
                  <div
                    role="button"
                    tabIndex={0}
                    className={`column column--compact 
                    ${snapshot.isDragging ? 'column--dragging' : ''}
                    `}
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
                    ${color !== null ? colorClass : ''}
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
                  onClick={handleClick}
                >
                  <div
                    className={`column__wrapper
                    ${isHoverHeader && !isEditable ? 'column__wrapper--hovered' : ''}
                    ${snapshot.isDragging ? 'column__wrapper--dragging' : ''}
                    `}
                  >
                    <Droppable
                      droppableId={`column-${columnId?.toString() || 'todo-this-case'}`}
                      type="QUOTE"
                    >
                      {
                        (dropProvided, dropSnapshot) => {
                          setIsDraggingCard(dropSnapshot.isDraggingOver);
                          return (
                            <div
                              className="column__container"
                              ref={dropProvided.innerRef}
                            >
                              <div
                                style={{ paddingBottom: `${dropSnapshot.isDraggingOver ? '36px' : '0px'}` }}
                                onMouseEnter={() => setIsTopHover(true)}
                                onMouseLeave={() => setIsTopHover(false)}
                              >
                                <div
                                  role="button"
                                  tabIndex={0}
                                  className={`column__header
                                  ${color !== null ? colorClass : ''}
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
                                { isNew && !isEditable && (
                                <span
                                  className="column__new-overlay"
                                >
                                  <img src="/assets/svg/add.svg" alt="add" />
                                </span>
                                ) }
                                { todoCards }
                                { newCard }
                                { addCard }
                              </div>
                              <ArchiveContainer
                                archivedTodos={todos
                                        ?.sort((a, b) => a.position - b.position)
                                        ?.filter((todo: ITodo) => todo.isArchive)
                                        ?.filter(filterTodos)}
                                isActiveQuery={!!query}
                                cardType={cardType}
                                onExitFromEditable={saveCard}
                              />
                              {dropProvided.placeholder}
                            </div>
                          );
                        }
                      }
                    </Droppable>
                  </div>
                  { !isNew && cardToolbar }
                </div>
              )
            }
        </>
      )}
    </Draggable>
  ),
  [
    index, boards, todos, color, colorClass, columnId, isHover,
    isHoverHeader, isOpenNewCard, isEditable,
    titleValue, descriptionValue, query, isCollapsed,
    isTopHover, isDraggingCard, isNew,
  ]);

  return (
    <>
      {memoColumn}
      <CardPopup
        columnId={columnId!}
        cardType={cardType}
      />
    </>
  );
};
