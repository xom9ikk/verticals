import React, {
  FC, useEffect, useMemo,
} from 'react';
import {
  DragDropContext, Droppable, DroppableProvided, DropResult,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Column, EnumColumnMode } from '@comp/Column';
import { ColumnsActions, HeadingsActions, TodosActions } from '@store/actions';
import { FallbackLoader } from '@comp/FallbackLoader';
import {
  getActiveBoardId,
  getColumnPositionsByBoardId,
  getEditableColumnId,
  getIsLoadedBoards,
  getIsLoadedColumns,
  getIsSearchMode,
} from '@store/selectors';
import { NEW_COLUMN_ID, TRASH_BOARD_ID, TRASH_COLUMN_ID } from '@/constants';
import { useTranslation } from 'react-i18next';
import { useParamSelector } from '@use/paramSelector';

interface IColumns { }

export const Columns: FC<IColumns> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isSearchMode = useSelector(getIsSearchMode);
  const activeBoardId = useSelector(getActiveBoardId);

  const columnPositions = useParamSelector(getColumnPositionsByBoardId, activeBoardId);
  const isLoadedBoards = useSelector(getIsLoadedBoards);
  const isLoadedColumns = useSelector(getIsLoadedColumns);
  const editableColumnId = useSelector(getEditableColumnId);

  useEffect(() => {
    if (activeBoardId !== null && !isSearchMode) {
      const timeout = setTimeout(() => {
        if (activeBoardId !== TRASH_BOARD_ID) {
          dispatch(ColumnsActions.effect.fetchByBoardId({ boardId: activeBoardId }));
          dispatch(HeadingsActions.effect.fetchByBoardId({ boardId: activeBoardId }));
          dispatch(TodosActions.effect.fetchByBoardId({ boardId: activeBoardId }));
        } else {
          dispatch(TodosActions.effect.fetchRemoved());
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
      if (destination.index >= columnPositions.length) {
        return;
      }
      dispatch(ColumnsActions.effect.move({
        sourcePosition: source.index,
        destinationPosition: destination.index,
        boardId: Number(source.droppableId.split('board-')[1]),
      }));
      return;
    }

    // TODO: need?
    // const currentTodos: ITodo[] = todos.filter((todo) => todo.columnId === sourceColumnId);

    // const target: ITodo = currentTodos[source.index];

    // if (!target) {
    //   return;
    // }

    if (type === 'HEADING') {
      const sourceColumnId = Number(source.droppableId.split('column-')[1]);

      // moving to same HEADING list
      const sourcePosition = source.index;
      const destinationPosition = destination.index;
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
      console.log(source, destination);
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
  };

  const memoColumns = useMemo(() => columnPositions
    .map((id, index) => (
      <Column
        key={`column-${id}`}
        index={index}
        isEditable={editableColumnId === id}
        columnId={id}
        boardId={activeBoardId!}
      />
    )), [columnPositions, activeBoardId, editableColumnId]);

  const memoNewColumn = useMemo(() => (
    <Column
      index={columnPositions.length}
      boardId={activeBoardId!}
      columnId={NEW_COLUMN_ID}
      isEditable={editableColumnId === NEW_COLUMN_ID}
      mode={EnumColumnMode.New}
    />
  ), [columnPositions, activeBoardId, editableColumnId]);

  const memoDeletedCardsColumn = useMemo(() => (
    <Column
      columnId={TRASH_COLUMN_ID}
      index={0}
      boardId={activeBoardId!}
      isEditable={false}
      mode={EnumColumnMode.Deleted}
    />
  ), [t, activeBoardId]);

  const memoColumnsContainer = useMemo(() => (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={`board-${activeBoardId}`}
        type="COLUMN"
        direction="horizontal"
      >
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            className="columns"
            {...provided.droppableProps}
          >
            <FallbackLoader
              backgroundColor="#ffffff"
              isAbsolute
              size="medium"
              delay={500}
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
    t, isLoadedBoards, isLoadedColumns, isSearchMode,
    activeBoardId, editableColumnId, columnPositions,
  ]);

  return (
    <>
      {memoColumnsContainer}
    </>
  );
};
