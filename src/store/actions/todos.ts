/* eslint-disable max-len */
import { createAction } from 'redux-actions';
import {
  IAddTodo,
  IAddTodoBelow,
  IDuplicateTodo,
  IDuplicateTodoForColumn,
  IGenerateNewTodoId,
  IRemoveTodo,
  IResetTodoColor,
  ISetTodos,
  ISwitchTodoNotificationsEnabled,
  IUpdateIsArchive, IUpdateTodoColor,
  IUpdateTodoColumnId,
  IUpdateTodoCompleteStatus,
  IUpdateTodoDescription, IUpdateTodoPosition,
  IUpdateTodoTitle,
} from '@/types';

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
  UPDATE_IS_ARCHIVE = 'TODOS/UPDATE_IS_ARCHIVE',
  SWITCH_NOTIFICATION_ENABLED = 'TODOS/SWITCH_NOTIFICATION_ENABLED',
}

const setTodos = createAction<ISetTodos>(Type.SET_TODOS);
const updateTitle = createAction<IUpdateTodoTitle>(Type.UPDATE_TITLE);
const updateDescription = createAction<IUpdateTodoDescription>(Type.UPDATE_DESCRIPTION);
const updateCompleteStatus = createAction<IUpdateTodoCompleteStatus>(Type.UPDATE_COMPLETE_STATUS);
const add = createAction<IAddTodo>(Type.ADD);
const updateColumn = createAction<IUpdateTodoColumnId>(Type.UPDATE_COLUMN);
const updatePosition = createAction<IUpdateTodoPosition>(Type.UPDATE_POSITION);
const updateColor = createAction<IUpdateTodoColor>(Type.UPDATE_COLOR);
const resetColor = createAction<IResetTodoColor>(Type.RESET_COLOR);
const duplicateForColumn = createAction<IDuplicateTodoForColumn>(Type.DUPLICATE_FOR_COLUMN);
const duplicate = createAction<IDuplicateTodo>(Type.DUPLICATE);
const remove = createAction<IRemoveTodo>(Type.REMOVE);
const addTodoBelow = createAction<IAddTodoBelow>(Type.ADD_TODO_BELOW);
const generateNewId = createAction<IGenerateNewTodoId>(Type.GENERATE_NEW_ID);
const removeNewTodo = createAction(Type.REMOVE_NEW_TODO);
const updateIsArchive = createAction<IUpdateIsArchive>(Type.UPDATE_IS_ARCHIVE);
const switchNotificationsEnabled = createAction<ISwitchTodoNotificationsEnabled>(Type.SWITCH_NOTIFICATION_ENABLED);

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
  updateIsArchive,
  switchNotificationsEnabled,
};
