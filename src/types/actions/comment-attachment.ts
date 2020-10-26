import { ICommentAttachments } from '@/types/entities';

export interface IFetchCommentAttachmentsByTodoId {
  todoId: number;
}

export type ISetCommentAttachments = ICommentAttachments;

export interface IUploadCommentAttachmentsFile {
  commentId: number;
  file: File;
}

export interface IRemoveCommentAttachment {
  id: number;
}
