import { createAction } from 'redux-actions';
import { IFile, IImage } from '../../types';

enum Type {
  ADD = 'COMMENTS/ADD',
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

export const CommentsActions = {
  Type,
  add,
};
