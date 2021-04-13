export interface ICommentLike {
  readonly name: string | null;
  readonly surname: string | null;
  readonly username: string | null;
  readonly avatar: string | null;
}

export type IComment = {
  readonly id: number;
  readonly userId: number;
  readonly text: string;
  readonly createdAt: number;
  readonly updatedAt: number | null;
  readonly replyCommentId?: number;
  readonly likedUsers?: Array<ICommentLike>;
} & (
  | { readonly todoId: number }
  | { readonly subTodoId: number }
);

export type IComments = Array<IComment>;
