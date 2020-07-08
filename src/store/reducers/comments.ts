import { handleActions } from 'redux-actions';
import { CommentsActions, TodosActions } from '../actions';
import { EnumCommentType, IComments } from '../../types';

let count = 0;
const initialState: IComments = [
  {
    id: '',
    todoId: 'todo-1',
    type: EnumCommentType.Text,
    content: 'Lorem ipsum sit dolor amet',
  },
  {
    id: '',
    todoId: 'todo-1',
    type: EnumCommentType.File,
    content: 'link-to-file',
  },
  {
    id: '',
    todoId: 'todo-1',
    type: EnumCommentType.Image,
    content: 'link-to-image',
  },
].map((el) => ({ ...el, id: `comment-${(count += 1).toString()}` }));

export const CommentsReducer = handleActions<IComments, any>({
  [CommentsActions.Type.ADD]:
      (state, action) => ([...state, {
        id: Math.random().toString(),
        ...action.payload,
      }]),
}, initialState);
