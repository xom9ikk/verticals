import { ICommentAttachment, ICommentAttachments } from '@type/entities';

import { IServerResponse } from './response';

export interface IGetCommentAttachmentsByTodoIdRequest {
  readonly todoId: number;
}

export type IGetCommentAttachmentsByTodoIdResponse = IServerResponse<{
  readonly attachments: ICommentAttachments;
}>;

export interface IGetCommentAttachmentsBySubTodoIdRequest {
  readonly subTodoId: number;
}

export type IGetCommentAttachmentsBySubTodoIdResponse = IServerResponse<{
  readonly attachments: ICommentAttachments;
}>;

export interface IUploadCommentAttachmentRequest {
  readonly commentId: number;
  readonly file: FormData;
}

export type IUploadCommentAttachmentResponse = IServerResponse<ICommentAttachment>;

export interface IRemoveCommentAttachmentRequest {
  readonly id: number;
}

export type IRemoveCommentAttachmentResponse = IServerResponse;
