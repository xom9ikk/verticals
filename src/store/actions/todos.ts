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
  IMoveTodo,
  ISetTodoPositionsByColumnId,
} from '@type/actions';

export const TodosActions = {
  effect: {
    fetchByBoardId: createAction<IFetchTodosByBoardId>('TODOS-EFFECT/FETCH_BY_BOARD_ID'),
    fetchRemoved: createAction('TODOS-EFFECT/FETCH_REMOVED'),
    create: createAction<ICreateTodo>('TODOS-EFFECT/CREATE'),
    update: createAction<IUpdateTodo>('TODOS-EFFECT/UPDATE'),
    remove: createAction<IRemoveTodo>('TODOS-EFFECT/REMOVE'),
    move: createAction<IMoveTodo>('TODOS-EFFECT/MOVE'),
    duplicate: createAction<IDuplicateTodo>('TODOS-EFFECT/DUPLICATE'),
  },
  setAll: createAction<ISetTodos>('TODOS/SET_ALL'),
  add: createAction<IAddTodo>('TODOS/ADD'),
  insertInPosition: createAction<IInsertTodo>('TODOS/INSERT_IN_POSITION'),
  updateEntity: createAction<IUpdateTodo>('TODOS/UPDATE'),
  move: createAction<IMoveTodo>('TODOS/MOVE'),
  setPositionsByColumnId: createAction<ISetTodoPositionsByColumnId>('TODOS/SET_POSITIONS_BY_COLUMN_ID'),
  remove: createAction<IRemoveTodo>('TODOS/REMOVE'),
  drawBelow: createAction<IDrawTodoBelow>('TODOS/DRAW_BELOW'),
  removeTemp: createAction('TODOS/REMOVE_TEMP'),
};
