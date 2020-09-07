import { EnumTodoStatus, ITodos } from '../todo';

export type ISetTodos = ITodos;

export interface IUpdateTodoTitle {
  id: string;
  title: string;
}

export interface IUpdateTodoDescription {
  id: string;
  description: string;
}
export interface IUpdateTodoCompleteStatus {
  id: string;
  status: EnumTodoStatus;
}

export interface IAddTodo {
  columnId: number;
  title?: string;
  description?: string;
  status?: EnumTodoStatus;
}

export interface IUpdateTodoColumnId {
  id: string;
  sourceColumnId: string;
  targetColumnId: string;
  position: number;
}

export interface IUpdateTodoPosition {
  id: string;
  position: number;
  columnId: string;
}

export interface IUpdateTodoColor {
  id: string;
  color: number;
}

export interface IResetTodoColor {
  id: string;
}

export interface IDuplicateTodoForColumn {
  columnId: string;
  newColumnId: string;
}

export interface IDuplicateTodo {
  id: string;
}

export interface IRemoveTodo {
  id: string;
}

export interface IAddTodoBelow {
  id: string;
}

export interface IGenerateNewTodoId {
  id: string;
}

export interface IUpdateIsArchive {
  id: string;
  isArchive: boolean;
}

export interface ISwitchTodoNotificationsEnabled {
  id: string;
}
