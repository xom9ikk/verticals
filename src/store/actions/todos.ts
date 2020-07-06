import { createAction } from 'redux-actions';
import { EnumTodoStatus, ITodos } from '../../types';

enum Type {
  SET_TODOS = 'TODOS/SET_TODOS',
  UPDATE_TITLE = 'TODOS/UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'TODOS/UPDATE_DESCRIPTION',
  UPDATE_COMPLETE_STATUS = 'TODOS/UPDATE_COMPLETE_STATUS',
  ADD = 'TODOS/ADD',
  UPDATE_COLUMN = 'TODOS/UPDATE_COLUMN',
  UPDATE_POSITION = 'TODOS/UPDATE_POSITION',
  UPDATE_COLOR = 'TODOS/UPDATE_COLOR',
  RESET_COLOR = 'TODOS/RESET_COLOR',
  DUPLICATE_FOR_COLUMN = 'TODOS/DUPLICATE_FOR_COLUMN',
  DUPLICATE = 'TODOS/DUPLICATE',
  REMOVE = 'TODOS/REMOVE',
  ADD_TODO_BELOW = 'TODOS/ADD_TODO_BELOW',
  GENERATE_NEW_ID = 'TODOS/GENERATE_NEW_ID',
  REMOVE_NEW_TODO = 'TODOS/REMOVE_NEW_TODO',
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

const updateCompleteStatus = createAction(
  Type.UPDATE_COMPLETE_STATUS,
  (id: string, status: EnumTodoStatus) => ({ id, status }),
);

const add = createAction(
  Type.ADD,
  (columnId: string, title?: string, description?: string, status?: EnumTodoStatus) => ({
    columnId, title, description, status,
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

const duplicateForColumn = createAction(
  Type.DUPLICATE_FOR_COLUMN,
  (columnId: string, newColumnId: string) => ({
    columnId,
    newColumnId,
  }),
);

const duplicate = createAction(
  Type.DUPLICATE,
  (id: string) => ({
    id,
  }),
);

const remove = createAction(
  Type.REMOVE,
  (id: string) => ({
    id,
  }),
);

const addTodoBelow = createAction(
  Type.ADD_TODO_BELOW,
  (id: string) => ({
    id,
  }),
);

const generateNewId = createAction(
  Type.GENERATE_NEW_ID,
  (id: string) => ({
    id,
  }),
);

const removeNewTodo = createAction(
  Type.REMOVE_NEW_TODO,
  () => ({

  }),
);

export const TodosActions = {
  Type,
  setTodos,
  updateTitle,
  updateDescription,
  updateCompleteStatus,
  add,
  updateColumn,
  updatePosition,
  updateColor,
  resetColor,
  duplicateForColumn,
  duplicate,
  remove,
  addTodoBelow,
  generateNewId,
  removeNewTodo,
};
