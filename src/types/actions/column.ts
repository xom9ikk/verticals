import { EnumColors, IColumns } from '@/types';

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

export interface IAddColumn {
  id: number;
  position: number;
  boardId: number;
  title: string;
  description?: string;
  color?: EnumColors;
  isCollapsed?: boolean;
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
  color: number | null;
}

export interface IResetColumnColor {
  id: number;
}

export interface IUpdateColumnIsCollapsed {
  id: number;
  isCollapsed: boolean;
}

export interface IRemoveColumn {
  id: number;
}

export interface IDuplicateColumn {
  id: number;
  newId: string;
}

export interface IAddColumnBelow {
  boardId: number;
  belowId: number;
}
