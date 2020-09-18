import { EnumColors } from '@/types';
import { EnumTodoStatus, ITodos } from '../todo';

export interface IFetchTodosByBoardId {
  boardId: number;
}

export type ISetTodos = ITodos;

export interface ICreateTodo {
  columnId: number;
  title: string;
  description?: string;
  color?: EnumColors;
  status?: EnumTodoStatus;
  belowId?: number;
}

export interface IUpdateTodoTitle {
  id: number;
  title: string;
}

export interface IUpdateTodoDescription {
  id: number;
  description: string;
}
export interface IUpdateTodoCompleteStatus {
  id: number;
  status: EnumTodoStatus;
}

export interface IAddTodo {
  id: number;
  position: number;
  columnId: number;
  title?: string;
  description?: string;
  status?: EnumTodoStatus;
  isArchive?: boolean;
}

export interface IUpdateTodoColumnId {
  id: number;
  sourceColumnId: string;
  targetColumnId: string;
  position: number;
}

export interface IUpdateTodoPosition {
  sourcePosition: number;
  destinationPosition: number;
  columnId: number;
}

export interface IUpdateTodoColor {
  id: number;
  color: EnumColors | null;
}

export interface IDuplicateTodo {
  id: number;
}

export interface IRemoveTodo {
  id: number;
}

export interface IDrawTodoBelow {
  columnId: number;
  belowId: number;
}

export interface IUpdateIsArchive {
  id: number;
  isArchive: boolean;
}

export interface ISwitchTodoNotificationsEnabled {
  id: number;
}
