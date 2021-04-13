import { createAction } from '@reduxjs/toolkit';
import {
  IAddComment,
  IAddCommentLike,
  ICreateComment,
  IFetchCommentsBySubTodoId,
  IFetchCommentsByTodoId,
  IRemoveComment,
  IRemoveCommentLike,
  ISetComments,
  IUpdateCommentLike, IUpdateCommentText,
} from '@type/actions';

export const CommentsActions = {
  effect: {
    fetchByTodoId: createAction<IFetchCommentsByTodoId>('COMMENTS-EFFECT/FETCH_BY_TODO_ID'),
    fetchBySubTodoId: createAction<IFetchCommentsBySubTodoId>('COMMENTS-EFFECT/FETCH_BY_SUB_TODO_ID'),
    create: createAction<ICreateComment>('COMMENTS-EFFECT/CREATE'),
    remove: createAction<IRemoveComment>('COMMENTS-EFFECT/REMOVE'),
    addLike: createAction<IAddCommentLike>('COMMENTS-EFFECT/ADD_LIKE'),
    removeLike: createAction<IRemoveCommentLike>('COMMENTS-EFFECT/REMOVE_LIKE'),
    updateText: createAction<IUpdateCommentText>('COMMENTS-EFFECT/UPDATE_TEXT'),
  },
  setAll: createAction<ISetComments>('COMMENTS/SET_ALL'),
  add: createAction<IAddComment>('COMMENTS/ADD'),
  remove: createAction<IRemoveComment>('COMMENTS/REMOVE'),
  updateLike: createAction<IUpdateCommentLike>('COMMENTS/UPDATE_LIKE'),
  updateText: createAction<IUpdateCommentText>('COMMENTS/UPDATE_TEXT'),
};
