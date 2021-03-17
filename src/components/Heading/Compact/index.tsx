import React, { FC } from 'react';
import { IColor } from '@type/entities';
import {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { getTodoPositionsByHeadingId } from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';
import { CompactListView } from '@comp/CompactListView';

interface IHeadingContextMenu {
  snapshot: DraggableStateSnapshot;
  provided: DraggableProvided;
  dropSnapshot: DroppableStateSnapshot;
  dropProvided: DroppableProvided;
  headingId?: number;
  color?: IColor;
  title: string;
  isHeading?: boolean;
  onClick: (event: React.SyntheticEvent) => void;
}

export const HeadingCompact: FC<IHeadingContextMenu> = ({
  headingId,
  dropProvided,
  dropSnapshot,
  ...props
}) => {
  const todoPositions = useParamSelector(getTodoPositionsByHeadingId, headingId);

  return (
    <div
      style={{
        margin: '1px 3px',
        maxHeight: 36,
        borderRadius: 6,
        boxShadow: dropSnapshot.isDraggingOver ? 'inset 0 0 0 2px #2688f3' : 'none',
      }}
      ref={dropProvided.innerRef}
    >
      <CompactListView
        {...props}
        count={todoPositions.length}
      />
      {dropProvided.placeholder}
    </div>
  );
};
