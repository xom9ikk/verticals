import { ICommentAttachment, ICommentAttachments } from '@/types/entities';
import { IServerResponse } from './response';

export interface IGetCommentAttachmentsByTodoIdRequest {
  columnId: number;
}

export type IGetCommentAttachmentsByTodoIdResponse = IServerResponse<{
  attachments: ICommentAttachments;
}>;

export interface IUploadCommentAttachmentRequest {
  commentId: number;
  file: File;
}

export type IUploadCommentAttachmentResponse = IServerResponse<ICommentAttachment>;

export interface IRemoveCommentAttachmentRequest {
  id: number;
}

export type IRemoveCommentAttachmentResponse = IServerResponse;
