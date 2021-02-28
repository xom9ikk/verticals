import {
  EnumTodoStatus, IColor, ITodos,
} from '@type/entities';
import { IServerResponse } from './response';

export type IGetAllTodosResponse = IServerResponse<{
  todos: ITodos;
}>;

export interface IGetTodosByBoardIdRequest {
  boardId: number;
}

export type IGetTodosByBoardIdResponse = IServerResponse<{
  todos: ITodos;
}>;

export type IGetRemovedTodosResponse = IServerResponse<{
  todos: ITodos;
}>;

export interface ICreateTodoRequest {
  columnId: number;
  title: string;
  description?: string;
  color?: IColor;
  isCollapsed?: boolean;
  status?: EnumTodoStatus;
  expirationDate?: Date;
  belowId?: number;
}

export type ICreateTodoResponse = IServerResponse<{
  todoId: number;
  position: number;
}>;

export interface IRemoveTodoRequest {
  id: number;
}

export type IRemoveTodoResponse = IServerResponse;

export interface IUpdateTodoRequest {
  id: number;
  // columnId: number;
  title?: string;
  description?: string;
  color?: IColor;
  isCollapsed?: boolean;
}

export type IUpdateTodoResponse = IServerResponse;

export interface IUpdateTodoPositionRequest {
  sourcePosition: number;
  destinationPosition: number;
  columnId: number;
}

export type IUpdateTodoPositionResponse = IServerResponse;

export interface IDuplicateTodoRequest {
  todoId: number;
}

export type IDuplicateTodoResponse = IServerResponse<{
  todoId: number;
  position: number;
  columnId: number;
  title: string;
  description?: string;
  color?: IColor;
  isCollapsed?: boolean;
  belowId?: number;
}>;
