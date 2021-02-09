import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '@store/reducers';
import { IColumn } from '@type/entities';

export const getColumns = (state: IRootState) => state.columns;
export const getOrderedColumnsByBoardId = (boardId: number | null) => createSelector(
  [getColumns],
  (columns) => {
    if (boardId === null) return [];

    const { entities, positions } = columns;
    const positionsForBoard = positions[boardId];
    if (!positionsForBoard) return [];

    const orderedColumns: Array<IColumn> = [];

    positionsForBoard.forEach((columnId) => {
      const columnByOrder = entities.find((column) => column.id === columnId);
      if (columnByOrder) {
        orderedColumns.push(columnByOrder);
      }
    });

    return orderedColumns;
  },
);
