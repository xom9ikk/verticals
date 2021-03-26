import {
  IGetCommentAttachmentsBySubTodoIdRequest,
  IGetCommentAttachmentsBySubTodoIdResponse,
  IGetCommentAttachmentsByTodoIdRequest,
  IGetCommentAttachmentsByTodoIdResponse,
  IRemoveCommentAttachmentRequest,
  IRemoveCommentAttachmentResponse,
  IUploadCommentAttachmentRequest,
  IUploadCommentAttachmentResponse,
} from '@type/api';

export interface ICommentAttachmentService {
  getByTodoId(body: IGetCommentAttachmentsByTodoIdRequest): Promise<IGetCommentAttachmentsByTodoIdResponse>;
  getBySubTodoId(body: IGetCommentAttachmentsBySubTodoIdRequest): Promise<IGetCommentAttachmentsBySubTodoIdResponse>;
  uploadFile(body: IUploadCommentAttachmentRequest): Promise<IUploadCommentAttachmentResponse>;
  remove(body: IRemoveCommentAttachmentRequest): Promise<IRemoveCommentAttachmentResponse>;
}
