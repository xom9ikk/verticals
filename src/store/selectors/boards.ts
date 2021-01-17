import { IRootState } from '@/store/state';
import { createSelector } from 'reselect';
import { EnumTodoType } from '@/types/entities';

export const getBoards = (state: IRootState) => state.boards;
export const getBoardCardType = (boardId?: number | null) => createSelector( // TODO: remove null
  [getBoards],
  (boards) => boards.find((board) => board.id === boardId)?.cardType ?? EnumTodoType.Checkboxes,
);
