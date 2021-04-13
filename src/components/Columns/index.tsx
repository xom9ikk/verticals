import React, {
  FC, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NEW_COLUMN_ID, TRASH_BOARD_ID, TRASH_COLUMN_ID } from '@/constants';
import { Column, EnumColumnMode } from '@comp/Column';
import { ColumnsDragDropContainer } from '@comp/Column/DragDropContainer';
import { FallbackLoader } from '@comp/FallbackLoader';
import {
  ColumnsActions, HeadingsActions, SubTodosActions, TodosActions,
} from '@store/actions';
import {
  getActiveBoardId,
  getColumnPositionsByBoardId,
  getEditableColumnId,
  getIsLoadedBoards,
  getIsLoadedColumns,
  getIsSearchMode,
} from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';

export const Columns: FC = () => {
  const dispatch = useDispatch();

  const isSearchMode = useSelector(getIsSearchMode);
  const isLoadedBoards = useSelector(getIsLoadedBoards);
  const isLoadedColumns = useSelector(getIsLoadedColumns);
  const editableColumnId = useSelector(getEditableColumnId);
  const activeBoardId = useSelector(getActiveBoardId);

  const columnPositions = useParamSelector(getColumnPositionsByBoardId, activeBoardId);

  useEffect(() => {
    if (activeBoardId !== null && !isSearchMode) {
      if (activeBoardId !== TRASH_BOARD_ID) {
        dispatch(ColumnsActions.effect.fetchByBoardId({ boardId: activeBoardId }));
        dispatch(HeadingsActions.effect.fetchByBoardId({ boardId: activeBoardId }));
        dispatch(TodosActions.effect.fetchByBoardId({ boardId: activeBoardId }));
        dispatch(SubTodosActions.effect.fetchByBoardId({ boardId: activeBoardId }));
      } else {
        dispatch(TodosActions.effect.fetchRemoved());
      }
    }
  }, [activeBoardId, isSearchMode]);

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
      index={0}
      columnId={TRASH_COLUMN_ID}
      boardId={activeBoardId!}
      isEditable={false}
      mode={EnumColumnMode.Deleted}
    />
  ), [activeBoardId]);

  return (
    <ColumnsDragDropContainer activeBoardId={activeBoardId}>
      {(provided, snapshot) => (
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
                { snapshot.isDraggingOver ? null : memoNewColumn }
              </>
            )
          }
          {provided.placeholder}
        </div>
      )}
    </ColumnsDragDropContainer>
  );
};
