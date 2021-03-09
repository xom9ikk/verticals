import {
  IColor, IColumn, IColumns, ID,
} from '@type/entities';

export interface IFetchColumnsByBoardId {
  readonly boardId: number;
}

export type ISetColumns = IColumns;

export interface ICreateColumn {
  readonly boardId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
  readonly belowId?: number;
  readonly width?: number;
}

export type IAddColumn = IColumn;

export interface IInsertColumn {
  readonly entity: IColumn;
  readonly position: number;
}

export type IUpdateColumn = {
  readonly id: number;
} & (
  | { readonly title: string }
  | { readonly description: string }
  | { readonly color: IColor }
  | { readonly isCollapsed: boolean }
  | { readonly width: number }
);

export interface IMoveColumn {
  readonly sourcePosition: number;
  readonly destinationPosition: number;
  readonly boardId: number;
}

export interface ISetColumnPositionsByBoardId {
  readonly positions: Array<ID>;
  readonly boardId: ID;
}

export interface IRemoveColumn {
  readonly id: number;
}

export interface IDuplicateColumn {
  readonly columnId: number;
}

export interface IDrawColumnBelow {
  readonly boardId: number;
  readonly belowId: number;
}

export interface IReverseColumnOrder {
  readonly boardId: number;
}
