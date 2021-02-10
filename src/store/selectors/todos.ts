import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '@store/reducers';
import { ITodo } from '@type/entities';
import { getColumns } from '@store/selectors/columns';

export const getTodos = (state: IRootState) => state.todos;
export const getTodosEntities = (state: IRootState) => state.todos.entities;
export const getTodoById = (todoId: number | null) => createSelector(
  [getTodos],
  (todos) => todos.entities.find((todo) => todo.id === todoId),
);
export const getOrderedTodosByColumnId = (columnId?: number) => createSelector(
  [getTodos],

  (todos) => {
    if (!columnId) return [];

    const { entities, positions } = todos;
    const positionsForBoard = positions[columnId];
    if (!positionsForBoard) return [];

    const orderedColumns: Array<ITodo> = [];

    positionsForBoard.forEach((todoId) => {
      const todoByOrder = entities.find((todo) => todo.id === todoId);
      if (todoByOrder) {
        orderedColumns.push(todoByOrder);
      }
    });

    return orderedColumns;
  },
);
export const getOrderedArchivedTodosByColumnId = (columnId?: number) => createSelector(
  [getOrderedTodosByColumnId(columnId)],
  (todos) => todos?.filter((todo: ITodo) => todo.isArchived),
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
