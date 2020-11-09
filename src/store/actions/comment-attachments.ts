import { createAction } from 'redux-actions';
import {
  IFetchCommentAttachmentsByTodoId,
  ISetCommentAttachments,
  IAddCommentAttachment,
  IUploadCommentAttachmentsFiles,
  IUploadCommentAttachmentsFile,
  IRemoveCommentAttachment,
} from '@/types/actions';

enum Type {
  FETCH_BY_TODO_ID = 'COMMENT_ATTACHMENTS/FETCH_BY_TODO_ID',
  MERGE = 'COMMENT_ATTACHMENTS/MERGE',
  ADD = 'COMMENT_ATTACHMENTS/ADD',
  UPLOAD_FILES = 'COMMENT_ATTACHMENTS/UPLOAD_FILES',
  UPLOAD_FILE = 'COMMENT_ATTACHMENTS/UPLOAD_FILE',
  REMOVE = 'COMMENT_ATTACHMENTS/REMOVE',
}

const fetchByTodoId = createAction<IFetchCommentAttachmentsByTodoId>(Type.FETCH_BY_TODO_ID);
const merge = createAction<ISetCommentAttachments>(Type.MERGE);
const add = createAction<IAddCommentAttachment>(Type.ADD);
const uploadFiles = createAction<IUploadCommentAttachmentsFiles>(Type.UPLOAD_FILES);
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
  merge,
  add,
  uploadFiles,
  uploadFile,
  remove,
};
