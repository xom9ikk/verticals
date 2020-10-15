import { createAction } from 'redux-actions';
import {
  IAddBoard,
  ICreateBoard,
  IDrawBoardBelow,
  IRemoveBoard,
  ISetBoards,
  IUpdateBoardCardType,
  IUpdateBoardIcon,
  IUpdateBoardColor,
  IUpdateBoardDescription,
  IUpdateBoardPosition,
  IUpdateBoardTitle,
} from '@/types/actions';

enum Type {
  FETCH_ALL = 'BOARDS/FETCH_BOARDS',
  SET_ALL = 'BOARDS/SET_ALL',
  CREATE = 'BOARDS/CREATE',
  ADD = 'BOARDS/ADD',
  INSERT_IN_POSITION = 'BOARDS/INSERT_IN_POSITION',
  UPDATE_TITLE = 'BOARDS/UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'BOARDS/UPDATE_DESCRIPTION',
  UPDATE_POSITION = 'BOARDS/UPDATE_POSITION',
  UPDATE_COLOR = 'BOARDS/UPDATE_COLOR',
  RESET_COLOR = 'BOARDS/RESET_COLOR', // TODO: delete
  UPDATE_CARD_TYPE = 'BOARDS/UPDATE_CARD_TYPE',
  UPDATE_ICON = 'BOARDS/UPDATE_ICON',
  REMOVE = 'BOARDS/REMOVE',
  DRAW_BELOW = 'BOARDS/DRAW_BELOW',
  REMOVE_TEMP = 'BOARDS/REMOVE_TEMP',
}

const fetchAll = createAction(Type.FETCH_ALL);
const setAll = createAction<ISetBoards>(Type.SET_ALL);
const create = createAction<ICreateBoard>(Type.CREATE);
const add = createAction<IAddBoard>(Type.ADD);
const insertInPosition = createAction<IAddBoard>(Type.INSERT_IN_POSITION);
const updateTitle = createAction<IUpdateBoardTitle>(Type.UPDATE_TITLE);
const updateDescription = createAction<IUpdateBoardDescription>(Type.UPDATE_DESCRIPTION);
const updatePosition = createAction<IUpdateBoardPosition>(Type.UPDATE_POSITION);
const updateColor = createAction<IUpdateBoardColor>(Type.UPDATE_COLOR);
const updateCardType = createAction<IUpdateBoardCardType>(Type.UPDATE_CARD_TYPE);
const updateIcon = createAction<IUpdateBoardIcon>(Type.UPDATE_ICON);
const remove = createAction<IRemoveBoard>(Type.REMOVE);
const drawBelow = createAction<IDrawBoardBelow>(Type.DRAW_BELOW);
const removeTemp = createAction(Type.REMOVE_TEMP);

export const BoardsActions = {
  Type,
  fetchAll,
  setAll,
  create,
  add,
  insertInPosition,
  updateTitle,
  updateDescription,
  updatePosition,
  updateColor,
  updateCardType,
  updateIcon,
  remove,
  drawBelow,
  removeTemp,
};
