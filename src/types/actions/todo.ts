import {
  EnumColors, EnumTodoStatus, ITodo, ITodos,
} from '@type/entities';

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

export type IAddTodo = ITodo;

export interface IInsertTodo {
  entity: ITodo;
  position: number;
}

export interface IUpdateTodoPosition {
  sourcePosition: number;
  destinationPosition: number;
  columnId: number;
  targetColumnId?: number;
}

export interface IUpdateTodoColor {
  id: number;
  color: EnumColors | null;
}

export interface IDuplicateTodo {
  todoId: number;
}

export interface IRemoveTodo {
  id: number;
}

export interface IDrawTodoBelow {
  columnId: number;
  belowId: number;
}

export interface IUpdateTodoIsArchive {
  id: number;
  isArchived: boolean;
}

export interface IUpdateTodoNotificationsEnabled {
  id: number;
  isNotificationsEnabled: boolean;
}
