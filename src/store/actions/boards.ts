import { createAction } from 'redux-actions';
import {
  IAddBoard,
  IAddBoardBelow, IGenerateNewBoardId,
  IRemoveBoard,
  IResetBoardColor,
  ISetBoards,
  IUpdateBoardCardType,
  IUpdateBoardColor,
  IUpdateBoardDescription,
  IUpdateBoardPosition,
  IUpdateBoardTitle,
} from '../../types';

enum Type {
  SET_BOARDS = 'BOARDS/SET_BOARDS',
  ADD = 'BOARDS/ADD',
  UPDATE_TITLE = 'BOARDS/UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'BOARDS/UPDATE_DESCRIPTION',
  UPDATE_POSITION = 'BOARDS/UPDATE_POSITION',
  UPDATE_COLOR = 'BOARDS/UPDATE_COLOR',
  RESET_COLOR = 'BOARDS/RESET_COLOR',
  UPDATE_CARD_TYPE = 'BOARDS/UPDATE_CARD_TYPE',
  REMOVE = 'BOARDS/REMOVE',
  ADD_BOARD_BELOW = 'BOARDS/ADD_BOARD_BELOW',
  GENERATE_NEW_ID = 'BOARDS/GENERATE_NEW_ID',
  REMOVE_NEW_BOARDS = 'BOARDS/REMOVE_NEW_BOARDS',
}

const setBoards = createAction<ISetBoards>(Type.SET_BOARDS);
const add = createAction<IAddBoard>(Type.ADD);
const updateTitle = createAction<IUpdateBoardTitle>(Type.UPDATE_TITLE);
const updateDescription = createAction<IUpdateBoardDescription>(Type.UPDATE_DESCRIPTION);
const updatePosition = createAction<IUpdateBoardPosition>(Type.UPDATE_POSITION);
const updateColor = createAction<IUpdateBoardColor>(Type.UPDATE_COLOR);
const resetColor = createAction<IResetBoardColor>(Type.RESET_COLOR);
const updateCardType = createAction<IUpdateBoardCardType>(Type.UPDATE_CARD_TYPE);
const remove = createAction<IRemoveBoard>(Type.REMOVE);
const addBoardBelow = createAction<IAddBoardBelow>(Type.ADD_BOARD_BELOW);
const generateNewId = createAction<IGenerateNewBoardId>(Type.GENERATE_NEW_ID);
const removeNewBoards = createAction(Type.REMOVE_NEW_BOARDS);

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
  remove,
  addBoardBelow,
  generateNewId,
  removeNewBoards,
};
