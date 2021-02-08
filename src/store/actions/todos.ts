import { createAction } from '@reduxjs/toolkit';
import {
  IAddTodo,
  ICreateTodo,
  IDrawTodoBelow,
  IDuplicateTodo,
  IFetchTodosByBoardId,
  IRemoveTodo,
  ISetTodos,
  IUpdateTodoNotificationsEnabled,
  IUpdateTodoIsArchive,
  IUpdateTodoColor,
  IUpdateTodoCompleteStatus,
  IUpdateTodoDescription,
  IUpdateTodoPosition,
  IUpdateTodoTitle,
} from '@type/actions';

const fetchByBoardId = createAction<IFetchTodosByBoardId>('TODOS/FETCH_BY_BOARD_ID');
const setAll = createAction<ISetTodos>('TODOS/SET_ALL');
const create = createAction<ICreateTodo>('TODOS/CREATE');
const add = createAction<IAddTodo>('TODOS/ADD');
const insertInPosition = createAction<IAddTodo>('TODOS/INSERT_IN_POSITION');
const updateTitle = createAction<IUpdateTodoTitle>('TODOS/UPDATE_TITLE');
const updateDescription = createAction<IUpdateTodoDescription>('TODOS/UPDATE_DESCRIPTION');
const updateCompleteStatus = createAction<IUpdateTodoCompleteStatus>('TODOS/UPDATE_COMPLETE_STATUS');
const updatePosition = createAction<IUpdateTodoPosition>('TODOS/UPDATE_POSITION');
const updateColor = createAction<IUpdateTodoColor>('TODOS/UPDATE_COLOR');
const updateIsArchive = createAction<IUpdateTodoIsArchive>('TODOS/UPDATE_IS_ARCHIVE');
const updateNotificationEnabled = createAction<IUpdateTodoNotificationsEnabled>('TODOS/UPDATE_NOTIFICATION_ENABLED');
const remove = createAction<IRemoveTodo>('TODOS/REMOVE');
const duplicate = createAction<IDuplicateTodo>('TODOS/DUPLICATE');
const drawBelow = createAction<IDrawTodoBelow>('TODOS/DRAW_BELOW');
const removeTemp = createAction('TODOS/REMOVE_TEMP');

export const TodosActions = {
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
  updateNotificationEnabled,
  remove,
  duplicate,
  drawBelow,
  removeTemp,
};
