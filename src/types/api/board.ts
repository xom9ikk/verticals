import {
  EnumColors, EnumTodoType, IBoards,
} from '@/types/entities';
import { IServerResponse } from './response';

export type IGetAllBoardsResponse = IServerResponse<{
  boards: IBoards;
}>;

export interface ICreateBoardRequest {
  icon: string;
  title: string;
  cardType: number;
  description?: string;
  belowId?: string;
}

export type ICreateBoardResponse = IServerResponse<{
  boardId: number;
  position: number;
}>;

export interface IRemoveBoardRequest {
  id: string;
}

export type IRemoveBoardResponse = IServerResponse;

export interface IUpdateBoardRequest {
  id: string;
  icon?: string;
  title?: string;
  cardType?: EnumTodoType;
  description?: string;
  color?: EnumColors;
}

export type IUpdateBoardResponse = IServerResponse;

export interface IUpdateBoardPositionRequest {
  sourcePosition: number;
  destinationPosition: number;
}

export type IUpdateBoardPositionResponse = IServerResponse;
