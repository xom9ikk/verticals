import {
  IBoard, IColumn, IComment, ICommentAttachment, ID, ITodo,
} from '@type/entities';

export enum EnumOperations {
  Insert,
  Update,
  Delete,
}

export interface IOperation {
  readonly operation: EnumOperations;
}

export type IUpdateData<T> = {
  readonly data: T;
} & IOperation;

export type IBoardUpdateData = IBoard;
export type IBoardUpdateResponse = IUpdateData<IBoardUpdateData>;

export type IColumnUpdateData = IColumn;
export type IColumnUpdateResponse = IUpdateData<IColumnUpdateData>;

export type ITodoUpdateData = ITodo;
export type ITodoUpdateResponse = IUpdateData<ITodoUpdateData>;

export interface IBoardPositionsUpdateData {
  readonly userId: ID;
  readonly order: Array<ID>;
}
export type IBoardPositionsUpdateResponse = IUpdateData<IBoardPositionsUpdateData>;

export interface IColumnPositionsUpdateData {
  readonly boardId: ID;
  readonly order: Array<ID>;
}
export type IColumnPositionsUpdateResponse = IUpdateData<IColumnPositionsUpdateData>;

export interface ITodoPositionsUpdateData {
  readonly columnId: ID;
  readonly order: Array<ID>;
}
export type ITodoPositionsUpdateResponse = IUpdateData<ITodoPositionsUpdateData>;

export type ICommentUpdateData = IComment;
export type ICommentUpdateResponse = IUpdateData<ICommentUpdateData>;

export type ICommentAttachmentUpdateData = ICommentAttachment;
export type ICommentAttachmentUpdateResponse = IUpdateData<ICommentAttachmentUpdateData>;
