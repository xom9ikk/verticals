import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '@store/reducers';
import { getColumns } from '@store/selectors/columns';

export const getTodos = (state: IRootState) => state.todos;
export const getTodosEntities = (state: IRootState) => state.todos.entities;
export const getTodoById = (todoId: number | null) => createSelector(
  [getTodos],
  (todos) => todos.entities.find((todo) => todo.id === todoId) || {},
);
export const getTodoPositionsByColumnId = (
  columnId?: number,
) => (state: IRootState) => {
  if (columnId === undefined) return [];
  const positions = state.todos.positions[columnId];
  if (!positions) return [];
  return positions;
};
export const getNonArchivedTodoPositionsByColumnId = (columnId?: number) => createSelector(
  [getTodoPositionsByColumnId(columnId), getTodosEntities],
  (positions, todoEntities) => positions.filter((id) => {
    const todo = todoEntities.find((t) => t.id === id);
    return !todo?.isArchived;
  }),
);
export const getArchivedTodoPositionsByColumnId = (columnId?: number) => createSelector(
  [getTodoPositionsByColumnId(columnId), getTodosEntities],
  (positions, todoEntities) => positions.filter((id) => {
    const todo = todoEntities.find((t) => t.id === id);
    return todo?.isArchived;
  }),
);
export const getCountTodosByBoardId = (boardId: number | null) => createSelector(
  [getColumns, getTodos],
  (columns, todos) => {
    const filteredColumns = columns.entities.filter((column) => column.boardId === boardId);
    const columnIds = filteredColumns.map((column) => column.id);
    const filteredTodos = todos.entities.filter((todo) => columnIds.includes(todo.columnId));
    return filteredTodos.length;
  },
);
