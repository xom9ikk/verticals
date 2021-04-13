import { createReducer } from '@reduxjs/toolkit';

import { CommentsActions } from '@store/actions';
import { IComments } from '@type/entities';

export const initialState: IComments = [];

export const CommentsReducer = createReducer(initialState, (builder) => builder
  .addCase(CommentsActions.setAll, (draft, action) => action.payload)
  .addCase(CommentsActions.add, (draft, action) => {
    const { id } = action.payload;
    const isAlreadyExist = draft.some((comment) => comment.id === id);
    if (!isAlreadyExist) {
      draft.push({
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        userId: 1,
        ...action.payload,
      });
    }
  })
  .addCase(CommentsActions.remove, (draft, action) => {
    const { id } = action.payload;
    const index = draft.findIndex((comment) => comment.id === id);
    if (index !== -1) draft.splice(index, 1);
  })
  .addCase(CommentsActions.updateText, (draft, action) => {
    const { id, text } = action.payload;
    const index = draft.findIndex((comment) => comment.id === id);
    draft[index].text = text;
    draft[index].updatedAt = new Date().getTime();
  })
  .addCase(CommentsActions.updateLike, (draft, action) => {
    const { commentId, like, isLiked } = action.payload;
    const index = draft.findIndex((comment) => comment.id === commentId);
    const likedUsers = draft[index].likedUsers ?? [];
    draft[index].likedUsers = isLiked
      ? [...likedUsers, like]
      : likedUsers.filter((l) => l.username !== like.username);
  }));
