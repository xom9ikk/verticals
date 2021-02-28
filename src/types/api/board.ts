import {
  EnumTodoType, IBoards, IColor,
} from '@type/entities';
import { IServerResponse } from './response';

export type IGetAllBoardsResponse = IServerResponse<{
  boards: IBoards;
}>;

export interface ICreateBoardRequest {
  icon: string;
  title: string;
  cardType: EnumTodoType;
  description?: string;
  belowId?: number;
}

export type ICreateBoardResponse = IServerResponse<{
  boardId: number;
  position: number;
}>;

export interface IRemoveBoardRequest {
  id: number;
}

export type IRemoveBoardResponse = IServerResponse;

export interface IUpdateBoardRequest {
  id: number;
  icon?: string;
  title?: string;
  cardType?: EnumTodoType;
  description?: string;
  color?: IColor;
}

export type IUpdateBoardResponse = IServerResponse;

export interface IUpdateBoardPositionRequest {
  sourcePosition: number;
  destinationPosition: number;
}

export type IUpdateBoardPositionResponse = IServerResponse;
