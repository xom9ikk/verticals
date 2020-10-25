import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify.types';
import { ICommentAttachmentService, IHttpClient } from '@/inversify.interfaces';
import { IUploadCommentAttachmentRequest, IUploadCommentAttachmentResponse } from '@/types/api/comment-attachment';

@injectable()
export class CommentAttachmentService implements ICommentAttachmentService {
  httpClient: IHttpClient;

  constructor(
  @inject(TYPES.HttpClient) httpClient: IHttpClient,
  ) {
    this.httpClient = httpClient;
  }

  uploadFile(body: IUploadCommentAttachmentRequest) {
    const { commentId, file } = body;
    return this.httpClient.post<IUploadCommentAttachmentResponse>(`/comment-attachment/${commentId}`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}
