import { createAction } from '@reduxjs/toolkit';
import {
  IAddTodo,
  ICreateTodo,
  IDrawTodoBelow,
  IDuplicateTodo,
  IFetchTodosByBoardId,
  IInsertTodo,
  IRemoveTodo,
  ISetTodos,
  IUpdateTodo,
  IUpdateTodoPosition,
} from '@type/actions';

const fetchByBoardId = createAction<IFetchTodosByBoardId>('TODOS/FETCH_BY_BOARD_ID');
const fetchRemoved = createAction('TODOS/FETCH_REMOVED');
const setAll = createAction<ISetTodos>('TODOS/SET_ALL');
const create = createAction<ICreateTodo>('TODOS/CREATE');
const add = createAction<IAddTodo>('TODOS/ADD');
const insertInPosition = createAction<IInsertTodo>('TODOS/INSERT_IN_POSITION');
const update = createAction<IUpdateTodo>('TODOS/UPDATE');
const updatePosition = createAction<IUpdateTodoPosition>('TODOS/UPDATE_POSITION');
const remove = createAction<IRemoveTodo>('TODOS/REMOVE');
const removeEntity = createAction<IRemoveTodo>('TODOS/REMOVE_ENTITY');
const duplicate = createAction<IDuplicateTodo>('TODOS/DUPLICATE');
const drawBelow = createAction<IDrawTodoBelow>('TODOS/DRAW_BELOW');
const removeTemp = createAction('TODOS/REMOVE_TEMP');

export const TodosActions = {
  fetchByBoardId,
  fetchRemoved,
  setAll,
  create,
  add,
  insertInPosition,
  update,
  updatePosition,
  remove,
  removeEntity,
  duplicate,
  drawBelow,
  removeTemp,
};
