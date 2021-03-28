import {
  IAddCommentLikeRequest, IAddCommentLikeResponse,
  ICreateCommentRequest,
  ICreateCommentResponse,
  IGetAllCommentsResponse, IGetCommentsBySubTodoIdRequest, IGetCommentsBySubTodoIdResponse,
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
  getBySubTodoId(body: IGetCommentsBySubTodoIdRequest): Promise<IGetCommentsBySubTodoIdResponse>;
  create(body: ICreateCommentRequest): Promise<ICreateCommentResponse>;
  remove(body: IRemoveCommentRequest): Promise<IRemoveCommentResponse>;
  update(body: IUpdateCommentRequest): Promise<IUpdateCommentResponse>;
  addLike(body: IAddCommentLikeRequest): Promise<IAddCommentLikeResponse>;
  removeLike(body: IRemoveCommentLikeRequest): Promise<IRemoveCommentLikeResponse>;
}
