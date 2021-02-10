import { createAction } from '@reduxjs/toolkit';
import {
  IAddColumn,
  ICreateColumn,
  IDrawColumnBelow,
  IDuplicateColumn,
  IFetchColumnsByBoardId,
  IInsertColumn,
  IRemoveColumn,
  IReverseColumnOrder,
  ISetColumns,
  IUpdateColumnColor,
  IUpdateColumnDescription,
  IUpdateColumnIsCollapsed,
  IUpdateColumnPosition,
  IUpdateColumnTitle,
} from '@type/actions';

const fetchByBoardId = createAction<IFetchColumnsByBoardId>('COLUMNS/FETCH_BY_BOARD_ID');
const setAll = createAction<ISetColumns>('COLUMNS/SET_ALL');
const create = createAction<ICreateColumn>('COLUMNS/CREATE');
const add = createAction<IAddColumn>('COLUMNS/ADD');
const insertInPosition = createAction<IInsertColumn>('COLUMNS/INSERT_IN_POSITION');
const updateTitle = createAction<IUpdateColumnTitle>('COLUMNS/UPDATE_TITLE');
const updateDescription = createAction<IUpdateColumnDescription>('COLUMNS/UPDATE_DESCRIPTION');
const updatePosition = createAction<IUpdateColumnPosition>('COLUMNS/UPDATE_POSITION');
const updateColor = createAction<IUpdateColumnColor>('COLUMNS/UPDATE_COLOR');
const updateIsCollapsed = createAction<IUpdateColumnIsCollapsed>('COLUMNS/UPDATE_IS_COLLAPSED');
const remove = createAction<IRemoveColumn>('COLUMNS/REMOVE');
const duplicate = createAction<IDuplicateColumn>('COLUMNS/DUPLICATE');
const drawBelow = createAction<IDrawColumnBelow>('COLUMNS/DRAW_BELOW');
const removeTemp = createAction('COLUMNS/REMOVE_TEMP');
const reverseOrder = createAction<IReverseColumnOrder>('COLUMNS/REVERSE_ORDER');

export const ColumnsActions = {
  fetchByBoardId,
  setAll,
  create,
  add,
  insertInPosition,
  updateTitle,
  updateDescription,
  updatePosition,
  updateColor,
  updateIsCollapsed,
  remove,
  duplicate,
  drawBelow,
  removeTemp,
  reverseOrder,
};
