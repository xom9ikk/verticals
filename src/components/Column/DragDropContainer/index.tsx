import React, { FC } from 'react';
import {
  DragDropContext,
  DropResult,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

import {
  ColumnsActions,
  HeadingsActions,
  SubTodosActions,
  TodosActions,
} from '@store/actions';

interface IColumnsDragDropContainer {
  activeBoardId: number | null;
  children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactElement<HTMLElement>;
}
export const ColumnsDragDropContainer: FC<IColumnsDragDropContainer> = ({
  activeBoardId,
  children,
}) => {
  const dispatch = useDispatch();

  const isDefaultHeadingPosition = (position: number) => position === 0;

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    // dropped nowhere
    if (!destination) {
      return;
    }

    // did not move anywhere - can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // reordering column
    if (type === 'COLUMN') {
      dispatch(ColumnsActions.effect.move({
        sourcePosition: source.index,
        destinationPosition: destination.index,
        boardId: Number(source.droppableId.split('board-')[1]),
      }));
      return;
    }

    if (type === 'HEADING') {
      const sourceColumnId = Number(source.droppableId.split('column-')[1]);

      // moving to same COLUMN list
      const sourcePosition = source.index;
      const destinationPosition = isDefaultHeadingPosition(destination.index) ? 1 : destination.index;
      const targetColumnId = Number(destination.droppableId.split('column-')[1]);

      if (source.droppableId === destination.droppableId) {
        dispatch(HeadingsActions.effect.move({
          sourcePosition,
          destinationPosition,
          columnId: targetColumnId,
        }));
        return;
      }

      // moving to different list
      dispatch(HeadingsActions.effect.move({
        columnId: sourceColumnId,
        targetColumnId,
        sourcePosition,
        destinationPosition,
      }));
    }

    if (type === 'CARD') {
      const sourceHeadingId = Number(source.droppableId.split('heading-')[1]);

      // moving to same HEADING list
      const sourcePosition = source.index;
      const destinationPosition = destination.index;
      const targetHeadingId = Number(destination.droppableId.split('heading-')[1]);

      if (source.droppableId === destination.droppableId) {
        dispatch(TodosActions.effect.move({
          sourcePosition,
          destinationPosition,
          headingId: targetHeadingId,
        }));
        return;
      }

      // moving to different list
      dispatch(TodosActions.effect.move({
        headingId: sourceHeadingId,
        targetHeadingId,
        sourcePosition,
        destinationPosition,
      }));
    }

    if (type === 'SUBCARD') {
      const sourceTodoId = Number(source.droppableId.split('todo-')[1]);

      // moving to same to do list
      const sourcePosition = source.index;
      const destinationPosition = destination.index;
      const targetTodoId = Number(destination.droppableId.split('todo-')[1]);

      if (source.droppableId === destination.droppableId) {
        dispatch(SubTodosActions.effect.move({
          sourcePosition,
          destinationPosition,
          todoId: targetTodoId,
        }));
        return;
      }

      // moving to different list
      dispatch(SubTodosActions.effect.move({
        todoId: sourceTodoId,
        targetTodoId,
        sourcePosition,
        destinationPosition,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={`board-${activeBoardId}`}
        type="COLUMN"
        direction="horizontal"
      >
        {children}
      </Droppable>
    </DragDropContext>
  );
};
