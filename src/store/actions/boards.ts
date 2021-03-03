import { createAction } from '@reduxjs/toolkit';
import {
  IAddBoard,
  ICreateBoard,
  IDrawBoardBelow,
  IInsertBoard,
  IMoveBoard,
  IRemoveBoard,
  ISetBoards,
  ISetBoardPositions,
  IUpdateBoard,
} from '@type/actions';

export const BoardsActions = {
  effect: {
    fetchAll: createAction('BOARDS-EFFECT/FETCH_ALL'),
    create: createAction<ICreateBoard>('BOARDS-EFFECT/CREATE'),
    update: createAction<IUpdateBoard>('BOARDS-EFFECT/UPDATE'),
    remove: createAction<IRemoveBoard>('BOARDS-EFFECT/REMOVE'),
    move: createAction<IMoveBoard>('BOARDS-EFFECT/MOVE'),
  },
  setAll: createAction<ISetBoards>('BOARDS/SET_ALL'),
  add: createAction<IAddBoard>('BOARDS/ADD'),
  insertInPosition: createAction<IInsertBoard>('BOARDS/INSERT_IN_POSITION'),
  updateEntity: createAction<IUpdateBoard>('BOARDS/UPDATE_ENTITY'),
  // setPositions
  move: createAction<IMoveBoard>('BOARDS/MOVE'),
  setPositions: createAction<ISetBoardPositions>('BOARDS/SET_POSITIONS'),
  remove: createAction<IRemoveBoard>('BOARDS/REMOVE'),
  drawBelow: createAction<IDrawBoardBelow>('BOARDS/DRAW_BELOW'),
  removeTemp: createAction('BOARDS/REMOVE_TEMP'),
};
