import { IComments } from '@/types/entities';
import { IServerResponse } from './response';

export type IGetAllCommentsResponse = IServerResponse<{
  todos: IComments;
}>;

export interface IGetCommentsByTodoIdRequest {
  columnId: number;
}

export type IGetCommentsByTodoIdResponse = IServerResponse<{
  comments: IComments;
}>;

export interface ICreateCommentRequest {
  todoId: number;
  text: string;
  replyCommentId: number;
  files?: FileList | null;
}

export type ICreateCommentResponse = IServerResponse<{
  commentId: number;
}>;

export interface IRemoveCommentRequest {
  id: string;
}

export type IRemoveCommentResponse = IServerResponse;

export interface IUpdateCommentRequest {
  id: string;
  text?: string;
}

export type IUpdateCommentResponse = IServerResponse;
