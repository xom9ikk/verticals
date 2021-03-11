import { createAction, PrepareAction } from '@reduxjs/toolkit';
import {
  IFetchCommentAttachmentsByTodoId,
  ISetCommentAttachments,
  IAddCommentAttachment,
  IUploadCommentAttachmentsFiles,
  IUploadCommentAttachmentsFile,
  IUploadCommentAttachmentsFileRaw,
  IRemoveCommentAttachment,
} from '@type/actions';

export const CommentAttachmentsActions = {
  effect: {
    fetchByTodoId: createAction<IFetchCommentAttachmentsByTodoId>('COMMENT_ATTACHMENTS-EFFECT/FETCH_BY_TODO_ID'),
    uploadFiles: createAction<IUploadCommentAttachmentsFiles>('COMMENT_ATTACHMENTS-EFFECT/UPLOAD_FILES'),
    uploadFile: createAction<PrepareAction<IUploadCommentAttachmentsFile>>(
      'COMMENT_ATTACHMENTS-EFFECT/UPLOAD_FILE',
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
    ),
    remove: createAction<IRemoveCommentAttachment>('COMMENT_ATTACHMENTS-EFFECT/REMOVE'),
  },
  merge: createAction<ISetCommentAttachments>('COMMENT_ATTACHMENTS/MERGE'),
  add: createAction<IAddCommentAttachment>('COMMENT_ATTACHMENTS/ADD'),
  remove: createAction<IRemoveCommentAttachment>('COMMENT_ATTACHMENTS/REMOVE'),
};
