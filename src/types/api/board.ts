import {
  EnumTodoType, IBoards, IColor,
} from '@type/entities';
import { IServerResponse } from './response';

export type IGetAllBoardsResponse = IServerResponse<{
  readonly boards: IBoards;
}>;

export interface ICreateBoardRequest {
  readonly icon: string;
  readonly title: string;
  readonly cardType: EnumTodoType;
  readonly description?: string;
  readonly belowId?: number;
}

export type ICreateBoardResponse = IServerResponse<{
  readonly boardId: number;
  readonly position: number;
}>;

export interface IRemoveBoardRequest {
  readonly id: number;
}

export type IRemoveBoardResponse = IServerResponse;

export interface IUpdateBoardRequest {
  readonly id: number;
  readonly icon?: string;
  readonly title?: string;
  readonly cardType?: EnumTodoType;
  readonly description?: string;
  readonly color?: IColor;
}

export type IUpdateBoardResponse = IServerResponse;

export interface IUpdateBoardPositionRequest {
  readonly sourcePosition: number;
  readonly destinationPosition: number;
}

export type IUpdateBoardPositionResponse = IServerResponse;
