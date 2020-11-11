import { ICommentLike, IComments } from '@/types/entities';

export interface IFetchCommentsByTodoId {
  todoId: number;
}

export type ISetComments = IComments;

export interface ICreateComment {
  todoId: number;
  text: string;
  replyCommentId?: number;
  files: FileList | null;
}

export interface IAddComment {
  id: number;
  todoId: number;
  text: string;
  replyCommentId?: number;
}

export interface IRemoveComment {
  id: number;
}

export interface IAddCommentLike {
  commentId: number;
}

export interface IRemoveCommentLike {
  commentId: number;
}

export interface IUpdateCommentLike {
  commentId: number;
  like: ICommentLike;
  isLiked: boolean;
}

export interface IUpdateCommentText {
  id: number;
  text: string;
}

export interface IRemoveCommentFile {
  id: number;
  fileId: number;
}
