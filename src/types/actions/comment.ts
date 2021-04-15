import { ICommentLike, IComments } from '@type/entities';

export interface IFetchCommentsByTodoId {
  readonly todoId: number;
}

export interface IFetchCommentsBySubTodoId {
  readonly subTodoId: number;
}

export type ISetComments = IComments;

export type ICreateComment = {
  readonly text: string;
  readonly replyCommentId?: number;
  readonly files?: FormData;
} & (
  | { readonly todoId: number }
  | { readonly subTodoId: number }
);

export type IAddComment = {
  readonly id: number;
  readonly text: string;
  readonly replyCommentId?: number;
} & (
  | { readonly todoId: number }
  | { readonly subTodoId: number }
);

export interface IRemoveComment {
  readonly id: number;
}

export interface IAddCommentLike {
  readonly commentId: number;
}

export interface IRemoveCommentLike {
  readonly commentId: number;
}

export interface IUpdateCommentLike {
  readonly commentId: number;
  readonly like: ICommentLike;
  readonly isLiked: boolean;
}

export interface IUpdateCommentText {
  readonly id: number;
  readonly text: string;
}
