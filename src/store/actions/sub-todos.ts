import { createAction } from '@reduxjs/toolkit';

import {
  IAddSubTodo,
  ICreateSubTodo,
  IDrawSubTodoBelow,
  IDrawSubTodoOnTop,
  IDuplicateSubTodo,
  IFetchSubTodosByBoardId,
  IInsertSubTodo,
  IMoveSubTodo,
  IRemoveSubTodo,
  ISetSubTodoPositionsByTodoId,
  ISetSubTodos,
  IUpdateSubTodo,
} from '@type/actions';

export const SubTodosActions = {
  effect: {
    fetchByBoardId: createAction<IFetchSubTodosByBoardId>('SUB_TODOS-EFFECT/FETCH_BY_BOARD_ID'),
    create: createAction<ICreateSubTodo>('SUB_TODOS-EFFECT/CREATE'),
    update: createAction<IUpdateSubTodo>('SUB_TODOS-EFFECT/UPDATE'),
    remove: createAction<IRemoveSubTodo>('SUB_TODOS-EFFECT/REMOVE'),
    move: createAction<IMoveSubTodo>('SUB_TODOS-EFFECT/MOVE'),
    duplicate: createAction<IDuplicateSubTodo>('SUB_TODOS-EFFECT/DUPLICATE'),
  },
  setAll: createAction<ISetSubTodos>('SUB_TODOS/SET_ALL'),
  add: createAction<IAddSubTodo>('SUB_TODOS/ADD'),
  insertInPosition: createAction<IInsertSubTodo>('SUB_TODOS/INSERT_IN_POSITION'),
  updateEntity: createAction<IUpdateSubTodo>('SUB_TODOS/UPDATE_ENTITY'),
  move: createAction<IMoveSubTodo>('SUB_TODOS/MOVE'),
  setPositionsByTodoId: createAction<ISetSubTodoPositionsByTodoId>('SUB_TODOS/SET_POSITIONS_BY_TODO_ID'),
  remove: createAction<IRemoveSubTodo>('SUB_TODOS/REMOVE'),
  drawBelow: createAction<IDrawSubTodoBelow>('SUB_TODOS/DRAW_BELOW'),
  drawOnTop: createAction<IDrawSubTodoOnTop>('SUB_TODOS/DRAW_ON_TOP'),
  removeTemp: createAction('SUB_TODOS/REMOVE_TEMP'),
};
