import { createAction } from '@reduxjs/toolkit';
import {
  IFetchCommentsByTodoId,
  ISetComments,
  ICreateComment,
  IAddComment,
  IRemoveComment,
  IRemoveCommentFile,
  IAddCommentLike,
  IRemoveCommentLike,
  IUpdateCommentLike,
  IUpdateCommentText,
} from '@type/actions';

const fetchByTodoId = createAction<IFetchCommentsByTodoId>('COMMENTS/FETCH_BY_TODO_ID');
const setAll = createAction<ISetComments>('COMMENTS/SET_ALL');
const create = createAction<ICreateComment>('COMMENTS/CREATE');
const add = createAction<IAddComment>('COMMENTS/ADD');
const remove = createAction<IRemoveComment>('COMMENTS/REMOVE');
const addLike = createAction<IAddCommentLike>('COMMENTS/ADD_LIKE');
const removeLike = createAction<IRemoveCommentLike>('COMMENTS/REMOVE_LIKE');
const updateLike = createAction<IUpdateCommentLike>('COMMENTS/UPDATE_LIKE');
const updateText = createAction<IUpdateCommentText>('COMMENTS/UPDATE_TEXT');
const removeFile = createAction<IRemoveCommentFile>('COMMENTS/REMOVE_FILE');

export const CommentsActions = {
  fetchByTodoId,
  setAll,
  create,
  add,
  remove,
  addLike,
  removeLike,
  updateLike,
  updateText,
  removeFile,
};
