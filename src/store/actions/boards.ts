import { createAction } from 'redux-actions';
import {
  IAddBoard,
  ICreateBoard,
  IDrawBoardBelow,
  IRemoveBoard,
  ISetBoards,
  IUpdateBoardCardType,
  IUpdateBoardColor,
  IUpdateBoardDescription,
  IUpdateBoardPosition,
  IUpdateBoardTitle,
} from '@/types';

enum Type {
  FETCH_BOARDS = 'BOARDS/FETCH_BOARDS',
  SET_BOARDS = 'BOARDS/SET_BOARDS',
  CREATE = 'BOARDS/CREATE',
  ADD = 'BOARDS/ADD',
  ADD_BELOW = 'BOARDS/ADD_BELOW',
  UPDATE_TITLE = 'BOARDS/UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'BOARDS/UPDATE_DESCRIPTION',
  UPDATE_POSITION = 'BOARDS/UPDATE_POSITION',
  UPDATE_COLOR = 'BOARDS/UPDATE_COLOR',
  RESET_COLOR = 'BOARDS/RESET_COLOR',
  UPDATE_CARD_TYPE = 'BOARDS/UPDATE_CARD_TYPE',
  REMOVE = 'BOARDS/REMOVE',
  DRAW_BOARD_BELOW = 'BOARDS/DRAW_BOARD_BELOW',
  REMOVE_NEW_BOARDS = 'BOARDS/REMOVE_NEW_BOARDS',
}

const fetchBoards = createAction(Type.FETCH_BOARDS);
const setBoards = createAction<ISetBoards>(Type.SET_BOARDS);
const create = createAction<ICreateBoard>(Type.CREATE);
const add = createAction<IAddBoard>(Type.ADD);
const addBelow = createAction<IAddBoard>(Type.ADD_BELOW);
const updateTitle = createAction<IUpdateBoardTitle>(Type.UPDATE_TITLE);
const updateDescription = createAction<IUpdateBoardDescription>(Type.UPDATE_DESCRIPTION);
const updatePosition = createAction<IUpdateBoardPosition>(Type.UPDATE_POSITION);
const updateColor = createAction<IUpdateBoardColor>(Type.UPDATE_COLOR);
const updateCardType = createAction<IUpdateBoardCardType>(Type.UPDATE_CARD_TYPE);
const remove = createAction<IRemoveBoard>(Type.REMOVE);
const drawBoardBelow = createAction<IDrawBoardBelow>(Type.DRAW_BOARD_BELOW);
const removeNewBoards = createAction(Type.REMOVE_NEW_BOARDS);

export const BoardsActions = {
  Type,
  fetchBoards,
  setBoards,
  updateTitle,
  updateDescription,
  create,
  add,
  addBelow,
  updatePosition,
  updateColor,
  updateCardType,
  remove,
  drawBoardBelow,
  removeNewBoards,
};
