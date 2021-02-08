import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '@/store/reducers';

export const getColumns = (state: IRootState) => state.columns;
export const getColumnsByBoardId = (boardId: number | null) => createSelector(
  [getColumns],
  (columns) => columns.filter((column) => column.boardId === boardId),
);
