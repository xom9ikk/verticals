import React, {
  FC, useEffect, useMemo, useRef,
} from 'react';
import {
  DragDropContext, Droppable, DroppableProvided, DropResult,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Column, EnumColumnMode } from '@comp/Column';
import { ColumnsActions, TodosActions } from '@store/actions';
import { FallbackLoader } from '@comp/FallbackLoader';
import { useAutoScroll } from '@use/autoScroll';
import {
  getActiveBoardId, getEditableColumnId,
  getIsLoadedBoards,
  getIsLoadedColumns,
  getIsSearchMode,
  getOrderedColumnsByBoardId,
} from '@store/selectors';
import { NEW_COLUMN_ID, TRASH_BOARD_ID } from '@/constants';
import { useTranslation } from 'react-i18next';

interface IColumns { }

export const Columns: FC<IColumns> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const columnsRef = useRef<any>();

  const isSearchMode = useSelector(getIsSearchMode);
  // const todos = useSelector(getTodosEntities);
  const activeBoardId = useSelector(getActiveBoardId);
  const columns = useSelector(getOrderedColumnsByBoardId(activeBoardId));
  const isLoadedBoards = useSelector(getIsLoadedBoards);
  const isLoadedColumns = useSelector(getIsLoadedColumns);
  const editableColumnId = useSelector(getEditableColumnId);

  const { scrollToRight } = useAutoScroll(columnsRef);

  useEffect(() => {
    if (activeBoardId !== null && !isSearchMode) {
      const timeout = setTimeout(() => {
        if (activeBoardId !== TRASH_BOARD_ID) {
          dispatch(ColumnsActions.fetchByBoardId({ boardId: activeBoardId }));
          dispatch(TodosActions.fetchByBoardId({ boardId: activeBoardId }));
        } else {
          dispatch(TodosActions.fetchRemoved());
        }
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
      if (destination.index >= columns.length) {
        return;
      }
      dispatch(ColumnsActions.updatePosition({
        sourcePosition: source.index,
        destinationPosition: destination.index,
        boardId: Number(source.droppableId.split('board-')[1]),
      }));
      return;
    }

    const sourceColumnId = Number(source.droppableId.split('column-')[1]);

    // TODO: need?
    // const currentTodos: ITodo[] = todos.filter((todo) => todo.columnId === sourceColumnId);

    // const target: ITodo = currentTodos[source.index];

    // if (!target) {
    //   return;
    // }

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

  const memoColumns = useMemo(() => columns
    .map((column, index) => (
      <Column
        key={`column-${column.id}`}
        index={index}
        color={column.color}
        isCollapsed={column.isCollapsed}
        isEditable={editableColumnId === column.id}
        columnId={column.id}
        boardId={activeBoardId!}
        belowId={column.belowId}
        title={column.title}
        description={column.description}
      />
    )), [columns, activeBoardId, editableColumnId]);

  const memoNewColumn = useMemo(() => (
    <Column
      index={columns.length}
      boardId={activeBoardId!}
      columnId={NEW_COLUMN_ID}
      isEditable={editableColumnId === NEW_COLUMN_ID}
      mode={EnumColumnMode.New}
      scrollToRight={scrollToRight}
    />
  ), [columns, activeBoardId, editableColumnId]);

  const memoDeletedCardsColumn = useMemo(() => (
    <Column
      index={0}
      boardId={activeBoardId!}
      isEditable={false}
      mode={EnumColumnMode.Deleted}
      title={t('Deleted cards')}
      description={t('Restore deleted cards')}
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
            ref={(r) => {
              columnsRef.current = r;
              provided.innerRef(r);
            }}
            className="columns"
            {...provided.droppableProps}
          >
            <FallbackLoader
              backgroundColor="#ffffff"
              isAbsolute
              size="medium"
              delay={1000}
              minimumZIndex={2}
              isLoading={!isLoadedBoards || !isLoadedColumns}
            />
            {
              activeBoardId === TRASH_BOARD_ID ? memoDeletedCardsColumn : (
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
  ), [
    isLoadedBoards, isLoadedColumns, isSearchMode,
    activeBoardId, editableColumnId, columns,
  ]);

  return (
    <>
      {memoColumnsContainer}
    </>
  );
};
