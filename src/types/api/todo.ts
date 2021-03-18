import {
  EnumTodoStatus, IColor, ITodos,
} from '@type/entities';
import { IServerResponse } from './response';

export type IGetAllTodosResponse = IServerResponse<{
  readonly todos: ITodos;
}>;

export interface IGetTodosByBoardIdRequest {
  readonly boardId: number;
}

export type IGetTodosByBoardIdResponse = IServerResponse<{
  readonly todos: ITodos;
}>;

export type IGetRemovedTodosResponse = IServerResponse<{
  readonly todos: ITodos;
}>;

export interface ICreateTodoRequest {
  readonly headingId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
  readonly status?: EnumTodoStatus;
  readonly expirationDate?: Date | null;
  readonly belowId?: number;
}

export type ICreateTodoResponse = IServerResponse<{
  readonly todoId: number;
  readonly position: number;
}>;

export interface IRemoveTodoRequest {
  readonly id: number;
}

export type IRemoveTodoResponse = IServerResponse;

export interface IUpdateTodoRequest {
  readonly id: number;
  readonly title?: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
}

export type IUpdateTodoResponse = IServerResponse;

export interface IUpdateTodoPositionRequest {
  readonly sourcePosition: number;
  readonly destinationPosition: number;
  readonly headingId: number;
  readonly targetHeadingId?: number;
}

export type IUpdateTodoPositionResponse = IServerResponse;

export interface IDuplicateTodoRequest {
  readonly todoId: number;
}

export type IDuplicateTodoResponse = IServerResponse<{
  readonly todoId: number;
  readonly position: number;
  readonly headingId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
  readonly belowId?: number;
}>;

export interface ISwitchArchivedTodoRequest {
  readonly todoId: number;
}

export type ISwitchArchivedTodoResponse = IServerResponse;

export interface ISwitchRemovedTodoRequest {
  readonly todoId: number;
}

export type ISwitchRemovedTodoResponse = IServerResponse;
