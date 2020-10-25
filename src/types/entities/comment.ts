export interface IFile {
  id: number;
  link: string;
  type: string;
  size: string;
  name: string;
}

// export interface IImage {
//   link: string;
// }

export interface IComment {
  id: number;
  userId: number;
  todoId: number;
  text?: string;
  createdAt: number;
  updatedAt: number | null;
  replyCommentId: number;
  // attachedFiles?: Array<IFile>;
  // likes?: Array<string>;
}

export type IComments = Array<IComment>;
