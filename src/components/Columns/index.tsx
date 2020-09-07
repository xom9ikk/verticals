/* eslint-disable @typescript-eslint/no-use-before-define,no-underscore-dangle,no-plusplus */
import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import {
  DragDropContext, DraggableLocation, Droppable, DroppableProvided, DropResult,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from '@comp/Column';
import { ITodo } from '@/types';
import { ColumnsActions, TodosActions } from '@/store/actions';
import { IRootState } from '@/store/reducers/state';
import { useFilterTodos } from '@/use/filterTodos';

interface TodoMap {
  [key: string]: {
    todos: ITodo[],
    title: string,
    description: string,
    color: number,
    isCollapsed: boolean,
    belowId?: number,
  },
}

interface IColumn {
  boardId: number;
}

type ReorderTodoMapArgs = {
  quoteMap: TodoMap,
  source: DraggableLocation,
  destination: DraggableLocation,
};

export const Columns: FC<IColumn> = ({ boardId }) => {
  const dispatch = useDispatch();
  const { filterTodos } = useFilterTodos();
  const { columns, todos, system: { query } } = useSelector((state: IRootState) => state);
  const [preparedData, setPreparedData] = useState<TodoMap>({});
  const [orderedId, setOrderedId] = useState<Array<number>>([]);

  useEffect(() => {
    dispatch(ColumnsActions.fetchByBoardId({ boardId }));
  }, [boardId]);

  useEffect(() => {
    console.log('new columns', columns);
    const data = {};
    columns
        ?.filter((column) => column.boardId === boardId)
        ?.sort((a, b) => a.position - b.position)
        ?.forEach((column) => {
          console.log('prepare column', column);
          // @ts-ignore
          data[`column-${column.id}`] = {
            ...column,
            todos: todos.filter((todo) => todo.columnId === column.id),
          };
        });
    console.log('===columns', columns);
    console.log('===prep', data);
    setPreparedData(data);
    setOrderedId(Object.keys(data).map((key) => Number(key.split('column-')[1])));
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
    console.log('result', result);
    console.log('source.droppableId', source.droppableId);
    console.log('source.index', source.index);
    console.log('destination.index', destination.index);
    if (result.type === 'COLUMN') {
      dispatch(ColumnsActions.updatePosition({
        sourcePosition: source.index,
        destinationPosition: destination.index,
        boardId: Number(source.droppableId.split('board-')[1]),
      }));
      const _orderedId: number[] = reorder(
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
    return result;
  };

  const reorderTodoMap = ({
    quoteMap,
    source,
    destination,
  }: ReorderTodoMapArgs): TodoMap => {
    const current = quoteMap[source.droppableId];
    const currentTodos: ITodo[] = [...quoteMap[source.droppableId].todos];

    const next = quoteMap[destination.droppableId];
    const nextTodos: ITodo[] = [...quoteMap[destination.droppableId].todos];

    const target: ITodo = currentTodos[source.index];
    if (!target) {
      return quoteMap;
    }
    // moving to same list
    if (source.droppableId === destination.droppableId) {
      dispatch(TodosActions.updatePosition({
        id: target.id,
        position: destination.index,
        columnId: destination.droppableId,
      }));
      const reordered = {
        ...current,
        todos: reorder(currentTodos, source.index, destination.index, true),
      };
      return {
        ...quoteMap,
        [source.droppableId]: reordered,
      };
    }

    // moving to different list
    dispatch(TodosActions.updateColumn({
      id: target.id,
      sourceColumnId: source.droppableId,
      targetColumnId: destination.droppableId,
      position: destination.index,
    }));
    // remove from original
    currentTodos.splice(source.index, 1);
    // insert into next
    nextTodos.splice(destination.index, 0, target);

    return {
      ...quoteMap,
      [source.droppableId]: {
        ...current,
        todos: currentTodos.map((todo, index) => ({
          ...todo, position: index,
        })),
      },
      [destination.droppableId]: {
        ...next,
        todos: nextTodos.map((todo, index) => ({
          ...todo, position: index,
        })),
      },
    };
  };

  const memoColumns = useMemo(() => (
    orderedId && orderedId.map((_key, index) => {
      const key = `column-${_key}`;
      console.log('preparedData', preparedData);
      console.log('key', key);
      let isContainTodosByQuery = true;
      if (query) {
        isContainTodosByQuery = preparedData[key].todos.filter(filterTodos).length > 0;
      }
      if (!isContainTodosByQuery) {
        return null;
      }
      console.log('draw prepared', key, preparedData);
      return (
        <Column
          index={index}
          color={preparedData[key].color}
          isCollapsed={preparedData[key].isCollapsed}
          columnId={_key}
          boardId={boardId}
          belowId={preparedData[key]?.belowId}
          key={key}
          title={preparedData[key].title}
          todos={preparedData[key].todos}
          description={preparedData[key].description}
        />
      );
    })
  ), [preparedData, orderedId, boardId, query]);

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
          droppableId={`board-${boardId}`}
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
    </>
  );
};
