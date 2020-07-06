import { createAction } from 'redux-actions';
import { IColumns } from '../../types';

enum Type {
  SET_COLUMNS = 'COLUMNS/SET_COLUMNS',
  UPDATE_TITLE = 'COLUMNS/UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'COLUMNS/UPDATE_DESCRIPTION',
  ADD = 'COLUMNS/ADD',
  UPDATE_POSITION = 'COLUMNS/UPDATE_POSITION',
  UPDATE_COLOR = 'COLUMNS/UPDATE_COLOR',
  RESET_COLOR = 'COLUMNS/RESET_COLOR',
  UPDATE_IS_MINIMIZE = 'COLUMNS/UPDATE_IS_MINIMIZE',
  REMOVE = 'COLUMNS/REMOVE',
  DUPLICATE = 'COLUMNS/DUPLICATE',
  ADD_COLUMN_AFTER = 'COLUMNS/ADD_COLUMN_AFTER',
  GENERATE_NEW_ID = 'COLUMNS/GENERATE_NEW_ID',
  REMOVE_NEW_COLUMNS = 'COLUMNS/REMOVE_NEW_COLUMNS',
}

const setColumns = createAction(
  Type.SET_COLUMNS,
  (payload: IColumns) => (payload),
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
  (boardId: string, title?: string, description?: string) => ({
    boardId, title, description,
  }),
);

const updatePosition = createAction(
  Type.UPDATE_POSITION,
  (sourcePosition: number, destinationPosition: number, boardId: string) => ({
    sourcePosition, destinationPosition, boardId,
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

const updateIsMinimize = createAction(
  Type.UPDATE_IS_MINIMIZE,
  (id: string, isMinimize: boolean) => ({
    id, isMinimize,
  }),
);

const remove = createAction(
  Type.REMOVE,
  (id: string) => ({
    id,
  }),
);

const duplicate = createAction(
  Type.DUPLICATE,
  (id: string, newId: string) => ({
    id, newId,
  }),
);

const addColumnAfter = createAction(
  Type.ADD_COLUMN_AFTER,
  (id: string, boardId: string) => ({
    id, boardId,
  }),
);

const generateNewId = createAction(
  Type.GENERATE_NEW_ID,
  (id: string) => ({
    id,
  }),
);

const removeNewColumns = createAction(
  Type.REMOVE_NEW_COLUMNS,
  () => ({

  }),
);

export const ColumnsActions = {
  Type,
  setColumns,
  updateTitle,
  updateDescription,
  add,
  updatePosition,
  updateColor,
  resetColor,
  updateIsMinimize,
  remove,
  duplicate,
  addColumnAfter,
  generateNewId,
  removeNewColumns,
};
