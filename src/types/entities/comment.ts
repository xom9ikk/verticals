export interface IFile {
  id: number;
  link: string;
  type: string;
  size: string;
  name: string;
}

export interface IImage {
  link: string;
}

export interface IComment {
  id: number;
  userId: number;
  createdAt: number;
  todoId: number;
  text?: string;
  attachedFiles?: Array<IFile>;
  likes?: Array<string>;
  updatedAt: number | null;
  replyCommentId?: number;
}

export type IComments = Array<IComment>;
