import { createAction } from 'redux-actions';
import {
  IFetchColumnsByBoardId,
  IAddColumn,
  ICreateColumn,
  IDuplicateColumn,
  IRemoveColumn,
  ISetColumns,
  IUpdateColumnColor,
  IUpdateColumnDescription,
  IUpdateColumnIsCollapsed,
  IUpdateColumnPosition,
  IUpdateColumnTitle,
  IDrawColumnBelow,
  IReverseColumnOrder,
} from '@/types/actions';

enum Type {
  FETCH_BY_BOARD_ID = 'COLUMNS/FETCH_BY_BOARD_ID',
  SET_COLUMNS = 'COLUMNS/SET_COLUMNS',
  CREATE = 'COLUMNS/CREATE',
  ADD = 'COLUMNS/ADD',
  INSERT_IN_POSITION = 'COLUMNS/INSERT_IN_POSITION',
  UPDATE_TITLE = 'COLUMNS/UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'COLUMNS/UPDATE_DESCRIPTION',
  UPDATE_POSITION = 'COLUMNS/UPDATE_POSITION',
  UPDATE_COLOR = 'COLUMNS/UPDATE_COLOR',
  UPDATE_IS_COLLAPSED = 'COLUMNS/UPDATE_IS_COLLAPSED',
  REMOVE = 'COLUMNS/REMOVE',
  DUPLICATE = 'COLUMNS/DUPLICATE',
  DRAW_BELOW = 'COLUMNS/DRAW_BELOW',
  REMOVE_TEMP = 'COLUMNS/REMOVE_TEMP',
  REVERSE_ORDER = 'COLUMNS/REVERSE_ORDER',
}

const fetchByBoardId = createAction<IFetchColumnsByBoardId>(Type.FETCH_BY_BOARD_ID);
const setAll = createAction<ISetColumns>(Type.SET_COLUMNS);
const create = createAction<ICreateColumn>(Type.CREATE);
const add = createAction<IAddColumn>(Type.ADD);
const insertInPosition = createAction<IAddColumn>(Type.INSERT_IN_POSITION);
const updateTitle = createAction<IUpdateColumnTitle>(Type.UPDATE_TITLE);
const updateDescription = createAction<IUpdateColumnDescription>(Type.UPDATE_DESCRIPTION);
const updatePosition = createAction<IUpdateColumnPosition>(Type.UPDATE_POSITION);
const updateColor = createAction<IUpdateColumnColor>(Type.UPDATE_COLOR);
const updateIsCollapsed = createAction<IUpdateColumnIsCollapsed>(Type.UPDATE_IS_COLLAPSED);
const remove = createAction<IRemoveColumn>(Type.REMOVE);
const duplicate = createAction<IDuplicateColumn>(Type.DUPLICATE);
const drawBelow = createAction<IDrawColumnBelow>(Type.DRAW_BELOW);
const removeTemp = createAction(Type.REMOVE_TEMP);
const reverseOrder = createAction<IReverseColumnOrder>(Type.REVERSE_ORDER);

export const ColumnsActions = {
  Type,
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
