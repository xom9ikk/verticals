export interface IComment {
  id: string;
  todoId: string;
  type: EnumCommentType;
  content: string;
}

export type IComments = Array<IComment>;

export enum EnumCommentType {
  Text,
  Image,
  File,
}
