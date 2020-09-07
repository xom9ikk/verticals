import { EnumColors, IColumns } from '@/types';
import { IServerResponse } from './response';

export type IGetAllColumnsResponse = IServerResponse<{
  columns: IColumns;
}>;

export interface ICreateColumnRequest {
  boardId: number;
  title: string;
  description?: string;
  color?: EnumColors;
  isCollapsed?: boolean;
  belowId?: string;
}

export type ICreateColumnResponse = IServerResponse<{
  columnId: number;
  position: number;
}>;

export interface IRemoveColumnRequest {
  id: string;
}

export type IRemoveColumnResponse = IServerResponse;

export interface IUpdateColumnRequest {
  id: string;
  boardId: number;
  title?: string;
  description?: string;
  color?: EnumColors;
  isCollapsed?: boolean;
}

export type IUpdateColumnResponse = IServerResponse;

export interface IUpdateColumnPositionRequest {
  sourcePosition: number;
  destinationPosition: number;
}

export type IUpdateColumnPositionResponse = IServerResponse;
