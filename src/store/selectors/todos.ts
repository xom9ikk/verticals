import { IRootState } from '@/store/reducers/state';
import { createSelector } from 'reselect';

export const getTodos = (state: IRootState) => state.todos;
export const getTodosByColumnId = (columnId?: number) => createSelector(
  [getTodos],
  (todos) => todos.filter((todo) => todo.columnId === columnId),
);
