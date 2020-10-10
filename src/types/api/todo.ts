import { EnumColors, ITodos } from '@/types/entities';
import { IServerResponse } from './response';

export type IGetAllTodosResponse = IServerResponse<{
  todos: ITodos;
}>;

export interface IGetTodosByBoardIdRequest {
  columnId: number;
}

export type IGetTodosByBoardIdResponse = IServerResponse<{
  todos: ITodos;
}>;

export interface ICreateTodoRequest {
  columnId: number;
  title: string;
  description?: string;
  color?: EnumColors;
  isCollapsed?: boolean;
  belowId?: string;
}

export type ICreateTodoResponse = IServerResponse<{
  todoId: number;
  position: number;
}>;

export interface IRemoveTodoRequest {
  id: string;
}

export type IRemoveTodoResponse = IServerResponse;

export interface IUpdateTodoRequest {
  id: string;
  columnId: number;
  title?: string;
  description?: string;
  color?: EnumColors;
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
  color?: EnumColors;
  isCollapsed?: boolean;
  belowId?: string;
}>;
