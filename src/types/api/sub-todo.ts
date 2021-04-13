import {
  EnumTodoStatus, IColor, ISubTodos,
} from '@type/entities';

import { IServerResponse } from './response';

export type IGetAllSubTodosResponse = IServerResponse<{
  readonly subTodos: ISubTodos;
}>;

export interface IGetSubTodosByBoardIdRequest {
  readonly boardId: number;
}

export type IGetSubTodosByBoardIdResponse = IServerResponse<{
  readonly subTodos: ISubTodos;
}>;

export type IGetRemovedSubTodosResponse = IServerResponse<{
  readonly subTodos: ISubTodos;
}>;

export interface ICreateSubTodoRequest {
  readonly todoId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
  readonly status?: EnumTodoStatus;
  readonly expirationDate?: Date | null;
  readonly belowId?: number;
}

export type ICreateSubTodoResponse = IServerResponse<{
  readonly subTodoId: number;
  readonly position: number;
}>;

export interface IRemoveSubTodoRequest {
  readonly id: number;
}

export type IRemoveSubTodoResponse = IServerResponse;

export interface IUpdateSubTodoRequest {
  readonly id: number;
  readonly title?: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
}

export type IUpdateSubTodoResponse = IServerResponse;

export interface IUpdateSubTodoPositionRequest {
  readonly sourcePosition: number;
  readonly destinationPosition: number;
  readonly todoId: number;
  readonly targetTodoId?: number;
}

export type IUpdateSubTodoPositionResponse = IServerResponse;

export interface IDuplicateSubTodoRequest {
  readonly subTodoId: number;
}

export type IDuplicateSubTodoResponse = IServerResponse<{
  readonly subTodoId: number;
  readonly position: number;
  readonly todoId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
  readonly belowId?: number;
}>;
