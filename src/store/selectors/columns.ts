import { IRootState } from '@/store/reducers/state';
import { createSelector } from 'reselect';

export const getColumns = (state: IRootState) => state.columns;
export const getColumnsByBoardId = (boardId: number | null) => createSelector(
  [getColumns],
  (columns) => columns.filter((column) => column.boardId === boardId),
);
