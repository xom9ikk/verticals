import { createAction } from '@reduxjs/toolkit';
import {
  IAddColumn,
  ICreateColumn,
  IDrawColumnBelow,
  IDuplicateColumn,
  IFetchColumnsByBoardId,
  IInsertColumn,
  IMoveColumn,
  IRemoveColumn,
  IReverseColumnOrder,
  ISetColumns,
  ISetColumnPositionsByBoardId,
  IUpdateColumn,
} from '@type/actions';

export const ColumnsActions = {
  effect: {
    fetchByBoardId: createAction<IFetchColumnsByBoardId>('COLUMNS-EFFECT/FETCH_BY_BOARD_ID'),
    create: createAction<ICreateColumn>('COLUMNS-EFFECT/CREATE'),
    update: createAction<IUpdateColumn>('COLUMNS-EFFECT/UPDATE'),
    remove: createAction<IRemoveColumn>('COLUMNS-EFFECT/REMOVE'),
    move: createAction<IMoveColumn>('COLUMNS-EFFECT/MOVE'),
    duplicate: createAction<IDuplicateColumn>('COLUMNS-EFFECT/DUPLICATE'),
    reverseOrder: createAction<IReverseColumnOrder>('COLUMNS-EFFECT/REVERSE_ORDER'),
  },
  setAll: createAction<ISetColumns>('COLUMNS/SET_ALL'),
  add: createAction<IAddColumn>('COLUMNS/ADD'),
  insertInPosition: createAction<IInsertColumn>('COLUMNS/INSERT_IN_POSITION'),
  updateEntity: createAction<IUpdateColumn>('COLUMNS/UPDATE_ENTITY'),
  // setPositions
  move: createAction<IMoveColumn>('COLUMNS/MOVE'),
  setPositionsByBoardId: createAction<ISetColumnPositionsByBoardId>('COLUMNS/SET_POSITIONS_BY_BOARD_ID'),
  remove: createAction<IRemoveColumn>('COLUMNS/REMOVE'),
  drawBelow: createAction<IDrawColumnBelow>('COLUMNS/DRAW_BELOW'),
  removeTemp: createAction('COLUMNS/REMOVE_TEMP'),
  reverseOrder: createAction<IReverseColumnOrder>('COLUMNS/REVERSE_ORDER'),
};
