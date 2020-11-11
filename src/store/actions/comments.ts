import { createAction } from 'redux-actions';
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
} from '@/types/actions';

enum Type {
  FETCH_BY_TODO_ID = 'COMMENTS/FETCH_BY_TODO_ID',
  SET_ALL = 'COMMENTS/SET_ALL',
  CREATE = 'COMMENTS/CREATE',
  ADD = 'COMMENTS/ADD',
  REMOVE = 'COMMENTS/REMOVE',
  ADD_LIKE = 'COMMENTS/ADD_LIKE',
  REMOVE_LIKE = 'COMMENTS/REMOVE_LIKE',
  UPDATE_LIKE = 'COMMENTS/UPDATE_LIKE',
  UPDATE_TEXT = 'COMMENTS/UPDATE_TEXT',
  REMOVE_FILE = 'COMMENTS/REMOVE_FILE',
}

const fetchByTodoId = createAction<IFetchCommentsByTodoId>(Type.FETCH_BY_TODO_ID);
const setAll = createAction<ISetComments>(Type.SET_ALL);
const create = createAction<ICreateComment>(Type.CREATE);
const add = createAction<IAddComment>(Type.ADD);
const remove = createAction<IRemoveComment>(Type.REMOVE);
const addLike = createAction<IAddCommentLike>(Type.ADD_LIKE);
const removeLike = createAction<IRemoveCommentLike>(Type.REMOVE_LIKE);
const updateLike = createAction<IUpdateCommentLike>(Type.UPDATE_LIKE);
const updateText = createAction<IUpdateCommentText>(Type.UPDATE_TEXT);
const removeFile = createAction<IRemoveCommentFile>(Type.REMOVE_FILE);

export const CommentsActions = {
  Type,
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
