import { IRootState } from '@/store/reducers/state';
import { createSelector } from 'reselect';

export const getComments = (state: IRootState) => state.comments;
export const getCommentsByTodoId = (todoId: number) => createSelector(
  [getComments],
  (comments) => comments.filter((comment) => comment.todoId === todoId),
);
