import {
  IColor, IColumns, ITodos,
} from '@type/entities';
import { IServerResponse } from './response';

export type IGetAllColumnsResponse = IServerResponse<{
  columns: IColumns;
}>;

export interface IGetColumnsByBoardIdRequest {
  boardId: number;
}

export type IGetColumnsByBoardIdResponse = IServerResponse<{
  columns: IColumns;
}>;

export interface ICreateColumnRequest {
  boardId: number;
  title: string;
  description?: string;
  color?: IColor;
  isCollapsed?: boolean;
  belowId?: number;
}

export type ICreateColumnResponse = IServerResponse<{
  columnId: number;
  position: number;
}>;

export interface IRemoveColumnRequest {
  id: number;
}

export type IRemoveColumnResponse = IServerResponse;

export interface IUpdateColumnRequest {
  id: number;
  title?: string;
  description?: string;
  color?: IColor;
  isCollapsed?: boolean;
}

export type IUpdateColumnResponse = IServerResponse;

export interface IUpdateColumnPositionRequest {
  sourcePosition: number;
  destinationPosition: number;
}

export type IUpdateColumnPositionResponse = IServerResponse;

export interface IDuplicateColumnRequest {
  columnId: number;
}

export type IDuplicateColumnResponse = IServerResponse<{
  columnId: number;
  position: number;
  boardId: number;
  title: string;
  description?: string;
  color?: IColor;
  isCollapsed?: boolean;
  belowId?: number;
  todos: ITodos;
}>;

export interface IReverseColumnOrderRequest {
  boardId: number;
}

export type IReverseColumnOrderResponse = IServerResponse;
