import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '@store/reducers';
import { EnumTodoType, IBoard } from '@type/entities';

export const getBoards = (state: IRootState) => state.boards;
export const getOrderedBoards = createSelector(
  [getBoards],
  (boards) => {
    const { entities, positions } = boards;
    const orderedBoards: Array<IBoard> = [];
    positions.forEach((boardId) => {
      const boardByOrder = entities.find((board) => board.id === boardId);
      if (boardByOrder) {
        orderedBoards.push(boardByOrder);
      }
    });
    return orderedBoards;
  },
);
export const getBoardCardType = (boardId?: number) => createSelector(
  [getBoards],
  (boards) => boards.entities.find((board) => board.id === boardId)?.cardType ?? EnumTodoType.Checkboxes,
);
