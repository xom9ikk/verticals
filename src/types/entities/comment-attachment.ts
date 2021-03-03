export interface ICommentAttachment {
  readonly id: number;
  readonly todoId: number;
  readonly commentId: number;
  readonly path: string;
  readonly name: string;
  readonly extension: string;
  readonly size: number;
  readonly mimeType: string;
  readonly encoding: string;
}

export type ICommentAttachments = Array<ICommentAttachment>;
