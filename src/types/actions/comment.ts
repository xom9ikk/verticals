import { ICommentLike, IComments } from '@type/entities';

export interface IFetchCommentsByTodoId {
  readonly todoId: number;
}

export type ISetComments = IComments;

export interface ICreateComment {
  readonly todoId: number;
  readonly text: string;
  readonly replyCommentId?: number;
  readonly files: FileList | null;
}

export interface IAddComment {
  readonly id: number;
  readonly todoId: number;
  readonly text: string;
  readonly replyCommentId?: number;
}

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
