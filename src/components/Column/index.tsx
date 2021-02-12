import React, {
  FC, SyntheticEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import {
  Draggable, DraggableProvided, DraggableStateSnapshot, Droppable,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@comp/Menu';
import { Card } from '@comp/Card';
import { CardToolbar } from '@comp/CardToolbar';
import { MenuItem } from '@comp/MenuItem';
import { Divider } from '@comp/Divider';
import {
  ColumnsActions, SystemActions, TodosActions,
} from '@store/actions';
import {
  EnumTodoStatus, IColor,
} from '@type/entities';
import { useFocus } from '@use/focus';
import { ColorPicker } from '@comp/ColorPicker';
import { useClickPreventionOnDoubleClick } from '@use/clickPreventionOnDoubleClick';
import { ArchiveContainer } from '@comp/ArchiveContainer';
import { CardsContainer } from '@comp/CardsContainer';
import { CardPopup } from '@comp/CardPopup';
import { TextArea } from '@comp/TextArea';
import { useShiftEnterRestriction } from '@use/shiftEnterRestriction';
import {
  getIsEditableColumn,
  getBoardCardType,
  getIsSearchMode,
  getOrderedArchivedTodosByColumnId,
  getOrderedNonArchivedTodosByColumnId, getTodosCountByColumnId,
} from '@store/selectors';
import { ControlButton } from '@comp/ControlButton';
import { useColorClass } from '@use/colorClass';
import { useAutoScroll } from '@use/autoScroll';

interface IColumn {
  index: number;
  columnId?: number;
  belowId?: number;
  color?: IColor;
  isCollapsed?: boolean;
  boardId?: number | null;
  title?: string;
  description?: string;
  isNew?: boolean;
  isDeleted?: boolean;
  scrollToRight?: () => void;
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
  isNew,
  isDeleted,
  scrollToRight,
}) => {
  const dispatch = useDispatch();

  const { focus } = useFocus();
  const { shiftEnterRestriction } = useShiftEnterRestriction();
  const colorClass = useColorClass('column__wrapper', color);

  const todosCount = useSelector(getTodosCountByColumnId(columnId));
  const archivedTodos = useSelector(getOrderedArchivedTodosByColumnId(columnId));
  const nonArchivedTodos = useSelector(getOrderedNonArchivedTodosByColumnId(columnId));
  const cardType = useSelector(getBoardCardType(boardId));
  const isEditableColumn = useSelector(getIsEditableColumn);
  const isSearchMode = useSelector(getIsSearchMode);

  const [isOpenNewCard, setIsOpenNewCard] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isTopHover, setIsTopHover] = useState<boolean>(false);
  const [isDraggingCard, setIsDraggingCard] = useState<boolean>(false);
  const [isHoverHeader, setIsHoverHeader] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>();
  const [titleValue, setTitleValue] = useState<string>(initialTitle || '');
  const [descriptionValue, setDescriptionValue] = useState<string>(initialDescription || '');

  const titleInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);
  const columnContainerRef = useRef<any>(null);

  const { scrollToBottom } = useAutoScroll(columnContainerRef);

  const saveCard = (
    id?: number,
    title?: string,
    description?: string,
    status?: EnumTodoStatus,
    newColor?: IColor,
    todoBelowId?: number,
  ) => {
    if (id) {
      if (title) {
        dispatch(TodosActions.updateTitle({ id, title }));
      }
      if (description) {
        dispatch(TodosActions.updateDescription({ id, description }));
      }
      if (status !== undefined) {
        dispatch(TodosActions.updateCompleteStatus({ id, status }));
      }
      if (newColor !== undefined) {
        dispatch(TodosActions.updateColor({
          id,
          color: newColor,
        }));
      }
    } else if (title) {
      setTimeout(() => {
        setIsOpenNewCard(true);
      });
      setTimeout(scrollToBottom, 200);
      dispatch(TodosActions.create({
        columnId: columnId!,
        title,
        description: description || undefined,
        status,
        belowId: todoBelowId,
      }));
    }
    setIsOpenNewCard(false);
  };

  const getNewData = () => ({
    title: initialTitle !== titleValue
      ? titleValue.trim()
      : undefined,
    description: initialDescription !== descriptionValue
      ? descriptionValue.trim()
      : undefined,
  });

  const saveColumn = (newColor?: IColor) => {
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
          color: newColor,
        }));
      }
    } else if (title) {
      setTimeout(() => {
        scrollToRight?.();
        setIsEditable(true);
      }, 200);
      dispatch(ColumnsActions.create({
        boardId: boardId!,
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

  const handleKeyDown = (event: any) => {
    const { key, ctrlKey, shiftKey } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey) {
      setIsEditable(false);
      saveColumn();
    }
  };

  const handleChange = (event: any, isDescription: boolean) => {
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

  const handleColorPick = (newColor: IColor) => {
    saveColumn(newColor);
    hidePopup();
  };

  const handleDoubleClickUnwrapped = () => {
    if (isDeleted) return;
    if (isEditableColumn) {
      dispatch(SystemActions.setIsEditableColumn(false));
    }
    setIsDoubleClicked(true);
  };

  const handleClickUnwrapped = (event: SyntheticEvent) => {
    if (isDeleted) return;
    if (isEditable) {
      event.stopPropagation();
    } else if (!isNew) {
      setIsHoverHeader(false);
      dispatch(ColumnsActions.updateIsCollapsed({
        id: columnId!,
        isCollapsed: !isCollapsed,
      }));
    } else {
      handleDoubleClickUnwrapped();
    }
  };

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(handleClickUnwrapped, handleDoubleClickUnwrapped, isEditable);

  const handleMenuButtonClick = (action: EnumMenuActions) => {
    switch (action) {
      case EnumMenuActions.EditColumn: {
        handleDoubleClickUnwrapped();
        break;
      }
      case EnumMenuActions.Duplicate: {
        dispatch(ColumnsActions.duplicate({
          columnId: columnId!,
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
        dispatch(ColumnsActions.removeTemp());
        dispatch(ColumnsActions.drawBelow({
          belowId: columnId!,
          boardId: boardId!,
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
    focus(titleInputRef);
  }, [isEditable]);

  useEffect(() => {
    if (belowId) {
      handleDoubleClickUnwrapped();
    }
  }, []);

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

  const handleAddCard = () => {
    requestAnimationFrame(scrollToBottom);
    setIsOpenNewCard(true);
  };

  const addCard = useMemo(() => (
    (!isOpenNewCard && !isNew) && (
    <>
      <ControlButton
        imageSrc="/assets/svg/add.svg"
        alt="add"
        text="Add card"
        isInvisible
        isHoverBlock={(isTopHover && !isDraggingCard) || todosCount === 0}
        isMaxWidth
        onClick={handleAddCard}
      />
    </>
    )
  ), [isTopHover, isDraggingCard, todosCount, isOpenNewCard, isNew]);

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
      todos={nonArchivedTodos}
      cardType={cardType}
      onExitFromEditable={saveCard}
    />
  ), [nonArchivedTodos, columnId, isOpenNewCard]);

  const contextMenu = useMemo(() => (
    <Menu
      imageSrc="/assets/svg/dots.svg"
      alt="menu"
      imageSize={22}
      size={24}
      isInvisible
      isHoverBlock={isHover}
      position="bottom"
    >
      <ColorPicker onPick={handleColorPick} activeColor={color} />
      <MenuItem
        text="Edit column"
        imageSrc="/assets/svg/menu/edit.svg"
        onClick={() => handleMenuButtonClick(EnumMenuActions.EditColumn)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuItem
        text="Duplicate"
        imageSrc="/assets/svg/menu/duplicate.svg"
        onClick={() => handleMenuButtonClick(EnumMenuActions.Duplicate)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuItem
        text="Add card"
        imageSrc="/assets/svg/menu/add-card.svg"
        onClick={() => handleMenuButtonClick(EnumMenuActions.AddCard)}
      />
      <MenuItem
        text="Add heading"
        imageSrc="/assets/svg/menu/add-heading.svg"
        onClick={() => handleMenuButtonClick(EnumMenuActions.AddHeading)}
      />
      <MenuItem
        text="Add column after"
        imageSrc="/assets/svg/menu/add-column.svg"
        onClick={() => handleMenuButtonClick(EnumMenuActions.AddColumnAfter)}
      />
      <Divider verticalSpacer={7} horizontalSpacer={10} />
      <MenuItem
        text="Delete"
        imageSrc="/assets/svg/menu/remove.svg"
        hintText="⌫"
        onClick={() => handleMenuButtonClick(EnumMenuActions.Delete)}
      />
    </Menu>
  ), [isHover, color]);

  const cardToolbar = useMemo(() => (
    <CardToolbar
      isHoverBlock={isHover && !isHoverHeader && !isEditable}
      onClickCard={() => setIsOpenNewCard(true)}
      onClickHeading={() => console.log('open heading')}
    />
  ), [isHover, isHoverHeader, isEditable]);

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
              onKeyDown={shiftEnterRestriction}
              onKeyDownCapture={(event) => handleKeyDown(event)}
              onChange={(event) => handleChange(event, true)}
            />
          ) : (
            <span
              className={cn('column__description', {
                'column__description--empty': !descriptionValue,
              })}
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
                onKeyDown={shiftEnterRestriction}
                onKeyDownCapture={(event) => handleKeyDown(event)}
                onChange={(event) => handleChange(event, false)}
              />
            ) : (
              <>
                <span
                  className={cn('column__title', {
                    'column__title--empty': !titleValue,
                  })}
                >
                  {titleValue || 'New column'}
                </span>
                {
                  ((titleValue || descriptionValue || todosCount) && !isDeleted)
                    ? contextMenu
                    : null
                }
              </>
            )
          }
          </div>
        )
        }
    </>
  ), [isEditable, titleValue, descriptionValue, todosCount, contextMenu, color]);

  const memoColumn = useMemo(() => (
    <Draggable
      draggableId={`column-${columnId}`}
      index={index}
      isDragDisabled={isNew || isDeleted || isSearchMode}
    >
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <>
          {
            isCollapsed ? (
              <div
                role="button"
                tabIndex={0}
                className={cn('column', 'column--compact', {
                  'column--dragging': snapshot.isDragging,
                })}
                ref={provided.innerRef}
                {...provided.draggableProps}
                onMouseEnter={() => setIsHoverHeader(true)}
                onMouseLeave={() => setIsHoverHeader(false)}
                onClick={handleClick}
              >
                <div
                  className={cn('column__wrapper', 'column__wrapper--compact', {
                    'column__wrapper--hovered': isHoverHeader && !isEditable,
                    'column__wrapper--dragging': snapshot.isDragging,
                    [colorClass]: color !== undefined,
                  })}
                  {...provided.dragHandleProps}
                >
                  <div className="column__inner">
                    <div className="column__counter">
                      <div className="column__compact-text">
                        { todosCount }
                      </div>
                    </div>
                    <div className="column__compact-text">{titleValue}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={cn('column', {
                  'column--dragging': snapshot.isDragging,
                })}
                ref={provided.innerRef}
                {...provided.draggableProps}
                onMouseOver={() => setIsHover(true)}
                onMouseOut={() => setIsHover(false)}
                onClick={isNew ? handleClick : () => {}}
              >
                <div
                  className={cn('column__wrapper', {
                    'column__wrapper--editable': isEditable,
                    'column__wrapper--dragging': snapshot.isDragging,
                    'column__wrapper--hovered': isHoverHeader && !isEditable,
                  })}
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
                              className="column__container-inner"
                              ref={columnContainerRef}
                              onMouseEnter={() => setIsTopHover(true)}
                              onMouseLeave={() => setIsTopHover(false)}
                            >
                              <div
                                style={{ paddingBottom: `${dropSnapshot.isDraggingOver ? '36px' : '0px'}` }}
                              >
                                <div
                                  role="button"
                                  tabIndex={0}
                                  className={cn('column__header', {
                                    'column__header--editable': isEditable,
                                    [colorClass]: color !== undefined,
                                  })}
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
                                <span className="column__new-overlay">
                                  <img src="/assets/svg/add.svg" alt="add" />
                                </span>
                                ) }
                                { !isNew && (
                                <>
                                  { todoCards }
                                  {
                                    !isDeleted && (
                                    <>
                                      {newCard}
                                      {addCard}
                                    </>
                                    )
                                  }
                                </>
                                ) }
                              </div>
                            </div>
                            <ArchiveContainer
                              archivedTodos={archivedTodos}
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
    index, todosCount, color, colorClass, columnId, isHover,
    isHoverHeader, isOpenNewCard, isEditable,
    titleValue, descriptionValue, isCollapsed,
    isTopHover, isDraggingCard, isNew, isSearchMode,
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
