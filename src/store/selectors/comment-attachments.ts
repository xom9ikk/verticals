import { createSelector } from 'reselect';
import { IRootState } from '@/store/state';

const imageTypes = ['image/png', 'image/jpeg'];

export const getCommentAttachments = (state: IRootState) => state.commentAttachments;
export const getCommentAttachmentsByCommentId = (commentId: number) => createSelector(
  [getCommentAttachments],
  (attachments) => attachments.filter((attachment) => attachment.commentId === commentId),
);
export const getCommentFileAttachmentsByTodoId = (todoId: number | null) => createSelector(
  [getCommentAttachments],
  (attachments) => attachments
    .filter((attachment) => !imageTypes.includes(attachment.mimeType)
        && attachment.todoId === todoId),
);
export const getCommentImageAttachmentsByTodoId = (todoId: number | null) => createSelector(
  [getCommentAttachments],
  (attachments) => attachments
    .filter((attachment) => imageTypes.includes(attachment.mimeType)
        && attachment.todoId === todoId),
);
