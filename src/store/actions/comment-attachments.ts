import { createAction } from 'redux-actions';
import {
  IFetchCommentAttachmentsByTodoId,
  ISetCommentAttachments,
  IUploadCommentAttachmentsFile,
  IRemoveCommentAttachment,
} from '@/types/actions';

enum Type {
  FETCH_BY_TODO_ID = 'COMMENT_ATTACHMENTS/FETCH_BY_TODO_ID',
  SET_COMMENT_ATTACHMENTS = 'COMMENT_ATTACHMENTS/SET_COMMENT_ATTACHMENTS',
  UPLOAD_FILE = 'COMMENT_ATTACHMENTS/UPLOAD_FILE',
  REMOVE = 'COMMENT_ATTACHMENTS/REMOVE',
}

const fetchByTodoId = createAction<IFetchCommentAttachmentsByTodoId>(Type.FETCH_BY_TODO_ID);
const setAll = createAction<ISetCommentAttachments>(Type.SET_COMMENT_ATTACHMENTS);
const uploadFile = createAction(
  Type.UPLOAD_FILE,
  (payload: IUploadCommentAttachmentsFile) => {
    const { commentId, file } = payload;
    const formData = new FormData();
    formData.append(file.name, file);
    return {
      commentId,
      file: formData,
    };
  },
);
const remove = createAction<IRemoveCommentAttachment>(Type.REMOVE);

export const CommentAttachmentsActions = {
  Type,
  fetchByTodoId,
  setAll,
  uploadFile,
  remove,
};
