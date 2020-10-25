export interface ICommentAttachment {
  id: number;
  commentId: number;
  path: string;
  name: string;
  extension: string;
  size: number;
  mimeType: string;
  encoding: string;
}

export type ICommentAttachments = Array<ICommentAttachment>;
