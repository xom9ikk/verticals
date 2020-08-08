import { IFile, IImage } from '../comment';

export interface IAddComment {
  todoId: string;
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
