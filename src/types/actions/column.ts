import {
  EnumColors, IColumn, IColumns,
} from '@type/entities';

export interface IFetchColumnsByBoardId {
  boardId: number;
}

export type ISetColumns = IColumns;

export interface ICreateColumn {
  boardId: number;
  title: string;
  description?: string;
  color?: EnumColors;
  isCollapsed?: boolean;
  belowId?: number;
}

export type IAddColumn = IColumn;

export interface IInsertColumn {
  entity: IColumn;
  position: number;
}

export interface IUpdateColumnTitle {
  id: number;
  title: string;
}

export interface IUpdateColumnDescription {
  id: number;
  description: string;
}

export interface IUpdateColumnPosition {
  sourcePosition: number;
  destinationPosition: number;
  boardId: number;
}

export interface IUpdateColumnColor {
  id: number;
  color: EnumColors | null;
}

export interface IUpdateColumnIsCollapsed {
  id: number;
  isCollapsed: boolean;
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
