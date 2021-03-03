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

export interface ICommentLike {
  readonly name: string | null;
  surname: string | null;
  username: string | null;
  avatar: string | null;
}

export interface IComment {
  id: number;
  userId: number;
  todoId: number;
  text: string;
  createdAt: number;
  updatedAt: number | null;
  replyCommentId?: number;
  likedUsers?: Array<ICommentLike>;
}

export type IComments = Array<IComment>;
