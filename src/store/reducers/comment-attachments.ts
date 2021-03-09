import { createReducer } from '@reduxjs/toolkit';
import uniqBy from 'lodash.uniqby';
import { ICommentAttachments } from '@type/entities';
import { CommentAttachmentsActions } from '@store/actions';

export const initialState: ICommentAttachments = [];

export const CommentAttachmentsReducer = createReducer(initialState, (builder) => builder
  .addCase(CommentAttachmentsActions.merge, (draft, action) => (uniqBy([...action.payload, ...draft], 'id')))
  .addCase(CommentAttachmentsActions.add, (draft, action) => { draft.push(action.payload); })
  .addCase(CommentAttachmentsActions.remove, (draft, action) => {
    draft.splice(draft.findIndex((attachment) => attachment.id === action.payload.id), 1);
  }));
