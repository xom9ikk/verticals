/* eslint-disable max-len */
import { createAction } from 'redux-actions';
import {
  IAddTodo,
  ICreateTodo,
  IDrawTodoBelow,
  IDuplicateTodo,
  IFetchTodosByBoardId,
  IRemoveTodo,
  ISetTodos,
  IUpdateTodoNotificationsEnabled,
  IUpdateIsArchive,
  IUpdateTodoColor,
  IUpdateTodoCompleteStatus,
  IUpdateTodoDescription,
  IUpdateTodoPosition,
  IUpdateTodoTitle,
} from '@/types/actions';

enum Type {
  FETCH_BY_BOARD_ID = 'TODOS/FETCH_BY_BOARD_ID',
  SET_TODOS = 'TODOS/SET_TODOS',
  CREATE = 'TODOS/CREATE',
  ADD = 'TODOS/ADD',
  INSERT_IN_POSITION = 'TODOS/INSERT_IN_POSITION',
  UPDATE_TITLE = 'TODOS/UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'TODOS/UPDATE_DESCRIPTION',
  UPDATE_COMPLETE_STATUS = 'TODOS/UPDATE_COMPLETE_STATUS',
  UPDATE_POSITION = 'TODOS/UPDATE_POSITION',
  UPDATE_COLOR = 'TODOS/UPDATE_COLOR',
  UPDATE_IS_ARCHIVE = 'TODOS/UPDATE_IS_ARCHIVE',
  REMOVE = 'TODOS/REMOVE',
  DUPLICATE = 'TODOS/DUPLICATE',
  DRAW_BELOW = 'TODOS/DRAW_BELOW',
  REMOVE_TEMP = 'TODOS/REMOVE_TEMP',
  UPDATE_NOTIFICATION_ENABLED = 'TODOS/UPDATE_NOTIFICATION_ENABLED',
}

const fetchByBoardId = createAction<IFetchTodosByBoardId>(Type.FETCH_BY_BOARD_ID);
const setAll = createAction<ISetTodos>(Type.SET_TODOS);
const create = createAction<ICreateTodo>(Type.CREATE);
const add = createAction<IAddTodo>(Type.ADD);
const insertInPosition = createAction<IAddTodo>(Type.INSERT_IN_POSITION);
const updateTitle = createAction<IUpdateTodoTitle>(Type.UPDATE_TITLE);
const updateDescription = createAction<IUpdateTodoDescription>(Type.UPDATE_DESCRIPTION);
const updateCompleteStatus = createAction<IUpdateTodoCompleteStatus>(Type.UPDATE_COMPLETE_STATUS);
const updatePosition = createAction<IUpdateTodoPosition>(Type.UPDATE_POSITION);
const updateColor = createAction<IUpdateTodoColor>(Type.UPDATE_COLOR);
const updateIsArchive = createAction<IUpdateIsArchive>(Type.UPDATE_IS_ARCHIVE);
const updateNotificationEnabled = createAction<IUpdateTodoNotificationsEnabled>(Type.UPDATE_NOTIFICATION_ENABLED);
const remove = createAction<IRemoveTodo>(Type.REMOVE);
const duplicate = createAction<IDuplicateTodo>(Type.DUPLICATE);
const drawBelow = createAction<IDrawTodoBelow>(Type.DRAW_BELOW);
const removeTemp = createAction(Type.REMOVE_TEMP);

export const TodosActions = {
  Type,
  fetchByBoardId,
  setAll,
  create,
  add,
  insertInPosition,
  updateTitle,
  updateDescription,
  updateCompleteStatus,
  updatePosition,
  updateColor,
  updateIsArchive,
  remove,
  duplicate,
  drawBelow,
  removeTemp,
  updateNotificationEnabled,
};
