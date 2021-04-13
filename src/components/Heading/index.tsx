import React, {
  FC, useMemo,
} from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { DraggableOrDiv } from '@comp/DraggableWrapper';
import { HeadingCompact } from '@comp/Heading/Compact';
import { HeadingWide } from '@comp/Heading/Wide';
import { HeadingsActions } from '@store/actions';
import { getHeadingById, getIsSearchMode } from '@store/selectors';
import { EnumCardType, EnumHeadingType, IHeading } from '@type/entities';
import { useParamSelector } from '@use/paramSelector';

export enum EnumHeadingMode {
  Normal,
  New,
}

interface IHeadingComponent {
  index: number;
  isEditable: boolean;
  columnId: number;
  headingId: number;
  cardType: EnumCardType;
  isOpenNewCard?: boolean;
  onAddHeading?: () => void;
  mode: EnumHeadingMode;
}

export const Heading: FC<IHeadingComponent> = ({
  index,
  isEditable,
  columnId,
  headingId,
  cardType,
  mode = EnumHeadingMode.Normal,
}) => {
  const dispatch = useDispatch();

  const isSearchMode = useSelector(getIsSearchMode);

  const {
    color,
    title,
    description,
    isCollapsed,
    type,
  } = useParamSelector(getHeadingById, headingId) as IHeading;

  const handleClick = () => {
    if (mode === EnumHeadingMode.Normal) {
      dispatch(HeadingsActions.effect.update({
        id: headingId!,
        isCollapsed: !isCollapsed,
      }));
    }
  };

  const draggableId = `heading-${headingId || 'undraggable'}`;
  const isDefault = type === EnumHeadingType.Default;
  const isNew = mode === EnumHeadingMode.New;
  const isDragDisabled = isNew || isSearchMode || isDefault;

  return useMemo(() => (
    <DraggableOrDiv
      index={index}
      draggableId={draggableId}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Droppable
          droppableId={`heading-${headingId}`}
          type="CARD"
        >
          {
            (dropProvided, dropSnapshot) => (
              isCollapsed ? (
                <HeadingCompact
                  snapshot={snapshot}
                  provided={provided}
                  dropSnapshot={dropSnapshot}
                  dropProvided={dropProvided}
                  headingId={headingId}
                  color={color}
                  title={title}
                  onClick={handleClick}
                />
              ) : (
                <HeadingWide
                  snapshot={snapshot}
                  provided={provided}
                  dropSnapshot={dropSnapshot}
                  dropProvided={dropProvided}
                  columnId={columnId}
                  headingId={headingId}
                  color={color}
                  title={title}
                  description={description}
                  mode={mode}
                  cardType={cardType}
                  isEditable={isEditable}
                  type={type}
                  onClick={handleClick}
                />
              ))
            }
        </Droppable>
      )}
    </DraggableOrDiv>
  ),
  [
    draggableId, index, isDragDisabled, cardType,
    color, columnId, headingId, title, description,
    isCollapsed, isEditable, mode, isSearchMode,
  ]);
};
