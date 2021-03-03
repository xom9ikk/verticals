import {
  EnumTodoStatus, IColor, ID, ITodo, ITodos,
} from '@type/entities';

export interface IFetchTodosByBoardId {
  readonly boardId: number;
}

export type ISetTodos = ITodos;

export interface ICreateTodo {
  readonly columnId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly status?: EnumTodoStatus;
  readonly belowId?: number;
  readonly expirationDate?: Date | null;
  readonly files: FileList | null;
}

export type IAddTodo = ITodo;

export interface IInsertTodo {
  readonly entity: ITodo;
  readonly position: number;
}

export type IUpdateTodo = {
  readonly id: number;
} & (
  | { readonly title: string }
  | { readonly description: string }
  | { readonly status: EnumTodoStatus }
  | { readonly color: IColor }
  | { readonly isArchived: boolean }
  | { readonly isRemoved: boolean }
  | { readonly isNotificationsEnabled: boolean }
  | { readonly expirationDate: Date | null }
);

export interface IMoveTodo {
  readonly sourcePosition: number;
  readonly destinationPosition: number;
  readonly columnId: number;
  readonly targetColumnId?: number;
}

export interface ISetTodoPositionsByColumnId {
  readonly positions: Array<ID>;
  readonly columnId: ID;
}

export interface IDuplicateTodo {
  readonly todoId: number;
}

export interface IRemoveTodo {
  readonly id: number;
}

export interface IDrawTodoBelow {
  readonly columnId: number;
  readonly belowId: number;
}
