/* eslint-disable @typescript-eslint/no-use-before-define,no-underscore-dangle */
import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import {
  DragDropContext, DraggableLocation, Droppable, DroppableProvided, DropResult,
} from 'react-beautiful-dnd';
import { Column } from '../Column';
import { ITodo, ITodos } from '../../types';

interface TodoMap {
  [key: string]: {
    todos: ITodo[],
    title: string,
    description: string,
  },
}

interface IColumn {
  boardId: string;
  initialColumns: TodoMap;
}

type ReorderTodoMapArgs = {
  quoteMap: TodoMap,
  source: DraggableLocation,
  destination: DraggableLocation,
};

export const Columns: FC<IColumn> = ({ boardId, initialColumns }) => {
  const [columns, setColumns] = useState<TodoMap>(initialColumns);
  const [orderedId, setOrderedId] = useState<Array<string>>([]);

  useEffect(() => {
    setColumns(initialColumns);
    setOrderedId(Object.keys(initialColumns || {}));
  }, [initialColumns]);

  const onDragEnd = (result: DropResult) => {
    if (result.combine) {
      if (result.type === 'COLUMN') {
        const shallow: string[] = [...orderedId];
        shallow.splice(result.source.index, 1);
        setOrderedId(shallow);
        return;
      }

      // @ts-ignore
      const column: ITodos = columns[result.source.droppableId];
      const withTodoRemoved: ITodos = [...column];
      withTodoRemoved.splice(result.source.index, 1);
      // @ts-ignore
      const _columns: TodoMap = {
        ...columns,
        [result.source.droppableId]: withTodoRemoved,
      };
      setColumns(_columns);
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const { source } = result;
    const { destination } = result;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId
        && source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === 'COLUMN') {
      const _orderedId: string[] = reorder(
        orderedId,
        source.index,
        destination.index,
      );
      setOrderedId(_orderedId);
      return;
    }
    // console.log('before', columns);
    const data = reorderTodoMap({
      quoteMap: columns,
      source,
      destination,
    });
    // console.log('after', data);
    setColumns(data);
  };

  const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const reorderTodoMap = ({
    quoteMap,
    source,
    destination,
  }: ReorderTodoMapArgs): TodoMap => {
    const currentDescription: string = quoteMap[source.droppableId].description;
    const currentTitle: string = quoteMap[source.droppableId].title;
    const current: ITodo[] = [...quoteMap[source.droppableId].todos];

    const nextTitle: string = quoteMap[destination.droppableId].title;
    const nextDescription: string = quoteMap[destination.droppableId].description;
    const next: ITodo[] = [...quoteMap[destination.droppableId].todos];

    const target: ITodo = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
      const reordered = {
        title: currentTitle,
        description: currentTitle,
        todos: reorder(current, source.index, destination.index),
      };
      return {
        ...quoteMap,
        [source.droppableId]: reordered,
      };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    // console.log('source.droppableId', source.droppableId);
    // console.log('destination.droppableId', destination.droppableId);
    // console.log('source.index', source.index);
    // console.log('target', target);
    // console.log('current', current);
    // console.log('next', next);
    return {
      ...quoteMap,
      [source.droppableId]: {
        todos: current,
        description: currentDescription,
        title: currentTitle,
      },
      [destination.droppableId]: {
        todos: next,
        description: nextDescription,
        title: nextTitle,
      },
    };
  };

  const drawColumns = useMemo(() => (
    orderedId && orderedId.map((key, index) => {
      console.log('rerender', key, 'todos:', columns[key].todos);
      return (
        <Column
          index={index}
          columnId={key}
          boardId={boardId}
          key={key}
          title={columns[key].title}
          todos={columns[key].todos}
          description={columns[key].description}
        />
      );
    })
  ), [columns, orderedId]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
      >
        {(provided: DroppableProvided) => (
          <div
            className="columns"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            { drawColumns }
            <Column boardId={boardId} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
