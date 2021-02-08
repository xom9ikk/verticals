import {
  IAddCommentLikeRequest, IAddCommentLikeResponse,
  ICreateCommentRequest,
  ICreateCommentResponse,
  IGetAllCommentsResponse,
  IGetCommentsByTodoIdRequest,
  IGetCommentsByTodoIdResponse, IRemoveCommentLikeRequest, IRemoveCommentLikeResponse,
  IRemoveCommentRequest,
  IRemoveCommentResponse,
  IUpdateCommentRequest,
  IUpdateCommentResponse,
} from '@type/api';

export interface ICommentService {
  getAll(): Promise<IGetAllCommentsResponse>;
  getByTodoId(body: IGetCommentsByTodoIdRequest): Promise<IGetCommentsByTodoIdResponse>;
  create(body: ICreateCommentRequest): Promise<ICreateCommentResponse>;
  remove(body: IRemoveCommentRequest): Promise<IRemoveCommentResponse>;
  update(body: IUpdateCommentRequest): Promise<IUpdateCommentResponse>;
  addLike(body: IAddCommentLikeRequest): Promise<IAddCommentLikeResponse>;
  removeLike(body: IRemoveCommentLikeRequest): Promise<IRemoveCommentLikeResponse>;
}
