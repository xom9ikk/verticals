import { createAction } from 'redux-actions';
import {
  IAddColumn,
  IAddColumnAfter,
  IDuplicateColumn,
  IGenerateNewColumnId,
  IRemoveColumn,
  IResetColumnColor,
  ISetColumns,
  IUpdateColumnColor,
  IUpdateColumnDescription, IUpdateColumnIsCollapsed,
  IUpdateColumnPosition,
  IUpdateColumnTitle,
} from '@/types/actions';

enum Type {
  SET_COLUMNS = 'COLUMNS/SET_COLUMNS',
  ADD = 'COLUMNS/ADD',
  UPDATE_TITLE = 'COLUMNS/UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'COLUMNS/UPDATE_DESCRIPTION',
  UPDATE_POSITION = 'COLUMNS/UPDATE_POSITION',
  UPDATE_COLOR = 'COLUMNS/UPDATE_COLOR',
  RESET_COLOR = 'COLUMNS/RESET_COLOR',
  UPDATE_IS_COLLAPSED = 'COLUMNS/UPDATE_IS_COLLAPSED',
  REMOVE = 'COLUMNS/REMOVE',
  DUPLICATE = 'COLUMNS/DUPLICATE',
  ADD_COLUMN_AFTER = 'COLUMNS/ADD_COLUMN_AFTER',
  GENERATE_NEW_ID = 'COLUMNS/GENERATE_NEW_ID',
  REMOVE_NEW_COLUMNS = 'COLUMNS/REMOVE_NEW_COLUMNS',
}

const setColumns = createAction<ISetColumns>(Type.SET_COLUMNS);
const add = createAction<IAddColumn>(Type.ADD);
const updateTitle = createAction<IUpdateColumnTitle>(Type.UPDATE_TITLE);
const updateDescription = createAction<IUpdateColumnDescription>(Type.UPDATE_DESCRIPTION);
const updatePosition = createAction<IUpdateColumnPosition>(Type.UPDATE_POSITION);
const updateColor = createAction<IUpdateColumnColor>(Type.UPDATE_COLOR);
const resetColor = createAction<IResetColumnColor>(Type.RESET_COLOR);
const updateIsCollapsed = createAction<IUpdateColumnIsCollapsed>(Type.UPDATE_IS_COLLAPSED);
const remove = createAction<IRemoveColumn>(Type.REMOVE);
const duplicate = createAction<IDuplicateColumn>(Type.DUPLICATE);
const addColumnAfter = createAction<IAddColumnAfter>(Type.ADD_COLUMN_AFTER);
const generateNewId = createAction<IGenerateNewColumnId>(Type.GENERATE_NEW_ID);
const removeNewColumns = createAction(Type.REMOVE_NEW_COLUMNS);

export const ColumnsActions = {
  Type,
  setColumns,
  updateTitle,
  updateDescription,
  add,
  updatePosition,
  updateColor,
  resetColor,
  updateIsCollapsed,
  remove,
  duplicate,
  addColumnAfter,
  generateNewId,
  removeNewColumns,
};
