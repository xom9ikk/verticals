import { IComments, IFile, IImage } from '@/types/entities';

export interface IFetchCommentsByTodoId {
  todoId: number;
}

export type ISetComments = IComments;

export interface ICreateComment {
  todoId: number;
  text: string;
  replyCommentId?: number;
  attachedFiles?: Array<IFile>;
  attachedImages?: Array<IImage>;
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

export interface ISwitchCommentLike {
  id: number;
  username: string;
}

export interface IUpdateCommentText {
  id: number;
  text: string;
}

export interface IRemoveCommentFile {
  id: number;
  fileId: number;
}
