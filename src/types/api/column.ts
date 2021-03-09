import {
  IColor, IColumns, ITodos,
} from '@type/entities';
import { IServerResponse } from './response';

export type IGetAllColumnsResponse = IServerResponse<{
  readonly columns: IColumns;
}>;

export interface IGetColumnsByBoardIdRequest {
  readonly boardId: number;
}

export type IGetColumnsByBoardIdResponse = IServerResponse<{
  readonly columns: IColumns;
}>;

export interface ICreateColumnRequest {
  readonly boardId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
  readonly belowId?: number;
  readonly width?: number;
}

export type ICreateColumnResponse = IServerResponse<{
  readonly columnId: number;
  readonly position: number;
}>;

export interface IRemoveColumnRequest {
  readonly id: number;
}

export type IRemoveColumnResponse = IServerResponse;

export interface IUpdateColumnRequest {
  readonly id: number;
  readonly title?: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
  readonly width?: number;
}

export type IUpdateColumnResponse = IServerResponse;

export interface IUpdateColumnPositionRequest {
  readonly sourcePosition: number;
  readonly destinationPosition: number;
}

export type IUpdateColumnPositionResponse = IServerResponse;

export interface IDuplicateColumnRequest {
  readonly columnId: number;
}

export type IDuplicateColumnResponse = IServerResponse<{
  readonly columnId: number;
  readonly position: number;
  readonly boardId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
  readonly belowId?: number;
  readonly width?: number;
  readonly todos: ITodos;
}>;

export interface IReverseColumnOrderRequest {
  boardId: number;
}

export type IReverseColumnOrderResponse = IServerResponse;
