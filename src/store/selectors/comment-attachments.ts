import { IRootState } from '@/store/reducers/state';
import { createSelector } from 'reselect';

export const getCommentAttachments = (state: IRootState) => state.commentAttachments;
export const getCommentAttachmentsByCommentId = (commentId: number) => createSelector(
  [getCommentAttachments],
  (attachments) => attachments.filter((attachment) => attachment.commentId === commentId),
);
const imageTypes = ['image/png', 'image/jpeg'];

export const getCommentFileAttachmentsByTodoId = (todoId: number | null) => createSelector(
  [
    getCommentAttachments,
  ],
  (attachments) => attachments
    .filter((attachment) => !imageTypes.includes(attachment.mimeType)
        && attachment.todoId === todoId),
);

export const getCommentImageAttachmentsByTodoId = (todoId: number | null) => createSelector(
  [
    getCommentAttachments,
  ],
  (attachments) => attachments
    .filter((attachment) => imageTypes.includes(attachment.mimeType)
        && attachment.todoId === todoId),
);
