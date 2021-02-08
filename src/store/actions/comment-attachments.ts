import { createAction, PrepareAction } from '@reduxjs/toolkit';
import {
  IFetchCommentAttachmentsByTodoId,
  ISetCommentAttachments,
  IAddCommentAttachment,
  IUploadCommentAttachmentsFiles,
  IUploadCommentAttachmentsFile,
  IUploadCommentAttachmentsFileRaw,
  IRemoveCommentAttachment,
} from '@/types/actions';

const fetchByTodoId = createAction<IFetchCommentAttachmentsByTodoId>('COMMENT_ATTACHMENTS/FETCH_BY_TODO_ID');
const merge = createAction<ISetCommentAttachments>('COMMENT_ATTACHMENTS/MERGE');
const add = createAction<IAddCommentAttachment>('COMMENT_ATTACHMENTS/ADD');
const uploadFiles = createAction<IUploadCommentAttachmentsFiles>('COMMENT_ATTACHMENTS/UPLOAD_FILES');
const uploadFile = createAction<PrepareAction<IUploadCommentAttachmentsFile>>(
  'COMMENT_ATTACHMENTS/UPLOAD_FILE',
  (payload: IUploadCommentAttachmentsFileRaw) => { // TODO: move to saga?
    const { commentId, file } = payload;
    const formData = new FormData();
    formData.append(file.name, file);
    return {
      payload: {
        commentId,
        file: formData,
      },
    };
  },
);
const remove = createAction<IRemoveCommentAttachment>('COMMENT_ATTACHMENTS/REMOVE');

export const CommentAttachmentsActions = {
  fetchByTodoId,
  merge,
  add,
  uploadFiles,
  uploadFile,
  remove,
};
