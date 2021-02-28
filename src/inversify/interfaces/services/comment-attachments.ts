/* eslint-disable max-len */
import {
  IGetCommentAttachmentsByTodoIdRequest,
  IGetCommentAttachmentsByTodoIdResponse,
  IRemoveCommentAttachmentRequest,
  IRemoveCommentAttachmentResponse,
  IUploadCommentAttachmentRequest,
  IUploadCommentAttachmentResponse,
} from '@type/api';

export interface ICommentAttachmentService {
  getByTodoId(body: IGetCommentAttachmentsByTodoIdRequest): Promise<IGetCommentAttachmentsByTodoIdResponse>;
  uploadFile(body: IUploadCommentAttachmentRequest): Promise<IUploadCommentAttachmentResponse>;
  remove(body: IRemoveCommentAttachmentRequest): Promise<IRemoveCommentAttachmentResponse>;
}
