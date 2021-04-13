import { createSelector } from '@reduxjs/toolkit';

import { IRootState } from '@store/reducers';
import { getColumns } from '@store/selectors/columns';
import { getHeadings } from '@store/selectors/headings';

export const getTodos = (state: IRootState) => state.todos;
export const getTodosEntities = (state: IRootState) => state.todos.entities;
export const getTodoPositions = (state: IRootState) => state.todos.positions;
export const getTodoById = (todoId: number | null) => createSelector(
  [getTodosEntities],
  (todoEntities) => todoEntities.find((todo) => todo.id === todoId) || {},
);
export const getTodoPositionsByHeadingId = (
  headingId?: number,
) => createSelector(
  [getTodoPositions],
  (todoPositions) => {
    if (headingId === undefined) return [];
    const positions = todoPositions[headingId];
    if (!positions) return [];
    return positions;
  },
);
export const getArchivedTodoPositionsByColumnId = (columnId?: number) => createSelector(
  [getHeadings, getTodoPositions, getTodosEntities],
  (headings, positions, todoEntities) => {
    const filteredHeadings = headings.entities.filter((heading) => heading.columnId === columnId);
    const headingIds = filteredHeadings.map((heading) => heading.id);
    return todoEntities.filter((todo) => headingIds.includes(todo.headingId));
  },
);
export const getCountTodosByColumnId = (columnId?: number) => createSelector(
  [getColumns, getHeadings, getTodos],
  (columns, headings, todos) => {
    const filteredHeadings = headings.entities.filter((heading) => heading.columnId === columnId);
    const headingIds = filteredHeadings.map((heading) => heading.id);
    const filteredTodos = todos.entities.filter((todo) => headingIds.includes(todo.headingId));
    return filteredTodos.length;
  },
);
export const getCountTodosByBoardId = (boardId: number | null) => createSelector(
  [getColumns, getHeadings, getTodos],
  (columns, headings, todos) => {
    const filteredColumns = columns.entities.filter((column) => column.boardId === boardId);
    const columnIds = filteredColumns.map((column) => column.id);
    const filteredHeadings = headings.entities.filter((heading) => columnIds.includes(heading.columnId));
    const headingIds = filteredHeadings.map((heading) => heading.id);
    const filteredTodos = todos.entities.filter((todo) => headingIds.includes(todo.headingId));
    return filteredTodos.length;
  },
);
