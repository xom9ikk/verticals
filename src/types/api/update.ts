import {
  IBoard, IColumn, IComment, ICommentAttachment, ID, ITodo,
} from '@type/entities';

export enum EnumOperations {
  Insert,
  Update,
  Delete,
}

export interface IOperation {
  operation: EnumOperations
}

export type IBoardUpdateResponse = IBoard & IOperation;

export type IColumnUpdateResponse = IColumn & IOperation;

export type ITodoUpdateResponse = ITodo & IOperation;

export type IBoardPositionsUpdateResponse = {
  userId: ID,
  order: Array<ID>;
} & IOperation;

export type IColumnPositionsUpdateResponse = {
  boardId: ID,
  order: Array<ID>;
} & IOperation;

export type ITodoPositionsUpdateResponse = {
  columnId: ID,
  order: Array<ID>;
} & IOperation;

export type ICommentUpdateResponse = IComment & IOperation;

export type ICommentAttachmentUpdateResponse = ICommentAttachment & IOperation;
