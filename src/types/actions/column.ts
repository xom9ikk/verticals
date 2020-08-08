import { IColumns } from '../column';
import { EnumTodoType } from '../todo';

export type ISetColumns = IColumns;

export interface IAddColumn {
  boardId: string;
  title?: string;
  description?: string;
}

export interface IUpdateColumnTitle {
  id: string;
  title: string;
}

export interface IUpdateColumnDescription {
  id: string;
  description: string;
}

export interface IUpdateColumnPosition {
  sourcePosition: number;
  destinationPosition: number;
  boardId: string;
}

export interface IUpdateColumnColor {
  id: string;
  color: number;
}

export interface IResetColumnColor {
  id: string;
}

export interface IUpdateColumnIsCollapsed {
  id: string;
  isCollapsed: boolean;
}

export interface IRemoveColumn {
  id: string;
}

export interface IDuplicateColumn {
  id: string;
  newId: string;
}

export interface IAddColumnAfter {
  id: string;
  boardId: string;
}

export interface IGenerateNewColumnId {
  id: string;
}
