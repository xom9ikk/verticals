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
import { EnumCardType, EnumHeadingType, IColor } from '@type/entities';
import { EnumHeadingMode } from '@comp/Heading';
import { HeadingHeader } from '@comp/Heading/Header';
import { CardsContainer } from '@comp/CardsContainer';
import { SystemActions } from '@store/actions';
import { getEditableCardId } from '@store/selectors';
import { useClickPreventionOnDoubleClick } from '@use/clickPreventionOnDoubleClick';
import { NEW_TODO_ID } from '@/constants';
import { HeadingContextMenu } from '@comp/Heading/ContextMenu';
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

  const [isHoverHeader, setIsHoverHeader] = useState<boolean>(false);

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

  return useMemo(() => {
    console.log('TODO: Heading redraw', isHoverHeader, !isEditable);
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
                    />
                    <HeadingContextMenu
                      isEnabled={mode === EnumHeadingMode.Normal}
                      headingId={headingId}
                      color={color}
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
                  isShowAddCardButton={isHoverHeader && !isEditable}
                  onAddCard={handleAddCard}
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
    isHoverHeader, type,
    columnId, headingId, belowId,
    title, description, color, mode,
    cardType]);
};
