import { createAction } from '@reduxjs/toolkit';
import {
  IAddBoard,
  ICreateBoard,
  IDrawBoardBelow,
  IInsertBoard,
  IRemoveBoard,
  ISetBoards,
  IUpdateBoard,
  // IUpdateBoardTitle,
  // IUpdateBoardCardType,
  // IUpdateBoardColor,
  // IUpdateBoardDescription,
  // IUpdateBoardIcon,
  IUpdateBoardPosition,
} from '@type/actions';

const fetchAll = createAction('BOARDS/FETCH_ALL');
const setAll = createAction<ISetBoards>('BOARDS/SET_ALL');
const create = createAction<ICreateBoard>('BOARDS/CREATE');
const add = createAction<IAddBoard>('BOARDS/ADD');
const insertInPosition = createAction<IInsertBoard>('BOARDS/INSERT_IN_POSITION');
const update = createAction<IUpdateBoard>('BOARDS/UPDATE');
const updateEntity = createAction<IUpdateBoard>('BOARDS/UPDATE_ENTITY');
// const updateTitle = createAction<IUpdateBoardTitle>('BOARDS/UPDATE_TITLE');
// const updateDescription = createAction<IUpdateBoardDescription>('BOARDS/UPDATE_DESCRIPTION');
// const updateColor = createAction<IUpdateBoardColor>('BOARDS/UPDATE_COLOR');
// const updateCardType = createAction<IUpdateBoardCardType>('BOARDS/UPDATE_CARD_TYPE');
// const updateIcon = createAction<IUpdateBoardIcon>('BOARDS/UPDATE_ICON');
const updatePosition = createAction<IUpdateBoardPosition>('BOARDS/UPDATE_POSITION');
const remove = createAction<IRemoveBoard>('BOARDS/REMOVE');
const drawBelow = createAction<IDrawBoardBelow>('BOARDS/DRAW_BELOW');
const removeTemp = createAction('BOARDS/REMOVE_TEMP');

export const BoardsActions = {
  fetchAll,
  setAll,
  create,
  add,
  insertInPosition,
  update,
  updateEntity,
  // updateTitle,
  // updateDescription,
  // updateColor,
  // updateCardType,
  // updateIcon,
  updatePosition,
  remove,
  drawBelow,
  removeTemp,
};
