import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '@store/reducers';
import { getColumns } from '@store/selectors/columns';

export const getTodos = (state: IRootState) => state.todos;
export const getTodosByColumnId = (columnId?: number) => createSelector(
  [getTodos],
  (todos) => todos.filter((todo) => todo.columnId === columnId),
);
export const getTodoById = (todoId: number | null) => createSelector(
  [getTodos],
  (todos) => todos.find((todo) => todo.id === todoId),
);
export const getCountTodosByBoardId = (boardId: number | null) => createSelector(
  [getColumns, getTodos],
  (columns, todos) => {
    const filteredColumns = columns.entities.filter((column) => column.boardId === boardId);
    const columnIds = filteredColumns.map((column) => column.id);
    const filteredTodos = todos.filter((todo) => columnIds.includes(todo.columnId));
    return filteredTodos.length;
  },
);
