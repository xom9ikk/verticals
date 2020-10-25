import { handleActions } from 'redux-actions';
import { ICommentAttachments } from '@/types/entities';
import { CommentAttachmentsActions } from '../actions';

const initialState: ICommentAttachments = [];

export const CommentAttachmentsReducer = handleActions<ICommentAttachments, ICommentAttachments>({
  [CommentAttachmentsActions.Type.SET_COMMENT_ATTACHMENTS]:
        (state, action) => ([...action.payload]),
}, initialState);
