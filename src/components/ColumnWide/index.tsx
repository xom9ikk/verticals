import React, {
  FC, SyntheticEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import { DraggableProvided, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { EnumTodoType, IColor } from '@type/entities';
import { EnumColumnMode } from '@comp/Column';
import { ColumnHeader } from '@comp/ColumnHeader';
import { ColumnToolbar } from '@comp/ColumnToolbar';
import { ColumnContextMenu } from '@comp/ColumnContextMenu';
import { ArchiveContainer } from '@comp/ArchiveContainer';
import { CardsContainer } from '@comp/CardsContainer';
import { SystemActions } from '@store/actions';
import {
  getEditableCardId,
} from '@store/selectors';
import { useAutoScroll } from '@use/autoScroll';
import { useClickPreventionOnDoubleClick } from '@use/clickPreventionOnDoubleClick';
import { NEW_COLUMN_ID, NEW_TODO_ID } from '@/constants';

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
  cardType: EnumTodoType;
  isEditable: boolean;
  scrollToRight?: () => void;
  onClick: (event: React.SyntheticEvent) => void;
  onResize: (event: React.MouseEvent | React.TouchEvent) => void;
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
  cardType,
  isEditable,
  scrollToRight,
  onClick,
  onResize,
}) => {
  const dispatch = useDispatch();

  const editableCardId = useSelector(getEditableCardId);

  // const nonArchivedTodos = useParamSelector(getNonArchivedTodoPositionsByColumnId, columnId);
  // const allTodos = useSelector(getTodosEntities);
  // const isSearchMode = useSelector(getIsSearchMode);
  // const todos = mode === EnumColumnMode.Deleted && !isSearchMode ? allTodos : nonArchivedTodos;

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isHoverHeader, setIsHoverHeader] = useState<boolean>(false);

  const columnContainerRef = useRef<any>(null);

  const { scrollToBottom } = useAutoScroll(columnContainerRef);

  const handleColumnClick = (event: SyntheticEvent) => {
    if (mode === EnumColumnMode.New) {
      event.stopPropagation();
      dispatch(SystemActions.setEditableColumnId(NEW_COLUMN_ID));
    }
  };

  const handleAddCard = () => {
    setTimeout(scrollToBottom);
    dispatch(SystemActions.setEditableCardId(`${columnId}-${NEW_TODO_ID}`));
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

  return useMemo(() => {
    console.log('TODO: Column redraw');
    return (
      <div
        ref={(ref) => {
          provided.innerRef(ref);
        }}
        className={cn('column', {
          'column--dragging': snapshot.isDragging,
          'column--new': mode === EnumColumnMode.New,
        })}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={handleColumnClick}
        {...provided.draggableProps}
      >
        <div
          ref={columnContainerRef}
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
                (dropProvided, dropSnapshot) => (
                  <div
                    ref={dropProvided.innerRef}
                    className="column__container"
                  >
                    <div>
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
                      { mode !== EnumColumnMode.New && (
                        <>
                          {/* Default */}
                          {/* Naming Heading 1 */}
                          {/* Naming Heading 2 */}
                          {/* Naming Heading 3 */}
                          {/* Arch */}

                          <CardsContainer
                            columnId={columnId}
                            // todos={todos}
                            cardType={cardType}
                            mode={mode}
                            isOpenNewCard={editableCardId === `${columnId}-${NEW_TODO_ID}`}
                            isDraggingCard={dropSnapshot.isDraggingOver}
                            onAddCard={handleAddCard}
                            scrollToBottom={scrollToBottom}
                          />
                          <ArchiveContainer
                            columnId={columnId}
                            cardType={cardType}
                          />
                        </>
                      ) }
                    </div>
                    {dropProvided.placeholder}
                  </div>
                )
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
        {
          mode === EnumColumnMode.Normal && (
          <div
            style={{
              position: 'absolute',
              height: '100%',
              width: 10,
              right: -5,
              top: 0,
              zIndex: 1,
              cursor: 'ew-resize',
            }}
            aria-hidden
            onMouseDown={onResize}
            onTouchStart={onResize}
          />
          )
        }
      </div>
    );
  },
  [snapshot, provided, isEditable, editableCardId,
    isHoverHeader, isHover,
    boardId, columnId, belowId,
    title, description, color, mode,
    cardType]); // todos
};
