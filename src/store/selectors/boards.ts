import { createSelector } from '@reduxjs/toolkit';

import { NEW_BOARD_ID, TRASH_BOARD_ID } from '@/constants';
import i18n from '@/i18n';
import { IRootState } from '@store/reducers';
import { EnumCardType } from '@type/entities';

export const getBoards = (state: IRootState) => state.boards;
export const getBoardPositions = (state: IRootState) => state.boards.positions;
export const getBoardById = (boardId?: number) => createSelector(
  [getBoards],
  (boards) => {
    const extraBoards = [{
      id: TRASH_BOARD_ID,
      icon: '/assets/svg/board/trash.svg',
      title: i18n.t('Trash'),
    }, {
      id: NEW_BOARD_ID,
      icon: '/assets/svg/board/item.svg',
    }];

    return [
      ...extraBoards,
      ...boards.entities,
    ].find((board) => board.id === boardId);
  },
);
export const getBoardCardType = (boardId?: number) => createSelector(
  [getBoards],
  (boards) => boards.entities.find((board) => board.id === boardId)?.cardType ?? EnumCardType.Checkboxes,
);
