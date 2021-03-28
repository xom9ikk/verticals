import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@inversify/types';
import {
  IGetAllCommentsResponse,
  ICreateCommentRequest,
  ICreateCommentResponse,
  IRemoveCommentRequest,
  IRemoveCommentResponse,
  IUpdateCommentRequest,
  IUpdateCommentResponse,
  IGetCommentsByTodoIdRequest,
  IGetCommentsByTodoIdResponse,
  IAddCommentLikeRequest,
  IAddCommentLikeResponse,
  IRemoveCommentLikeRequest,
  IRemoveCommentLikeResponse,
  IGetCommentsBySubTodoIdRequest,
  IGetCommentsBySubTodoIdResponse,
} from '@type/api';
import { IHttpClient } from '@inversify/interfaces/httpClient';
import { ICommentService } from '@inversify/interfaces/services';

@injectable()
export class CommentService implements ICommentService {
  httpClient: IHttpClient;

  constructor(
  @inject(TYPES.HttpClient) httpClient: IHttpClient,
  ) {
    this.httpClient = httpClient;
  }

  getAll() {
    return this.httpClient.get<IGetAllCommentsResponse>('/comment');
  }

  getByTodoId(body: IGetCommentsByTodoIdRequest) {
    return this.httpClient.get<IGetCommentsByTodoIdResponse>('/comment', {
      params: body,
    });
  }

  getBySubTodoId(body: IGetCommentsBySubTodoIdRequest) {
    return this.httpClient.get<IGetCommentsBySubTodoIdResponse>('/comment', {
      params: body,
    });
  }

  create(body: ICreateCommentRequest) {
    return this.httpClient.post<ICreateCommentResponse>('/comment', body);
  }

  remove(body: IRemoveCommentRequest) {
    const { id } = body;
    return this.httpClient.delete<IRemoveCommentResponse>(`/comment/${id}`, body);
  }

  update(body: IUpdateCommentRequest) {
    const { id } = body;
    return this.httpClient.patch<IUpdateCommentResponse>(`/comment/${id}`, body);
  }

  addLike(body: IAddCommentLikeRequest) {
    return this.httpClient.post<IAddCommentLikeResponse>('/comment-like/', body);
  }

  removeLike(body: IRemoveCommentLikeRequest) {
    const { commentId } = body;
    return this.httpClient.delete<IRemoveCommentLikeResponse>(`/comment-like/${commentId}`);
  }
}
