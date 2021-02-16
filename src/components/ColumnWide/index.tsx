import React, {
  FC, SyntheticEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import { DraggableProvided, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { EnumTodoStatus, IColor } from '@type/entities';
import { EnumColumnMode } from '@comp/Column';
import { ColumnHeader } from '@comp/ColumnHeader';
import { ColumnToolbar } from '@comp/ColumnToolbar';
import { ColumnContextMenu } from '@comp/ColumnContextMenu';
import { ArchiveContainer } from '@comp/ArchiveContainer';
import { CardsContainer } from '@comp/CardsContainer';
import { SystemActions, TodosActions } from '@store/actions';
import {
  getBoardCardType,
  getOrderedArchivedTodosByColumnId,
  getOrderedNonArchivedTodosByColumnId,
} from '@store/selectors';
import { useAutoScroll } from '@use/autoScroll';
import { useClickPreventionOnDoubleClick } from '@use/clickPreventionOnDoubleClick';
import { NEW_COLUMN_ID } from '@/constants';

interface IColumnWide {
  snapshot: DraggableStateSnapshot;
  provided: DraggableProvided;
  boardId: number;
  columnId: number;
  belowId?: number;
  color?: IColor;
  title?: string;
  description?: string;
  mode: EnumColumnMode;
  isEditable: boolean;
  scrollToRight?: () => void;
  onClick: (event: React.SyntheticEvent) => void;
}

export const ColumnWide: FC<IColumnWide> = ({
  snapshot,
  provided,
  boardId,
  columnId,
  belowId,
  color,
  title,
  description,
  mode,
  isEditable,
  scrollToRight,
  onClick,
}) => {
  const dispatch = useDispatch();

  const archivedTodos = useSelector(getOrderedArchivedTodosByColumnId(columnId));
  const nonArchivedTodos = useSelector(getOrderedNonArchivedTodosByColumnId(columnId));
  const cardType = useSelector(getBoardCardType(boardId));

  const [isOpenNewCard, setIsOpenNewCard] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isDraggingCard, setIsDraggingCard] = useState<boolean>(false);
  const [isHoverHeader, setIsHoverHeader] = useState<boolean>(false);

  const columnContainerRef = useRef<any>(null);

  const { scrollToBottom } = useAutoScroll(columnContainerRef);

  const saveCard = (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    id?: number, title?: string, description?: string, status?: EnumTodoStatus, newColor?: IColor, todoBelowId?: number,
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

  const handleColumnClick = (event: SyntheticEvent) => {
    if (mode === EnumColumnMode.New) {
      event.stopPropagation();
      dispatch(SystemActions.setEditableColumnId(NEW_COLUMN_ID));
    }
  };

  const handleAddCard = () => {
    setTimeout(scrollToBottom);
    setIsOpenNewCard(true);
  };

  const handleDoubleClickUnwrapped = () => {
    if (mode === EnumColumnMode.Deleted) return;
    dispatch(SystemActions.setEditableColumnId(columnId));
  };

  const handleClickUnwrapped = (event: SyntheticEvent) => {
    if (mode === EnumColumnMode.Normal && !isEditable) {
      onClick(event);
    }
  };

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(handleClickUnwrapped, handleDoubleClickUnwrapped, isEditable);

  useEffect(() => {
    if (belowId) {
      dispatch(SystemActions.setEditableColumnId(columnId));
    }
  }, []);

  const memoCardContainer = useMemo(() => (
    <CardsContainer
      columnId={columnId}
      todos={nonArchivedTodos}
      cardType={cardType}
      mode={mode}
      isOpenNewCard={isOpenNewCard}
      isDraggingCard={isDraggingCard}
      onExitFromEditable={saveCard}
      onAddCard={handleAddCard}
    />
  ), [columnId, nonArchivedTodos, cardType, mode, isOpenNewCard, isDraggingCard]);

  return useMemo(() => (
    <div
      ref={provided.innerRef}
      className={cn('column', {
        'column--dragging': snapshot.isDragging,
      })}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={handleColumnClick}
      {...provided.draggableProps}
    >
      <div
        className={cn('column__wrapper', {
          'column__wrapper--editable': isEditable,
          'column__wrapper--dragging': snapshot.isDragging,
          'column__wrapper--hovered': isHoverHeader && !isEditable,
        })}
      >
        <div className="column__inner">
          <Droppable
            droppableId={`column-${columnId}`}
            type="CARD"
          >
            {
              (dropProvided, dropSnapshot) => {
                setIsDraggingCard(dropSnapshot.isDraggingOver);
                return (
                  <div
                    ref={dropProvided.innerRef}
                    className="column__container"
                  >
                    <div ref={columnContainerRef}>
                      <ColumnHeader
                        provided={provided}
                        boardId={boardId}
                        columnId={columnId}
                        belowId={belowId}
                        title={title}
                        description={description}
                        color={color}
                        isEditable={isEditable}
                        mode={mode}
                        onHover={setIsHoverHeader}
                        onClick={handleClick}
                        onDoubleClick={handleDoubleClick}
                        scrollToRight={scrollToRight}
                      />
                      <ColumnContextMenu
                        isEnabled={mode === EnumColumnMode.Normal}
                        columnId={columnId}
                        boardId={boardId}
                        color={color}
                        isHover={isHover}
                        isHide={isEditable}
                        onAddCard={handleAddCard}
                      />
                      { mode === EnumColumnMode.Normal && memoCardContainer }
                      <ArchiveContainer
                        archivedTodos={archivedTodos}
                        cardType={cardType}
                        onExitFromEditable={saveCard}
                      />
                    </div>
                    {dropProvided.placeholder}
                  </div>
                );
              }
            }
          </Droppable>
        </div>
        { mode === EnumColumnMode.New && !isEditable && (
        <span className="column__new-overlay">
          <img src="/assets/svg/add.svg" alt="add" />
        </span>
        ) }
      </div>
      <ColumnToolbar
        isEnabled={mode === EnumColumnMode.Normal && !isEditable}
        isHoverBlock={isHover && !isHoverHeader}
        onAddCard={handleAddCard}
        onAddHeading={() => console.log('open heading')}
      />
    </div>
  ),
  [isEditable, isHoverHeader, isHover,
    boardId, columnId, belowId,
    title, description, color, mode,
    nonArchivedTodos, archivedTodos, cardType, isOpenNewCard]);
};
