import { createAction } from 'redux-actions';
import {
  IUploadCommentAttachmentsFile,
} from '@/types/actions';

enum Type {
  FETCH_BY_TODO_ID = 'COMMENTS/FETCH_BY_TODO_ID',
  UPLOAD_FILE = 'COMMENT_ATTACHMENTS/UPLOAD_FILE',
}

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

export const CommentAttachmentsActions = {
  Type,
  uploadFile,
};
