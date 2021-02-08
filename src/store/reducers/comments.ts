/* eslint-disable no-return-assign,max-len */
import { IComment, ICommentLike, IComments } from '@type/entities';
import { createReducer } from '@reduxjs/toolkit';
import { CommentsActions } from '@store/actions';

const initialState: IComments = [];
// const initialState: IComments = [
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'Lorem ipsum sit dolor amet',
//     date: new Date().getTime(),
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'My file here',
//     date: new Date().getTime(),
//     attachedFiles: [{
//       id: 'file-1',
//       type: 'html',
//       size: '376.8kb',
//       name: 'index.html',
//       link: 'https://index.html',
//     },
//     {
//       id: 'file-2',
//       type: 'svg',
//       size: '12.8kb',
//       name: 'arrow.svg',
//       link: 'https://arrow.svg',
//     },
//     {
//       id: 'file-3',
//       type: 'svg',
//       size: '543.8mb',
//       name: 'arrow.svg',
//       link: 'https://arrow.svg',
//     }, {
//       id: 'image-0',
//       type: 'jpg',
//       link: 'https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2600&q=80',
//       name: 'Image 0',
//       size: '283.89kb',
//     },
//     ],
//   },
//   {
//     id: '',
//     todoId: 'todo-1',
//     text: 'My image here',
//     date: new Date().getTime(),
//     attachedFiles: [{
//       id: 'image-1',
//       type: 'jpg',
//       link: 'https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2600&q=80',
//       name: 'Image 1',
//       size: '423.89kb',
//     }, {
//       id: 'image-2',
//       type: 'png',
//       link: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2702&q=80',
//       name: 'Image 2',
//       size: '6575.89kb',
//     }, {
//       id: 'image-3',
//       type: 'png',
//       link: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3567&q=80',
//       name: 'Image 3',
//       size: '21.89kb',
//     }],
//   },
// ].map((el) => ({ ...el, id: `comment-${(count += 1).toString()}` }));

export const CommentsReducer = createReducer(initialState, (builder) => builder
  .addCase(CommentsActions.setAll, (state, action) => action.payload)
  .addCase(CommentsActions.add, (state, action) => {
    state.push({
      id: Math.random().toString(),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      ...action.payload,
    });
  })
  .addCase(CommentsActions.remove, (state, action) => state.filter((comment: IComment) => comment.id !== action.payload.id))
  .addCase(CommentsActions.updateText, (state, action) => (state.map((comment: IComment) => (comment.id === action.payload.id
    ? {
      ...comment,
      text: action.payload.text,
      updatedAt: new Date().getTime(),
    }
    : comment))))
  .addCase(CommentsActions.updateLike, (state, action) => (state.map((comment: IComment) => {
    const { commentId, like, isLiked } = action.payload;
    const likedUsers = comment.likedUsers ?? [];
    return comment.id === commentId
      ? {
        ...comment,
        likedUsers: isLiked
          ? [...likedUsers, like]
          : likedUsers?.filter((l: ICommentLike) => l.username !== like.username),
      }
      : comment;
  }))));
