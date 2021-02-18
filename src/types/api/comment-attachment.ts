import { ICommentAttachment, ICommentAttachments } from '@type/entities';
import { IServerResponse } from './response';

export interface IGetCommentAttachmentsByTodoIdRequest {
  todoId: number;
}

export type IGetCommentAttachmentsByTodoIdResponse = IServerResponse<{
  attachments: ICommentAttachments;
}>;

export interface IUploadCommentAttachmentRequest {
  commentId: number;
  file: FormData;
}

export type IUploadCommentAttachmentResponse = IServerResponse<ICommentAttachment>;

export interface IRemoveCommentAttachmentRequest {
  id: number;
}

export type IRemoveCommentAttachmentResponse = IServerResponse;
