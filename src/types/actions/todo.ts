import {
  EnumTodoStatus, IColor, ITodo, ITodos,
} from '@type/entities';

export interface IFetchTodosByBoardId {
  boardId: number;
}

export type ISetTodos = ITodos;

export interface ICreateTodo {
  columnId: number;
  title: string;
  description?: string;
  color?: IColor;
  status?: EnumTodoStatus;
  belowId?: number;
  files: FileList | null;
}

export type IAddTodo = ITodo;

export interface IInsertTodo {
  entity: ITodo;
  position: number;
}

export type IUpdateTodo = {
  id: number;
} & (
  { title: string }
  | { description: string }
  | { status: EnumTodoStatus }
  | { color: IColor }
  | { isArchived: boolean }
  | { isNotificationsEnabled: boolean }
);

export interface IUpdateTodoPosition {
  sourcePosition: number;
  destinationPosition: number;
  columnId: number;
  targetColumnId?: number;
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
