import { IComments } from '@/types/entities';
import { IServerResponse } from './response';

export type IGetAllCommentsResponse = IServerResponse<{
  todos: IComments;
}>;

export interface IGetCommentsByTodoIdRequest {
  todoId: number;
}

export type IGetCommentsByTodoIdResponse = IServerResponse<{
  comments: IComments;
}>;

export interface ICreateCommentRequest {
  todoId: number;
  text: string;
  replyCommentId?: number;
}

export type ICreateCommentResponse = IServerResponse<{
  commentId: number;
}>;

export interface IRemoveCommentRequest {
  id: number;
}

export type IRemoveCommentResponse = IServerResponse;

export interface IUpdateCommentRequest {
  id: number;
  text?: string;
}

export type IUpdateCommentResponse = IServerResponse;

export interface IAddCommentLikeRequest {
  commentId: number;
}

export type IAddCommentLikeResponse = IServerResponse;

export interface IRemoveCommentLikeRequest {
  commentId: number;
}

export type IRemoveCommentLikeResponse = IServerResponse;
