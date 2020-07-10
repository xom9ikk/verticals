import { handleActions } from 'redux-actions';
import { CommentsActions } from '../actions';
import { IComments } from '../../types';

let count = 0;
const initialState: IComments = [
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'Lorem ipsum sit dolor amet',
    date: new Date().getTime(),
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'My file here',
    date: new Date().getTime(),
    attachedFiles: [{
      id: 'file-1',
      type: 'html',
      size: '376.8kb',
      name: 'in dex.htm lind ex.htmlind ex.htmlindex.htmlindex.html',
      link: 'https://index.html',
    }, {
      id: 'file-2',
      type: 'svg',
      size: '12.8kb',
      name: 'arrow.svg',
      link: 'https://arrow.svg',
    }, {
      id: 'image-0',
      type: 'jpg',
      link: 'https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2600&q=80',
      name: 'Image 0',
      size: '283.89kb',
    }],
  },
  {
    id: '',
    todoId: 'todo-1',
    text: 'My image here',
    date: new Date().getTime(),
    attachedFiles: [{
      id: 'image-1',
      type: 'jpg',
      link: 'https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2600&q=80',
      name: 'Image 1',
      size: '423.89kb',
    }, {
      id: 'image-2',
      type: 'png',
      link: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2702&q=80',
      name: 'Image 2',
      size: '6575.89kb',
    }, {
      id: 'image-3',
      type: 'png',
      link: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3567&q=80',
      name: 'Image 3',
      size: '21.89kb',
    }],
  },
].map((el) => ({ ...el, id: `comment-${(count += 1).toString()}` }));

export const CommentsReducer = handleActions<IComments, any>({
  [CommentsActions.Type.ADD]:
      (state, action) => ([...state, {
        id: Math.random().toString(),
        ...action.payload,
      }]),
}, initialState);
