/* eslint-disable @typescript-eslint/no-shadow */
import React, {
  FC, useMemo,
} from 'react';
import {
  Draggable, DraggableProvided, DraggableStateSnapshot, Droppable,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { EnumHeadingType, EnumCardType, IHeading } from '@type/entities';
import { HeadingsActions } from '@store/actions';
import { getHeadingById, getIsSearchMode } from '@store/selectors';
import { HeadingCompact } from '@comp/Heading/Compact';
import { useParamSelector } from '@use/paramSelector';
import { HeadingWide } from '@comp/Heading/Wide';

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

  // @ts-ignore TODO
  const Div = ({ children }) => <div>{children({ innerRef: () => {} }, {})}</div>;
  interface IDraggableComponent {
    index: number;
    draggableId: string;
    isDragDisabled: boolean;
    children: (p: DraggableProvided, s: DraggableStateSnapshot) => any
  }

  const DraggableComponent: FC<IDraggableComponent> = ({
    index,
    draggableId,
    isDragDisabled,
    children,
  }) => (
    <Draggable
      index={index}
      draggableId={draggableId}
      isDragDisabled={isDragDisabled}
    >
      {children}
    </Draggable>
  );

  const DraggableOrDiv = useMemo(() => (isDefault ? Div : DraggableComponent), [isDefault]);

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
