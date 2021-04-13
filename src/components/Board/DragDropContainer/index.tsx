import React, { FC } from 'react';
import {
  DragDropContext, DropResult, Droppable, DroppableProvided, DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

import { BoardsActions } from '@store/actions';

interface IBoardsDragDropContainer {
  children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactElement<HTMLElement>;
}

export const BoardsDragDropContainer: FC<IBoardsDragDropContainer> = ({
  children,
}) => {
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    const sourcePosition = source.index;
    const destinationPosition = destination?.index;
    if (destinationPosition === undefined || sourcePosition === destinationPosition) {
      return;
    }
    dispatch(BoardsActions.effect.move({
      sourcePosition,
      destinationPosition,
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {children}
      </Droppable>
    </DragDropContext>
  );
};
