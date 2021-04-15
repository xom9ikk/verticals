import { createAction } from '@reduxjs/toolkit';

import {
  IAddCommentAttachment,
  IFetchCommentAttachmentsBySubTodoId,
  IFetchCommentAttachmentsByTodoId,
  IRemoveCommentAttachment,
  ISetCommentAttachments,
  IUploadCommentAttachmentsFile,
  IUploadCommentAttachmentsFiles,
} from '@type/actions';

export const CommentAttachmentsActions = {
  effect: {
    fetchByTodoId: createAction<IFetchCommentAttachmentsByTodoId>('COMMENT_ATTACHMENTS-EFFECT/FETCH_BY_TODO_ID'),
    fetchBySubTodoId: createAction<IFetchCommentAttachmentsBySubTodoId>(
      'COMMENT_ATTACHMENTS-EFFECT/FETCH_BY_SUB_TODO_ID',
    ),
    uploadFiles: createAction<IUploadCommentAttachmentsFiles>('COMMENT_ATTACHMENTS-EFFECT/UPLOAD_FILES'),
    uploadFile: createAction<IUploadCommentAttachmentsFile>('COMMENT_ATTACHMENTS-EFFECT/UPLOAD_FILE'),
    remove: createAction<IRemoveCommentAttachment>('COMMENT_ATTACHMENTS-EFFECT/REMOVE'),
  },
  merge: createAction<ISetCommentAttachments>('COMMENT_ATTACHMENTS/MERGE'),
  add: createAction<IAddCommentAttachment>('COMMENT_ATTACHMENTS/ADD'),
  remove: createAction<IRemoveCommentAttachment>('COMMENT_ATTACHMENTS/REMOVE'),
};
