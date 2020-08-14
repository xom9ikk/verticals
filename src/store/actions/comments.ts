import { createAction } from 'redux-actions';
import {
  IAddComment, IRemoveComment, IRemoveCommentFile, ISwitchCommentLike, IUpdateCommentText,
} from '@/types';

enum Type {
  ADD = 'COMMENTS/ADD',
  REMOVE = 'COMMENTS/REMOVE',
  SWITCH_LIKE = 'COMMENTS/SWITCH_LIKE',
  UPDATE_TEXT = 'COMMENTS/UPDATE_TEXT',
  REMOVE_FILE = 'COMMENTS/REMOVE_FILE',
}

const add = createAction<IAddComment>(Type.ADD);
const remove = createAction<IRemoveComment>(Type.REMOVE);
const switchLike = createAction<ISwitchCommentLike>(Type.SWITCH_LIKE);
const updateText = createAction<IUpdateCommentText>(Type.UPDATE_TEXT);
const removeFile = createAction<IRemoveCommentFile>(Type.REMOVE_FILE);

export const CommentsActions = {
  Type,
  add,
  remove,
  switchLike,
  updateText,
  removeFile,
};
