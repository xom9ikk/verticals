import { createAction } from 'redux-actions';
import { ITodos } from '../../types';

enum Type {
  SET_TODOS = 'TODOS/SET_TODOS',
  UPDATE_TITLE = 'TODOS/UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'TODOS/UPDATE_DESCRIPTION',
  ADD = 'TODOS/ADD',
  UPDATE_COLUMN = 'TODOS/UPDATE_COLUMN',
  UPDATE_POSITION = 'TODOS/UPDATE_POSITION',
}

const setTodos = createAction(
  Type.SET_TODOS,
  (payload: ITodos) => (payload),
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
  (columnId: string, title?: string, description?: string, isDone?: boolean) => ({
    columnId, title, description, isDone,
  }),
);

const updateColumn = createAction(
  Type.UPDATE_COLUMN,
  (id: string, sourceColumnId: string, targetColumnId: string, position: number) => ({
    id, sourceColumnId, targetColumnId, position,
  }),
);

const updatePosition = createAction(
  Type.UPDATE_POSITION,
  (id: string, position: number, columnId: string) => ({
    id, position, columnId,
  }),
);

export const TodosActions = {
  Type,
  setTodos,
  updateTitle,
  updateDescription,
  add,
  updateColumn,
  updatePosition,
};
