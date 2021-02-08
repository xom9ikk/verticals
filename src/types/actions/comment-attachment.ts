import { ICommentAttachment, ICommentAttachments } from '@/types/entities';

export interface IFetchCommentAttachmentsByTodoId {
  todoId: number;
}

export type ISetCommentAttachments = ICommentAttachments;
export type IAddCommentAttachment = ICommentAttachment;

export interface IUploadCommentAttachmentsFiles {
  commentId: number;
  files: FileList;
}

export interface IUploadCommentAttachmentsFileRaw {
  commentId: number;
  file: File;
}
export interface IUploadCommentAttachmentsFile {
  commentId: number;
  file: FormData;
}

export interface IRemoveCommentAttachment {
  id: number;
}
