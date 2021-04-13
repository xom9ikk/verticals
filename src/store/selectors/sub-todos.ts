import { createSelector } from '@reduxjs/toolkit';

import { IRootState } from '@store/reducers';

export const getSubTodos = (state: IRootState) => state.subTodos;
export const getSubTodosEntities = (state: IRootState) => state.subTodos.entities;
export const getSubTodoPositions = (state: IRootState) => state.subTodos.positions;
export const getSubTodoById = (todoId: number | null) => createSelector(
  [getSubTodosEntities],
  (todoEntities) => todoEntities.find((todo) => todo.id === todoId) || {},
);
export const getSubTodoPositionsByTodoId = (
  todoId?: number,
) => createSelector(
  [getSubTodoPositions],
  (todoPositions) => {
    if (todoId === undefined) return [];
    const positions = todoPositions[todoId];
    if (!positions) return [];
    return positions;
  },
);
