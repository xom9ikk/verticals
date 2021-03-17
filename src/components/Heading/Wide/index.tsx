import React, {
  FC, SyntheticEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { EnumHeadingType, EnumTodoType, IColor } from '@type/entities';
import { EnumHeadingMode } from '@comp/Heading';
import { HeadingHeader } from '@comp/Heading/Header';
import { CardsContainer } from '@comp/CardsContainer';

import { SystemActions } from '@store/actions';
import { getEditableCardId } from '@store/selectors';
import { useClickPreventionOnDoubleClick } from '@use/clickPreventionOnDoubleClick';
import { NEW_TODO_ID } from '@/constants';
import { HeadingContextMenu } from '@comp/Heading/ContextMenu';

interface IHeadingWide {
  snapshot: DraggableStateSnapshot;
  provided: DraggableProvided;
  dropSnapshot: DroppableStateSnapshot;
  dropProvided: DroppableProvided;
  columnId: number;
  headingId: number;
  belowId?: number;
  color?: IColor;
  title?: string;
  description?: string;
  mode: EnumHeadingMode;
  cardType: EnumTodoType;
  isEditable: boolean;
  type: EnumHeadingType;
  scrollToBottom?: () => void;
  onClick: (event: React.SyntheticEvent) => void;
}

export const HeadingWide: FC<IHeadingWide> = ({
  snapshot,
  provided,
  dropSnapshot,
  dropProvided,
  columnId,
  headingId,
  belowId,
  color,
  title,
  description,
  mode,
  cardType,
  isEditable,
  type,
  scrollToBottom = () => {},
  onClick,
}) => {
  const dispatch = useDispatch();

  const editableCardId = useSelector(getEditableCardId);

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isHoverHeader, setIsHoverHeader] = useState<boolean>(false);

  const headingContainerRef = useRef<any>(null);

  // const { scrollToBottom } = useAutoScroll(headingContainerRef);

  const handleHeadingClick = (event: SyntheticEvent) => {
    if (mode === EnumHeadingMode.New) {
      event.stopPropagation();
      // dispatch(SystemActions.setEditableHeadingId(NEW_COLUMN_ID));
    }
  };

  const handleAddCard = () => {
    setTimeout(scrollToBottom);
    dispatch(SystemActions.setEditableCardId(`${headingId}-${NEW_TODO_ID}`));
  };

  const handleDoubleClickUnwrapped = () => {
    dispatch(SystemActions.setEditableHeadingId(headingId));
  };

  const handleClickUnwrapped = (event: SyntheticEvent) => {
    if (mode === EnumHeadingMode.Normal && !isEditable) {
      onClick(event);
    }
  };

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(handleClickUnwrapped, handleDoubleClickUnwrapped, isEditable);

  useEffect(() => {
    if (belowId) {
      dispatch(SystemActions.setEditableHeadingId(headingId));
    }
  }, []);

  return useMemo(() => {
    console.log('TODO: Heading redraw');
    return (
      <div
        ref={(ref) => {
          provided.innerRef(ref);
        }}
        className={cn('heading', {
          'heading--dragging': snapshot.isDragging,
        })}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={handleHeadingClick}
        {...provided.draggableProps}
      >
        <div
          ref={headingContainerRef}
          className={cn('heading__wrapper', {
            'heading__wrapper--editable': isEditable,
            'heading__wrapper--dragging': snapshot.isDragging,
            'heading__wrapper--hovered': isHoverHeader && !isEditable,
          })}
        >
          <div className="heading__inner">
            <div
              ref={dropProvided.innerRef}
              className={cn('heading__container', {
                'heading__container--dragging-over': dropSnapshot.isDraggingOver && type !== EnumHeadingType.Default,
              })}
            >
              <div>
                {
                  type !== EnumHeadingType.Default && (
                  <>
                    <HeadingHeader
                      provided={provided}
                      columnId={columnId}
                      headingId={headingId}
                      belowId={belowId}
                      title={title}
                      description={description}
                      color={color}
                      isEditable={isEditable}
                      mode={mode}
                      type={type}
                      onHover={setIsHoverHeader}
                      onClick={handleClick}
                      onDoubleClick={handleDoubleClick}
                      scrollToBottom={scrollToBottom}
                    />
                    <HeadingContextMenu
                      isEnabled={mode === EnumHeadingMode.Normal}
                      headingId={headingId}
                      color={color}
                      isHover={isHover}
                      isHide={isEditable}
                      onAddCard={handleAddCard}
                    />
                  </>
                  )
                }

                { mode === EnumHeadingMode.Normal && (
                <CardsContainer
                  headingId={headingId}
                  cardType={cardType}
                  mode={mode}
                  type={type}
                  isOpenNewCard={editableCardId === `${headingId}-${NEW_TODO_ID}`}
                  dropSnapshot={dropSnapshot}
                  onAddCard={handleAddCard}
                  scrollToBottom={scrollToBottom}
                />
                ) }
              </div>
              {dropProvided.placeholder}
            </div>
          </div>
        </div>
      </div>
    );
  },
  [snapshot, provided, dropSnapshot, dropProvided,
    isEditable, editableCardId,
    isHoverHeader, isHover, type,
    columnId, headingId, belowId,
    title, description, color, mode,
    cardType]);
};
