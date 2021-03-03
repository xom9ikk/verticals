import {
  IColor, IColumn, IColumns, ID,
} from '@type/entities';

export interface IFetchColumnsByBoardId {
  boardId: number;
}

export type ISetColumns = IColumns;

export interface ICreateColumn {
  boardId: number;
  title: string;
  description?: string;
  color?: IColor;
  isCollapsed?: boolean;
  belowId?: number;
  width?: number;
}

export type IAddColumn = IColumn;

export interface IInsertColumn {
  entity: IColumn;
  position: number;
}

export type IUpdateColumn = {
  id: number;
} & (
  { title: string }
  | { description: string }
  | { color: IColor }
  | { isCollapsed: boolean }
  | { width: number }
);

export interface IMoveColumn {
  sourcePosition: number;
  destinationPosition: number;
  boardId: number;
}

export interface ISetColumnPositionsByBoardId {
  positions: Array<ID>;
  boardId: ID;
}

export interface IRemoveColumn {
  id: number;
}

export interface IDuplicateColumn {
  columnId: number;
}

export interface IDrawColumnBelow {
  boardId: number;
  belowId: number;
}

export interface IReverseColumnOrder {
  boardId: number;
}
