// @ts-ignore
import uniqBy from 'lodash.uniqby';
import { handleActions } from 'redux-actions';
import { ICommentAttachments } from '@/types/entities';
import { CommentAttachmentsActions } from '../actions';

const initialState: ICommentAttachments = [];

export const CommentAttachmentsReducer = handleActions<ICommentAttachments, any>({
  [CommentAttachmentsActions.Type.MERGE]:
        (state, action) => (uniqBy([...action.payload, ...state], 'id')),
  [CommentAttachmentsActions.Type.ADD]:
        (state, action) => ([...state, {
          ...action.payload,
        }]),
  [CommentAttachmentsActions.Type.REMOVE]:
        (state, action) => state.filter((attachment) => attachment.id !== action.payload.id),
}, initialState);
