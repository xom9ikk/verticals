/* eslint-disable @typescript-eslint/no-use-before-define,no-underscore-dangle,no-plusplus */
import React, {
  FC, useEffect, useMemo, useRef,
} from 'react';
import {
  DragDropContext, DraggableLocation, Droppable, DroppableProvided, DropResult,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from '@comp/Column';
import { ITodo } from '@/types/entities';
import { ColumnsActions, TodosActions } from '@/store/actions';
import { useFilterTodos } from '@/use/filterTodos';
import { FallbackLoader } from '@comp/FallbackLoader';
import { useAutoScroll } from '@/use/autoScroll';
import {
  getColumnsMap,
  getTodos,
  getActiveBoardId,
  getIsLoadedBoards,
  getIsLoadedColumns,
  getQuery,
} from '@/store/selectors';

interface IColumns { }

type ReorderColumnsMapArgs = {
  // columnsMap: ColumnsMap,
  source: DraggableLocation,
  destination: DraggableLocation,
};

export const Columns: FC<IColumns> = () => {
  const dispatch = useDispatch();
  const columnsRef = useRef<any>();
  const { filterTodos } = useFilterTodos();
  const { columnsMap, orderedId } = useSelector(getColumnsMap);
  const todos = useSelector(getTodos);
  const query = useSelector(getQuery);
  const activeBoardId = useSelector(getActiveBoardId);
  const isLoadedBoards = useSelector(getIsLoadedBoards);
  const isLoadedColumns = useSelector(getIsLoadedColumns);
  // const [columnsMap, setPreparedData] = useState<ColumnsMap>({});
  // const [orderedId, setOrderedId] = useState<Array<number>>(_orderedId);

  const { scrollToRight } = useAutoScroll(columnsRef);

  useEffect(() => {
    if (activeBoardId !== null) {
      const timeout = setTimeout(() => {
        dispatch(ColumnsActions.fetchByBoardId({ boardId: activeBoardId }));
        dispatch(TodosActions.fetchByBoardId({ boardId: activeBoardId }));
      }, 100);
      return () => {
        clearInterval(timeout);
      };
    }
  }, [activeBoardId]);

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
    //   const column: ITodos = columnsMap[result.source.droppableId];
    //   const withTodoRemoved: ITodos = [...column];
    //   withTodoRemoved.splice(result.source.index, 1);
    //   // @ts-ignore
    //   const _columns: ColumnsMap = {
    //     ...columnsMap,
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
      // const __orderedId: number[] = reorder(
      //   orderedId,
      //   source.index,
      //   destination.index,
      // );
      // setOrderedId(__orderedId);
      return;
    }
    // const data = reorderColumnsMap({
    reorderColumnsMap({
      // columnsMap,
      source,
      destination,
    });
    // setPreparedData(data);
  };

  // const reorder = (list: any[], startIndex: number, endIndex: number, isTodo = false): any[] => {
  //   let result = Array.from(list);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);
  //   if (!isTodo) {
  //     return result;
  //   }
  //   result = result.map((todo, index) => ({ ...todo, position: index }));
  //   return result;
  // };

  const reorderColumnsMap = ({
    // eslint-disable-next-line no-shadow
    // columnsMap,
    source,
    destination,
  }: ReorderColumnsMapArgs): void => {
    // const current = columnsMap[source.droppableId];
    // const currentTodos: ITodo[] = [...columnsMap[source.droppableId].todos];

    const sourceColumnId = Number(source.droppableId.split('column-')[1]);
    const currentTodos: ITodo[] = todos.filter((todo) => todo.columnId === sourceColumnId);

    const target: ITodo = currentTodos[source.index];

    console.log('sourceColumnId', sourceColumnId);
    console.log('currentTodos', currentTodos);

    console.log('source.index', source.index);
    console.log('target', target);

    if (!target) {
      return;
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
      return;
      // const reordered = {
      //   ...current,
      //   todos: reorder(currentTodos, sourcePosition, destinationPosition, true),
      // };
      // return {
      //   ...columnsMap,
      //   [source.droppableId]: reordered,
      // };
    }

    // moving to different list
    dispatch(TodosActions.updatePosition({
      columnId: sourceColumnId,
      targetColumnId,
      sourcePosition,
      destinationPosition,
    }));

    // // TODO delete this code
    // // remove from original
    // currentTodos.splice(source.index, 1);
    // // insert into next
    // nextTodos.splice(destination.index, 0, target);
    //
    // return {
    //   ...columnsMap,
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
    console.log('memoColumns', orderedId);
    return (
      orderedId.length !== 0 && orderedId.map((_key, index) => {
        const key = `column-${_key}`;
        if (query) {
          const isContainTodosByQuery = columnsMap[key].todos.filter(filterTodos).length > 0;
          if (!isContainTodosByQuery) {
            return null;
          }
        }
        return (
          <Column
            key={key}
            index={index}
            color={columnsMap[key].color}
            isCollapsed={columnsMap[key].isCollapsed}
            columnId={_key}
            boardId={activeBoardId}
            belowId={columnsMap[key].belowId}
            title={columnsMap[key].title}
            todos={columnsMap[key].todos} // TODO: useSelector in column
            description={columnsMap[key].description}
          />
        );
      })
    );
  }, [columnsMap, activeBoardId, query]);

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
          // todos={columnsMap[key].todos}
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
                // || Object.keys(columnsMap).length === 0
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
  ), [isLoadedBoards, isLoadedColumns,
    activeBoardId, orderedId,
    columnsMap, query]);

  return (
    <>
      {memoColumnsContainer}
    </>
  );
};
