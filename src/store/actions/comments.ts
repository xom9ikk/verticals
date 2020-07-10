import { createAction } from 'redux-actions';
import { IFile, IImage } from '../../types';

enum Type {
  ADD = 'COMMENTS/ADD',
  REMOVE = 'COMMENTS/REMOVE',
  SWITCH_LIKE = 'COMMENTS/SWITCH_LIKE',
  UPDATE_TEXT = 'COMMENTS/UPDATE_TEXT',
  REMOVE_FILE = 'COMMENTS/REMOVE_FILE',
}

const add = createAction(
  Type.ADD,
  (
    todoId: string,
    text?: string,
    attachedFiles?: Array<IFile>,
    attachedImages?: Array<IImage>,
  ) => ({
    todoId,
    text,
    attachedFiles,
    attachedImages,
  }),
);

const remove = createAction(
  Type.REMOVE,
  (
    id: string,
  ) => ({
    id,
  }),
);

const switchLike = createAction(
  Type.SWITCH_LIKE,
  (
    id: string,
    userId: string,
  ) => ({
    id,
    userId,
  }),
);

const updateText = createAction(
  Type.UPDATE_TEXT,
  (
    id: string,
    text: string,
  ) => ({
    id,
    text,
  }),
);
const removeFile = createAction(
  Type.REMOVE_FILE,
  (
    id: string,
    fileId: string,
  ) => ({
    id,
    fileId,
  }),
);

export const CommentsActions = {
  Type,
  add,
  remove,
  switchLike,
  updateText,
  removeFile,
};
