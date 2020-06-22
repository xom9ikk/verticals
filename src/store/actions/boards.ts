import { createAction } from 'redux-actions';
import { IBoards } from '../../types';

enum Type {
  SET_BOARDS = 'BOARDS/SET_BOARDS',
  UPDATE_TITLE = 'BOARDS/UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'BOARDS/UPDATE_DESCRIPTION',
  ADD = 'BOARDS/ADD',
  UPDATE_POSITION = 'BOARDS/UPDATE_POSITION',
  UPDATE_COLOR = 'BOARDS/UPDATE_COLOR',
}

const setBoards = createAction(
  Type.SET_BOARDS,
  (payload: IBoards) => (payload),
);

const updateTitle = createAction(
  Type.UPDATE_TITLE,
  (id: string, title: string) => ({ id, title }),
);

const updateDescription = createAction(
  Type.UPDATE_DESCRIPTION,
  (id: string, description: string) => ({ id, description }),
);

const add = createAction(
  Type.ADD,
  (boardId: string, icon: string, title?: string, description?: string) => ({
    boardId, icon, title, description,
  }),
);

const updatePosition = createAction(
  Type.UPDATE_POSITION,
  (sourcePosition: number, destinationPosition: number) => ({
    sourcePosition, destinationPosition,
  }),
);

const updateColor = createAction(
  Type.UPDATE_COLOR,
  (id: string, color: number) => ({
    id, color,
  }),
);

export const BoardsActions = {
  Type,
  setBoards,
  updateTitle,
  updateDescription,
  add,
  updatePosition,
  updateColor,
};
