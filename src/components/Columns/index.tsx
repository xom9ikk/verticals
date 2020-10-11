/* eslint-disable @typescript-eslint/no-use-before-define,no-underscore-dangle,no-plusplus */
import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  DragDropContext, DraggableLocation, Droppable, DroppableProvided, DropResult,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from '@comp/Column';
import { EnumColors, ITodo } from '@/types/entities';
import { ColumnsActions, TodosActions } from '@/store/actions';
import { IRootState } from '@/store/reducers/state';
import { useFilterTodos } from '@/use/filterTodos';
import { FallbackLoader } from '@comp/FallbackLoader';
import { useAutoScroll } from '@/use/autoScroll';

interface TodoMap {
  [key: string]: {
    todos: ITodo[],
    title: string,
    description: string,
    color: EnumColors,
    isCollapsed: boolean,
    belowId?: number,
  },
}

interface IColumns {
  // boardId?: number;
}

type ReorderTodoMapArgs = {
  todoMap: TodoMap,
  source: DraggableLocation,
  destination: DraggableLocation,
};

export const Columns: FC<IColumns> = () => {
  const dispatch = useDispatch();
  const columnsRef = useRef<any>();
  const { filterTodos } = useFilterTodos();
  const columns = useSelector((state: IRootState) => state.columns);
  const todos = useSelector((state: IRootState) => state.todos);
  const query = useSelector((state: IRootState) => state.system.query);
  const activeBoardId = useSelector((state: IRootState) => state.system.activeBoardId);
  const isLoadedBoards = useSelector((state: IRootState) => state.system.isLoadedBoards);
  const isLoadedColumns = useSelector((state: IRootState) => state.system.isLoadedColumns);
  const [preparedData, setPreparedData] = useState<TodoMap>({});
  const [orderedId, setOrderedId] = useState<Array<number>>([]);

  const { scrollToRight } = useAutoScroll(columnsRef);

  useEffect(() => {
    if (activeBoardId !== null) {
      console.log('1) set is loaded columns');
      const timeout = setTimeout(() => {
        dispatch(ColumnsActions.fetchByBoardId({ boardId: activeBoardId }));
        dispatch(TodosActions.fetchByBoardId({ boardId: activeBoardId }));
      }, 100);
      return () => {
        clearInterval(timeout);
      };
    }
  }, [activeBoardId]);

  // TODO: optimize this
  useEffect(() => {
    console.time('create map');
    const data = {};
    const _orderedId: Array<number> = [];
    columns
        ?.filter((column) => column.boardId === activeBoardId)
        ?.sort((a, b) => a.position - b.position)
        ?.forEach((column) => {
          // @ts-ignore
          data[`column-${column.id}`] = {
            ...column,
            todos: todos.filter((todo) => todo.columnId === column.id),
          };
          _orderedId.push(column.id);
        });
    // console.log('===prep', data);
    setPreparedData(data);
    setOrderedId(_orderedId);
    // setOrderedId(Object.keys(data).map((key) => Number(key.split('column-')[1])));
    console.timeEnd('create map');
  }, [activeBoardId, columns, todos]);

  // useEffect(() => {
  //   scrollToRight();
  // }, [preparedData]);

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
      todoMap: preparedData,
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
    todoMap,
    source,
    destination,
  }: ReorderTodoMapArgs): TodoMap => {
    // const current = todoMap[source.droppableId];
    const currentTodos: ITodo[] = [...todoMap[source.droppableId].todos];

    const target: ITodo = currentTodos[source.index];
    if (!target) {
      return todoMap;
    }
    // moving to same list
    const sourcePosition = source.index;
    const destinationPosition = destination.index;
    const targetColumnId = Number(destination.droppableId.split('column-')[1]);

    if (source.droppableId === destination.droppableId) {
      dispatch(TodosActions.updatePosition({
        sourcePosition,
        destinationPosition,
        columnId: targetColumnId,
      }));
      return todoMap;
      // const reordered = {
      //   ...current,
      //   todos: reorder(currentTodos, sourcePosition, destinationPosition, true),
      // };
      // return {
      //   ...todoMap,
      //   [source.droppableId]: reordered,
      // };
    }

    // moving to different list
    const sourceColumnId = Number(source.droppableId.split('column-')[1]);
    dispatch(TodosActions.updatePosition({
      columnId: sourceColumnId,
      targetColumnId,
      sourcePosition,
      destinationPosition,
    }));

    return todoMap;

    // // TODO delete this code
    // // remove from original
    // currentTodos.splice(source.index, 1);
    // // insert into next
    // nextTodos.splice(destination.index, 0, target);
    //
    // return {
    //   ...todoMap,
    //   [source.droppableId]: {
    //     ...current,
    //     todos: currentTodos.map((todo, index) => ({
    //       ...todo, position: index,
    //     })),
    //   },
    //   [destination.droppableId]: {
    //     ...next,
    //     todos: nextTodos.map((todo, index) => ({
    //       ...todo, position: index,
    //     })),
    //   },
    // };
  };

  const memoColumns = useMemo(() => {
    console.log('memoColumns');
    return (
      orderedId.length !== 0 && orderedId.map((_key, index) => {
        const key = `column-${_key}`;
        if (query) {
          const isContainTodosByQuery = preparedData[key].todos.filter(filterTodos).length > 0;
          if (!isContainTodosByQuery) {
            return null;
          }
        }
        return (
          <Column
            key={key}
            index={index}
            color={preparedData[key].color}
            isCollapsed={preparedData[key].isCollapsed}
            columnId={_key}
            boardId={activeBoardId}
            belowId={preparedData[key]?.belowId}
            title={preparedData[key].title}
            todos={preparedData[key].todos} // TODO: useSelector in column
            description={preparedData[key].description}
          />
        );
      })
    );
  }, [preparedData, activeBoardId, query]);

  const memoNewColumn = useMemo(() => (
    <Column
      boardId={activeBoardId}
      index={orderedId.length}
      isNew
      scrollToRight={scrollToRight}
    />
  ), [activeBoardId, orderedId]);

  const memoDeletedCardsColumn = useMemo(() => (
    <Column
      index={0}
      boardId={activeBoardId}
      key="column-deleted"
      title="Deleted cards"
          // todos={preparedData[key].todos}
      description="Restore deleted cards"
      isDeleted
    />
  ), [activeBoardId]);

  const memoColumnsContainer = useMemo(() => (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={`board-${activeBoardId}`}
        type="COLUMN"
        direction="horizontal"
      >
        {(provided: DroppableProvided) => (
          <div
            className="columns"
            ref={(r) => {
              columnsRef.current = r;
              provided.innerRef(r);
            }}
            {...provided.droppableProps}
          >
            <FallbackLoader
              backgroundColor="#ffffff"
              isAbsolute
              size="medium"
              delay={1000}
              minimumZIndex={2}
              isLoading={
                      !isLoadedBoards
                      || !isLoadedColumns
                      // || Object.keys(preparedData).length === 0
                    }
            />
            {
              activeBoardId === -1 ? memoDeletedCardsColumn : (
                <>
                  { memoColumns }
                  { memoNewColumn }
                </>
              )
             }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ), [isLoadedBoards, isLoadedColumns, activeBoardId, orderedId, preparedData, query]);

  return (
    <>
      {memoColumnsContainer}
    </>
  );
};
