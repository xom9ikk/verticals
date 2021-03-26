import { IComments } from '@type/entities';
import { IServerResponse } from './response';

export type IGetAllCommentsResponse = IServerResponse<{
  readonly todos: IComments;
}>;

export interface IGetCommentsByTodoIdRequest {
  readonly todoId: number;
}

export type IGetCommentsByTodoIdResponse = IServerResponse<{
  readonly comments: IComments;
}>;

export interface ICreateCommentRequest {
  readonly todoId?: number; // TODO one of
  readonly subTodoId?: number;
  readonly text: string;
  readonly replyCommentId?: number;
}

export type ICreateCommentResponse = IServerResponse<{
  readonly commentId: number;
}>;

export interface IRemoveCommentRequest {
  readonly id: number;
}

export type IRemoveCommentResponse = IServerResponse;

export interface IUpdateCommentRequest {
  readonly id: number;
  readonly text?: string;
}

export type IUpdateCommentResponse = IServerResponse;

export interface IAddCommentLikeRequest {
  readonly commentId: number;
}

export type IAddCommentLikeResponse = IServerResponse;

export interface IRemoveCommentLikeRequest {
  readonly commentId: number;
}

export type IRemoveCommentLikeResponse = IServerResponse;
