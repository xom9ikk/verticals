import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '@store/reducers';

export const getComments = (state: IRootState) => state.comments;
export const getCommentsByTodoId = (todoId: number | null) => createSelector(
  [getComments],
  (comments) => comments.filter((comment) => comment.todoId === todoId),
);

export const getCommentById = (commentId: number | null) => createSelector(
  [getComments],
  (comments) => comments.find((comment) => comment.id === commentId),
);
