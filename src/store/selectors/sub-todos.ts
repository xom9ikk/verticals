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
// export const getCountSubTodosByColumnId = (columnId?: number) => createSelector(
//   [getColumns, getHeadings, getSubTodos],
//   (columns, headings, subTodos) => {
//     const filteredHeadings = headings.entities.filter((heading) => heading.columnId === columnId);
//     const headingIds = filteredHeadings.map((heading) => heading.id);
//     const filteredSubTodos = subTodos.entities.filter((todo) => headingIds.includes(todo.headingId));
//     return filteredSubTodos.length;
//   },
// );
// export const getCountSubTodosByBoardId = (boardId: number | null) => createSelector(
//   [getColumns, getHeadings, getSubTodos],
//   (columns, headings, subTodos) => {
//     const filteredColumns = columns.entities.filter((column) => column.boardId === boardId);
//     const columnIds = filteredColumns.map((column) => column.id);
//     const filteredHeadings = headings.entities.filter((heading) => columnIds.includes(heading.columnId));
//     const headingIds = filteredHeadings.map((heading) => heading.id);
//     const filteredSubTodos = subTodos.entities.filter((todo) => headingIds.includes(todo.headingId));
//     return filteredSubTodos.length;
//   },
// );
