import {
  IBoard, IColumn, IComment, ICommentAttachment, ID, ITodo,
} from '@type/entities';

export enum EnumOperations {
  Insert,
  Update,
  Delete,
}

export interface IOperation {
  readonly operation: EnumOperations
}

export type IBoardUpdateResponse = IBoard & IOperation;

export type IColumnUpdateResponse = IColumn & IOperation;

export type ITodoUpdateResponse = ITodo & IOperation;

export type IBoardPositionsUpdateResponse = {
  readonly userId: ID,
  readonly order: Array<ID>;
} & IOperation;

export type IColumnPositionsUpdateResponse = {
  readonly boardId: ID,
  readonly order: Array<ID>;
} & IOperation;

export type ITodoPositionsUpdateResponse = {
  readonly columnId: ID,
  readonly order: Array<ID>;
} & IOperation;

export type ICommentUpdateResponse = IComment & IOperation;

export type ICommentAttachmentUpdateResponse = ICommentAttachment & IOperation;
