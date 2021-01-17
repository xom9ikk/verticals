import { IRootState } from '@/store/state';
import { createSelector } from 'reselect';

export const getComments = (state: IRootState) => state.comments;
export const getCommentsByTodoId = (todoId: number | null) => createSelector(
  [getComments],
  (comments) => comments.filter((comment) => comment.todoId === todoId),
);

export const getCommentById = (commentId: number | null) => createSelector(
  [getComments],
  (comments) => comments.find((comment) => comment.id === commentId),
);
