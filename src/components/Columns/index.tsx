import React, {
  FC, useEffect, useMemo, useRef,
} from 'react';
import {
  DragDropContext, Droppable, DroppableProvided, DropResult,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from '@comp/Column';
import { ITodo } from '@/types/entities';
import { ColumnsActions, TodosActions } from '@/store/actions';
import { FallbackLoader } from '@comp/FallbackLoader';
import { useAutoScroll } from '@/use/autoScroll';
import {
  getQuery,
  getTodos,
  getColumns,
  getActiveBoardId,
  getIsLoadedBoards,
  getIsLoadedColumns,
} from '@/store/selectors';
import { TRASH_BOARD_ID } from '@/constants';

interface IColumns { }

export const Columns: FC<IColumns> = () => {
  const dispatch = useDispatch();
  const columnsRef = useRef<any>();

  const query = useSelector(getQuery);
  const todos = useSelector(getTodos);
  const columns = useSelector(getColumns);
  const activeBoardId = useSelector(getActiveBoardId);
  const isLoadedBoards = useSelector(getIsLoadedBoards);
  const isLoadedColumns = useSelector(getIsLoadedColumns);

  const { scrollToRight } = useAutoScroll(columnsRef);

  useEffect(() => {
    if (activeBoardId !== null) {
      const timeout = setTimeout(() => {
        if (activeBoardId !== TRASH_BOARD_ID) {
          dispatch(ColumnsActions.fetchByBoardId({ boardId: activeBoardId }));
        }
        dispatch(TodosActions.fetchByBoardId({ boardId: activeBoardId }));
      }, 100);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [activeBoardId]);

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
      dispatch(ColumnsActions.updatePosition({
        sourcePosition: source.index,
        destinationPosition: destination.index,
        boardId: Number(source.droppableId.split('board-')[1]),
      }));
      return;
    }

    const sourceColumnId = Number(source.droppableId.split('column-')[1]);
    const currentTodos: ITodo[] = todos.filter((todo) => todo.columnId === sourceColumnId);

    const target: ITodo = currentTodos[source.index];

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
    }

    // moving to different list
    dispatch(TodosActions.updatePosition({
      columnId: sourceColumnId,
      targetColumnId,
      sourcePosition,
      destinationPosition,
    }));
  };

  const memoColumns = useMemo(() => {
    console.log('memoColumns');
    return columns.map((column, index) => {
      const key = `column-${column.id}`;
      return (
        <Column
          key={key}
          index={index}
          color={column.color}
          isCollapsed={column.isCollapsed}
          columnId={column.id}
          boardId={activeBoardId}
          belowId={column.belowId}
          title={column.title}
          description={column.description}
        />
      );
    });
  }, [columns, activeBoardId, query]);

  const memoNewColumn = useMemo(() => (
    <Column
      boardId={activeBoardId}
      index={columns.length}
      isNew
      scrollToRight={scrollToRight}
    />
  ), [activeBoardId, columns]);

  const memoDeletedCardsColumn = useMemo(() => (
    <Column
      index={0}
      boardId={activeBoardId}
      key="column-deleted"
      title="Deleted cards"
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
    activeBoardId, columns, todos, query]);

  return (
    <>
      {memoColumnsContainer}
    </>
  );
};
