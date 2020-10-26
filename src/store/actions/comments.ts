import { createAction } from 'redux-actions';
import {
  IFetchCommentsByTodoId,
  ISetComments,
  ICreateComment,
  IAddComment,
  IRemoveComment,
  IRemoveCommentFile,
  ISwitchCommentLike,
  IUpdateCommentText,
} from '@/types/actions';

enum Type {
  FETCH_BY_TODO_ID = 'COMMENTS/FETCH_BY_TODO_ID',
  SET_ALL = 'COMMENTS/SET_ALL',
  CREATE = 'COMMENTS/CREATE',
  ADD = 'COMMENTS/ADD',
  REMOVE = 'COMMENTS/REMOVE',
  SWITCH_LIKE = 'COMMENTS/SWITCH_LIKE',
  UPDATE_TEXT = 'COMMENTS/UPDATE_TEXT',
  REMOVE_FILE = 'COMMENTS/REMOVE_FILE',
}

const fetchByTodoId = createAction<IFetchCommentsByTodoId>(Type.FETCH_BY_TODO_ID);
const setAll = createAction<ISetComments>(Type.SET_ALL);
const create = createAction<ICreateComment>(Type.CREATE);
const add = createAction<IAddComment>(Type.ADD);
const remove = createAction<IRemoveComment>(Type.REMOVE);
const switchLike = createAction<ISwitchCommentLike>(Type.SWITCH_LIKE);
const updateText = createAction<IUpdateCommentText>(Type.UPDATE_TEXT);
const removeFile = createAction<IRemoveCommentFile>(Type.REMOVE_FILE);

export const CommentsActions = {
  Type,
  fetchByTodoId,
  setAll,
  create,
  add,
  remove,
  switchLike,
  updateText,
  removeFile,
};
