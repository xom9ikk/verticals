/* eslint-disable no-return-assign,max-len */
import { IComment, ICommentLike, IComments } from '@type/entities';
import { createReducer } from '@reduxjs/toolkit';
import { CommentsActions } from '@store/actions';

const initialState: IComments = [];

export const CommentsReducer = createReducer(initialState, (builder) => builder
  .addCase(CommentsActions.setAll, (state, action) => action.payload)
  .addCase(CommentsActions.add, (state, action) => {
    state.push({
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      userId: 1,
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
