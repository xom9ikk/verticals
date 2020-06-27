import { createAction } from 'redux-actions';
import { EnumTodoType, IBoards } from '../../types';

enum Type {
  SET_BOARDS = 'BOARDS/SET_BOARDS',
  UPDATE_TITLE = 'BOARDS/UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'BOARDS/UPDATE_DESCRIPTION',
  ADD = 'BOARDS/ADD',
  UPDATE_POSITION = 'BOARDS/UPDATE_POSITION',
  UPDATE_COLOR = 'BOARDS/UPDATE_COLOR',
  RESET_COLOR = 'BOARDS/RESET_COLOR',
  UPDATE_CARD_TYPE = 'BOARDS/UPDATE_CARD_TYPE',
  REMOVE_BOARD = 'BOARDS/REMOVE_BOARD',
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

const resetColor = createAction(
  Type.RESET_COLOR,
  (id: string) => ({
    id,
  }),
);

const updateCardType = createAction(
  Type.UPDATE_CARD_TYPE,
  (id: string, cardType: EnumTodoType) => ({
    id, cardType,
  }),
);

const removeBoard = createAction(
  Type.REMOVE_BOARD,
  (id: string) => ({
    id,
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
  resetColor,
  updateCardType,
  removeBoard,
};
