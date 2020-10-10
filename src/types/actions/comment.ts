import { IFile, IImage } from '@/types/entities';

export interface IAddComment {
  todoId: number;
  text: string;
  replyCommentId: string;
  attachedFiles?: Array<IFile>;
  attachedImages?: Array<IImage>;
}

export interface IRemoveComment {
  id: string;
}

export interface ISwitchCommentLike {
  id: string;
  userId: string;
}

export interface IUpdateCommentText {
  id: string;
  text: string;
}

export interface IRemoveCommentFile {
  id: string;
  fileId: string;
}
