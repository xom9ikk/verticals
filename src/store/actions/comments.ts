import { createAction } from 'redux-actions';
import { EnumCommentType, IComment } from '../../types';

enum Type {
  ADD = 'COMMENTS/ADD',
}
const add = createAction(
  Type.ADD,
  (
    todoId: string,
    type: EnumCommentType,
    content: string,
  ) => ({
    todoId,
    type,
    content,
  }),
);

export const CommentsActions = {
  Type,
  add,
};
