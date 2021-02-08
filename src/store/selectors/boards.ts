import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '@store/reducers';
import { EnumTodoType } from '@type/entities';

export const getBoards = (state: IRootState) => state.boards;
export const getBoardCardType = (boardId?: number | null) => createSelector( // TODO: remove null
  [getBoards],
  (boards) => boards.find((board) => board.id === boardId)?.cardType ?? EnumTodoType.Checkboxes,
);
