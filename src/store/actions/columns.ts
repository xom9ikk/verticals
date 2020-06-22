import { createAction } from 'redux-actions';
import { IColumns } from '../../types';

enum Type {
  SET_COLUMNS = 'COLUMNS/SET_COLUMNS',
  UPDATE_TITLE = 'COLUMNS/UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'COLUMNS/UPDATE_DESCRIPTION',
  ADD = 'COLUMNS/ADD',
  UPDATE_POSITION = 'COLUMNS/UPDATE_POSITION',
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

export const ColumnsActions = {
  Type,
  setColumns,
  updateTitle,
  updateDescription,
  add,
  updatePosition,
};
