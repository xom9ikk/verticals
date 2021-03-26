export interface ICommentLike {
  readonly name: string | null;
  readonly surname: string | null;
  readonly username: string | null;
  readonly avatar: string | null;
}

export interface IComment {
  readonly id: number;
  readonly userId: number;
  readonly todoId?: number;
  readonly subTodoId?: number;
  readonly text: string;
  readonly createdAt: number;
  readonly updatedAt: number | null;
  readonly replyCommentId?: number;
  readonly likedUsers?: Array<ICommentLike>;
}

export type IComments = Array<IComment>;
