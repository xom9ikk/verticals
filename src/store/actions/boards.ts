import { createAction } from 'redux-actions';
import { IBoards } from '../../types';

enum Type {
  SET_BOARDS = 'BOARDS/SET_BOARDS',
}

const setBoards = createAction(
  Type.SET_BOARDS,
  (payload: IBoards) => (payload),
);

export const BoardsActions = {
  Type,
  setBoards,
};
