/* eslint-disable @typescript-eslint/no-use-before-define,no-underscore-dangle,no-plusplus */
import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import {
  DragDropContext, DraggableLocation, Droppable, DroppableProvided, DropResult,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from '../Column';
import { ITodo, ITodos } from '../../types';
import { ColumnsActions, TodosActions } from '../../store/actions';
import { IRootState } from '../../store/reducers/state';

interface TodoMap {
  [key: string]: {
    todos: ITodo[],
    title: string,
    description: string,
  },
}

interface IColumn {
  boardId: string;
}

type ReorderTodoMapArgs = {
  quoteMap: TodoMap,
  source: DraggableLocation,
  destination: DraggableLocation,
};

export const Columns: FC<IColumn> = ({ boardId }) => {
  const dispatch = useDispatch();
  const { columns, todos } = useSelector((state: IRootState) => state);
  const [preparedData, setPreparedData] = useState<TodoMap>({});
  const [orderedId, setOrderedId] = useState<Array<string>>([]);

  useEffect(() => {
    const data = {};
    columns
        ?.filter((column) => column.boardId === boardId)
        ?.sort((a, b) => a.position - b.position)
        ?.forEach((column) => {
          // @ts-ignore
          data[column.id] = {
            title: column.title,
            description: column.description,
            todos: todos.filter((todo) => todo.columnId === column.id),
          };
        });
    setPreparedData(data);
    setOrderedId(Object.keys(data));
  }, [boardId, columns, todos]);

  const onDragEnd = (result: DropResult) => {
    // if (result.combine) {
    //   if (result.type === 'COLUMN') {
    //     const shallow: string[] = [...orderedId];
    //     shallow.splice(result.source.index, 1);
    //     setOrderedId(shallow);
    //     return;
    //   }
    //
    //   // @ts-ignore
    //   const column: ITodos = preparedData[result.source.droppableId];
    //   const withTodoRemoved: ITodos = [...column];
    //   withTodoRemoved.splice(result.source.index, 1);
    //   // @ts-ignore
    //   const _columns: TodoMap = {
    //     ...preparedData,
    //     [result.source.droppableId]: withTodoRemoved,
    //   };
    //   setPreparedData(_columns);
    //   return;
    // }

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
      dispatch(ColumnsActions.updatePosition(
        source.index, destination.index, source.droppableId,
      ));
      const _orderedId: string[] = reorder(
        orderedId,
        source.index,
        destination.index,
      );
      setOrderedId(_orderedId);
      return;
    }
    const data = reorderTodoMap({
      quoteMap: preparedData,
      source,
      destination,
    });
    setPreparedData(data);
  };

  const reorder = (list: any[], startIndex: number, endIndex: number, isTodo = false): any[] => {
    let result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    if (!isTodo) {
      return result;
    }
    result = result.map((todo, index) => ({ ...todo, position: index }));
    console.log('result reorder', result);
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
    //
    const nextTitle: string = quoteMap[destination.droppableId].title;
    const nextDescription: string = quoteMap[destination.droppableId].description;
    const next: ITodo[] = [...quoteMap[destination.droppableId].todos];
    //
    const target: ITodo = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
      dispatch(TodosActions.updatePosition(
        target.id, destination.index, destination.droppableId,
      ));
      const reordered = {
        title: currentTitle,
        description: currentTitle,
        todos: reorder(current, source.index, destination.index, true),
      };
      return {
        ...quoteMap,
        [source.droppableId]: reordered,
      };
    }

    // moving to different list
    dispatch(TodosActions.updateColumn(
      target.id, source.droppableId, destination.droppableId, destination.index,
    ));
    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    return {
      ...quoteMap,
      [source.droppableId]: {
        todos: current.map((todo, index) => ({
          ...todo, position: index,
        })),
        description: currentDescription,
        title: currentTitle,
      },
      [destination.droppableId]: {
        todos: next.map((todo, index) => ({
          ...todo, position: index,
        })),
        description: nextDescription,
        title: nextTitle,
      },
    };
  };

  const memoColumns = useMemo(() => (
    orderedId && orderedId.map((key, index) => (
      <Column
        index={index}
        columnId={key}
        boardId={boardId}
        key={key}
        title={preparedData[key].title}
        todos={preparedData[key].todos}
        description={preparedData[key].description}
      />
    ))
  ), [preparedData, orderedId, boardId]);

  const memoNewColumn = useMemo(() => (
    <Column
      boardId={boardId}
      index={orderedId.length}
      isDraggable={false}
    />
  ), [boardId, orderedId]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={boardId}
          type="COLUMN"
          direction="horizontal"
        >
          {(provided: DroppableProvided) => (
            <div
              className="columns"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              { memoColumns }
              { memoNewColumn }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {
        [...new Array(orderedId.length + 1)].map((el, index) => (
          <div className="column__overlay" style={{ left: 260 + 260 * index }} />
        ))
      }
    </>
  );
};