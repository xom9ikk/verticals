import cn from 'classnames';
import React, {
  FC, SyntheticEvent, useEffect, useMemo,
} from 'react';
import { DraggableProvided, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { NEW_COLUMN_ID, NEW_HEADING_ID } from '@/constants';
import { ArchiveContainer } from '@comp/ArchiveContainer';
import { EnumColumnMode } from '@comp/Column';
import { ColumnContextMenu } from '@comp/Column/ContextMenu';
import { ColumnHeader } from '@comp/Column/Header';
import { ColumnToolbar } from '@comp/Column/Toolbar';
import { DeletedCardsContainer } from '@comp/DeletedCardsContainer';
import { Headings } from '@comp/Headings';
import { SystemActions } from '@store/actions';
import { getIsSearchMode } from '@store/selectors';
import { EnumCardType, IColor } from '@type/entities';
import { useClickPreventionOnDoubleClick } from '@use/clickPreventionOnDoubleClick';

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
  cardType: EnumCardType;
  isEditable: boolean;
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
  onClick,
  onResize,
}) => {
  const dispatch = useDispatch();

  const isSearchMode = useSelector(getIsSearchMode);

  const handleColumnClick = (event: SyntheticEvent) => {
    if (mode === EnumColumnMode.New) {
      event.stopPropagation();
      dispatch(SystemActions.setEditableColumnId(NEW_COLUMN_ID));
    }
  };

  const handleAddCard = () => {
    dispatch(SystemActions.effect.setEditableCardIdByColumnId(columnId));
  };

  const handleAddHeading = () => {
    dispatch(SystemActions.setEditableHeadingId(`${columnId}-${NEW_HEADING_ID}`));
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

  const memoNewColumn = useMemo(() => mode === EnumColumnMode.New && !isEditable && !isSearchMode && (
  <span className="column__new-overlay">
    <img src="/assets/svg/add.svg" alt="add" />
  </span>
  ), [mode, isEditable, isSearchMode]);

  const memoResizer = useMemo(() => mode === EnumColumnMode.Normal && (
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
  ), [mode]);

  return useMemo(() => (
    <div
      ref={provided.innerRef}
      className={cn('column', {
        'column--dragging': snapshot.isDragging,
        'column--new': mode === EnumColumnMode.New,
      })}
      onClick={handleColumnClick}
      {...provided.draggableProps}
    >
      <div
        className={cn('column__wrapper', {
          'column__wrapper--editable': isEditable,
          'column__wrapper--dragging': snapshot.isDragging,
        })}
      >
        <div className="column__inner">
          <Droppable
            droppableId={`column-${columnId}`}
            type="HEADING"
          >
            {(dropProvided) => (
              <div
                ref={dropProvided.innerRef}
                className="column__container"
              >
                <>
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
                    onClick={handleClick}
                    onDoubleClick={handleDoubleClick}
                  />
                  <ColumnContextMenu
                    isEnabled={mode === EnumColumnMode.Normal}
                    columnId={columnId}
                    boardId={boardId}
                    color={color}
                    isHide={isEditable}
                    onAddCard={handleAddCard}
                    onAddHeading={handleAddHeading}
                  />
                  { mode !== EnumColumnMode.New && (
                    <>
                      {
                        mode === EnumColumnMode.Deleted ? (
                          <DeletedCardsContainer />
                        ) : (
                          <Headings
                            dropProvided={dropProvided}
                            columnId={columnId}
                            cardType={cardType}
                          />
                        )
                      }
                      <ArchiveContainer
                        columnId={columnId}
                        cardType={cardType}
                      />
                    </>
                  ) }
                </>
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        { memoNewColumn }
      </div>
      <ColumnToolbar
        isEnabled={mode === EnumColumnMode.Normal && !isEditable}
        isInvisible
        onAddCard={handleAddCard}
        onAddHeading={handleAddHeading}
      />
      { memoResizer }
    </div>
  ),
  [snapshot, provided, isEditable,
    isSearchMode, boardId, columnId, belowId,
    title, description, color, mode,
    cardType]);
};
