import { IRootState } from '@/store/reducers/state';
import { createSelector } from 'reselect';

export const getCommentAttachments = (state: IRootState) => state.commentAttachments;
export const getCommentAttachmentsByCommentId = (commentId: number) => createSelector(
  [getCommentAttachments],
  (comments) => comments.filter((comment) => comment.commentId === commentId),
);
