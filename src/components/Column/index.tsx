import React, {
  FC, SyntheticEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  Draggable, DraggableProvided, DraggableStateSnapshot, Droppable,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '@/icons';
import { Menu } from '@comp/Menu';
import { Card } from '@comp/Card';
import { CardToolbar } from '@comp/CardToolbar';
import { MenuButton } from '@comp/MenuButton';
import { Divider } from '@comp/Divider';
import {
  ColumnsActions, SystemActions, TodosActions,
} from '@/store/actions';
import {
  EnumColors, EnumTodoStatus, ITodo, ITodos,
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
  columnId?: string;
  color?: number;
  isCollapsed?: boolean;
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
  isCollapsed,
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
  const { cardType } = boards.filter((board) => board.id === boardId)[0];

  const saveCard = (
    id?: string,
    newTitle?: string,
    newDescription?: string,
    newStatus?: EnumTodoStatus,
    newColor?: number,
  ) => {
    console.log('save card id', id, '->', newTitle, '->', newDescription);
    if (id) {
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
      if (newStatus !== undefined) {
        dispatch(TodosActions.updateCompleteStatus({
          id,
          status: newStatus,
        }));
      }
      if (newColor !== undefined) {
        const todoToChange = todos?.find((todo) => todo.id === id);
        if (todoToChange?.color === newColor) {
          dispatch(TodosActions.resetColor({ id }));
        } else {
          dispatch(TodosActions.updateColor({
            id,
            color: newColor,
          }));
        }
      }
      if (id === 'new-todo' && newTitle) {
        dispatch(TodosActions.generateNewId({ id }));
      } else {
        dispatch(TodosActions.removeNewTodo());
      }
    } else if (newTitle || newDescription) {
      dispatch(TodosActions.add(
        {
          columnId: columnId || 'todo-this-case',
          title: newTitle,
          description: newDescription,
          status: newStatus,
        },
      ));
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
        dispatch(ColumnsActions.updateTitle({
          id: columnId,
          title: newTitle,
        }));
      }
      if (newDescription) {
        dispatch(ColumnsActions.updateDescription({
          id: columnId,
          description: newDescription,
        }));
      }
      if (newColor !== undefined) {
        if (color === newColor) {
          dispatch(ColumnsActions.resetColor({ id: columnId }));
        } else {
          dispatch(ColumnsActions.updateColor({
            id: columnId,
            color: newColor,
          }));
        }
      }
      if (columnId === 'new-column' && (newTitle)) {
        dispatch(ColumnsActions.generateNewId({ id: columnId }));
      } else {
        dispatch(ColumnsActions.removeNewColumns());
      }
    } else if (newTitle || newDescription) {
      dispatch(ColumnsActions.add({
        boardId,
        title: newTitle,
        description: newDescription,
      }));
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

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    setIsHoverHeader(false);
    setIsHover(false);
  };

  const colorPickHandler = (newColor: number) => {
    saveColumn(newColor);
    hidePopup();
  };

  const clickHandler = (event: SyntheticEvent) => {
    if (isEditable) {
      event.stopPropagation();
    } else {
      setIsHoverHeader(false);
      dispatch(ColumnsActions.updateIsCollapsed({
        id: columnId!,
        isCollapsed: !isCollapsed,
      }));
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

  const menuButtonClickHandler = (action: EnumMenuActions, payload?: any) => {
    console.log(payload);
    switch (action) {
      case EnumMenuActions.EditColumn: {
        doubleClickHandler();
        break;
      }
      case EnumMenuActions.Duplicate: {
        const newColumnId = `column-${Math.random().toString()}`;
        dispatch(ColumnsActions.duplicate({
          id: columnId!,
          newId: newColumnId,
        }));
        dispatch(TodosActions.duplicateForColumn({
          columnId: columnId!,
          newColumnId,
        }));
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
        dispatch(ColumnsActions.removeNewColumns());
        dispatch(ColumnsActions.addColumnAfter({
          id: columnId!,
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
    (!isOpenNewCard && isDraggable) && (
      <Menu
        imageSrc={icons.add}
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
      imageSrc={icons.dots}
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
        imageSrc={icons.menu.edit}
        onClick={() => menuButtonClickHandler(EnumMenuActions.EditColumn)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Duplicate"
        imageSrc={icons.menu.duplicate}
        onClick={() => menuButtonClickHandler(EnumMenuActions.Duplicate)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Add card"
        imageSrc={icons.menu.addCard}
        onClick={() => menuButtonClickHandler(EnumMenuActions.AddCard)}
      />
      <MenuButton
        text="Add heading"
        imageSrc={icons.menu.addHeading}
        onClick={() => menuButtonClickHandler(EnumMenuActions.AddHeading)}
      />
      <MenuButton
        text="Add column after"
        imageSrc={icons.menu.addColumn}
        onClick={() => menuButtonClickHandler(EnumMenuActions.AddColumnAfter)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuButton
        text="Delete"
        imageSrc={icons.menu.remove}
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
        }
    </>
  ), [isEditable, descriptionValue]);

  const memoTitle = useMemo(() => (
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
              isCollapsed ? (
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
    index, boards, todos, color, colorClass, columnId, isHover,
    isHoverHeader, isOpenNewCard, isEditable,
    titleValue, descriptionValue, query, isCollapsed,
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
