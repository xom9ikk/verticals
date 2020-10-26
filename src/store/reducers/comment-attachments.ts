import { handleActions } from 'redux-actions';
import { ICommentAttachments } from '@/types/entities';
import { CommentAttachmentsActions } from '../actions';

const initialState: ICommentAttachments = [];

export const CommentAttachmentsReducer = handleActions<ICommentAttachments, any>({
  [CommentAttachmentsActions.Type.SET_COMMENT_ATTACHMENTS]:
        (state, action) => ([...action.payload]),
  [CommentAttachmentsActions.Type.REMOVE]:
        (state, action) => state.filter((attachment) => attachment.id !== action.payload.id),
}, initialState);
