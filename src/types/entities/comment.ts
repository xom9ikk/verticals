export interface IFile {
  id: string;
  link: string;
  type: string;
  size: string;
  name: string;
}

export interface IImage {
  link: string;
}

export interface IComment {
  id: string;
  userId: number;
  userAvatar: string;
  date: number;
  todoId: number;
  text?: string;
  attachedFiles?: Array<IFile>;
  likes?: Array<string>;
  editDate?: Date;
  replyCommentId?: string;
}

export type IComments = Array<IComment>;
