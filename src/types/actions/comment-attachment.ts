import { ICommentAttachment, ICommentAttachments } from '@type/entities';

export interface IFetchCommentAttachmentsByTodoId {
  readonly todoId: number;
}

export interface IFetchCommentAttachmentsBySubTodoId {
  readonly subTodoId: number;
}

export type ISetCommentAttachments = ICommentAttachments;
export type IAddCommentAttachment = ICommentAttachment;

export interface IUploadCommentAttachmentsFiles {
  readonly commentId: number;
  readonly files: FormData;
}

export interface IUploadCommentAttachmentsFile {
  readonly commentId: number;
  readonly file: FormData;
}

export interface IRemoveCommentAttachment {
  readonly id: number;
}
