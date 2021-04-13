import cn from 'classnames';
import React, {
  FC, SyntheticEvent, useEffect, useRef,
} from 'react';
import {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { NEW_TODO_ID } from '@/constants';
import { CardsContainer } from '@comp/CardsContainer';
import { EnumHeadingMode } from '@comp/Heading';
import { HeadingContextMenu } from '@comp/Heading/ContextMenu';
import { HeadingHeader } from '@comp/Heading/Header';
import { SystemActions } from '@store/actions';
import { getEditableCardId } from '@store/selectors';
import { EnumCardType, EnumHeadingType, IColor } from '@type/entities';
import { useClickPreventionOnDoubleClick } from '@use/clickPreventionOnDoubleClick';
import { EnumScrollPosition, useScrollToRef } from '@use/scrollToRef';

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
  cardType: EnumCardType;
  isEditable: boolean;
  type: EnumHeadingType;
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
  onClick,
}) => {
  const dispatch = useDispatch();

  const editableCardId = useSelector(getEditableCardId);

  const headingContainerRef = useRef<any>(null);
  const [scrollToRef, refForScroll] = useScrollToRef<HTMLDivElement>();

  const handleHeadingClick = (event: SyntheticEvent) => {
    if (mode === EnumHeadingMode.New) {
      event.stopPropagation();
    }
  };

  const handleAddCard = () => {
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

  useEffect(() => {
    if (isEditable) {
      scrollToRef({
        block: EnumScrollPosition.Center,
      });
    }
  }, [isEditable]);

  return (
    <div
      ref={(ref) => {
        provided.innerRef(ref);
        refForScroll.current = ref;
      }}
      className={cn('heading', {
        'heading--dragging': snapshot.isDragging,
      })}
      onClick={handleHeadingClick}
      {...provided.draggableProps}
    >
      <div
        ref={headingContainerRef}
        className={cn('heading__wrapper', {
          'heading__wrapper--editable': isEditable,
          'heading__wrapper--dragging': snapshot.isDragging,
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
              {type !== EnumHeadingType.Default && (
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
                  onClick={handleClick}
                  onDoubleClick={handleDoubleClick}
                />
                <HeadingContextMenu
                  isEnabled={mode === EnumHeadingMode.Normal}
                  headingId={headingId}
                  color={color}
                  isHide={isEditable}
                  onAddCard={handleAddCard}
                />
              </>
              )}
              {mode === EnumHeadingMode.Normal && (
                <CardsContainer
                  headingId={headingId}
                  cardType={cardType}
                  mode={mode}
                  type={type}
                  isOpenNewCard={editableCardId === `${headingId}-${NEW_TODO_ID}`}
                  dropSnapshot={dropSnapshot}
                  onAddCard={handleAddCard}
                />
              )}
            </div>
            {dropProvided.placeholder}
          </div>
        </div>
      </div>
    </div>
  );
};
