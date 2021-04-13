import { inject, injectable } from 'inversify';

import 'reflect-metadata';
import { IHttpClient } from '@inversify/interfaces/httpClient';
import { ICommentAttachmentService } from '@inversify/interfaces/services';
import { TYPES } from '@inversify/types';
import {
  IGetCommentAttachmentsBySubTodoIdRequest, IGetCommentAttachmentsBySubTodoIdResponse,
  IGetCommentAttachmentsByTodoIdRequest,
  IGetCommentAttachmentsByTodoIdResponse,
  IRemoveCommentAttachmentRequest,
  IRemoveCommentAttachmentResponse,
  IUploadCommentAttachmentRequest,
  IUploadCommentAttachmentResponse,
} from '@type/api';

@injectable()
export class CommentAttachmentService implements ICommentAttachmentService {
  httpClient: IHttpClient;

  constructor(
  @inject(TYPES.HttpClient) httpClient: IHttpClient,
  ) {
    this.httpClient = httpClient;
  }

  getByTodoId(body: IGetCommentAttachmentsByTodoIdRequest) {
    return this.httpClient.get<IGetCommentAttachmentsByTodoIdResponse>('/comment-attachment', {
      params: body,
    });
  }

  getBySubTodoId(body: IGetCommentAttachmentsBySubTodoIdRequest) {
    return this.httpClient.get<IGetCommentAttachmentsBySubTodoIdResponse>('/comment-attachment', {
      params: body,
    });
  }

  uploadFile(body: IUploadCommentAttachmentRequest) {
    const { commentId, file } = body;
    return this.httpClient.post<IUploadCommentAttachmentResponse>(`/comment-attachment/${commentId}`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  remove(body: IRemoveCommentAttachmentRequest) {
    const { id } = body;
    return this.httpClient.delete<IRemoveCommentAttachmentResponse>(`/comment-attachment/${id}`);
  }
}
