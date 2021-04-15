import {
  EnumTodoStatus, IColor, ID, ISubTodo, ISubTodos,
} from '@type/entities';

export interface IFetchSubTodosByBoardId {
  readonly boardId: number;
}

export type ISetSubTodos = ISubTodos;

export interface ICreateSubTodo {
  readonly todoId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly status?: EnumTodoStatus;
  readonly belowId?: number;
  readonly expirationDate?: Date | null;
  readonly files?: FormData;
}

export type IAddSubTodo = ISubTodo;

export interface IInsertSubTodo {
  readonly entity: ISubTodo;
  readonly position: number;
}

export type IUpdateSubTodo = {
  readonly id: number;
} & (
  | { readonly title: string }
  | { readonly description: string }
  | { readonly status: EnumTodoStatus }
  | { readonly color: IColor }
  | { readonly isNotificationsEnabled: boolean }
  | { readonly expirationDate: Date | null }
);

export interface IMoveSubTodo {
  readonly sourcePosition: number;
  readonly destinationPosition: number;
  readonly todoId: number;
  readonly targetTodoId?: number;
}

export interface ISetSubTodoPositionsByTodoId {
  readonly positions: Array<ID>;
  readonly todoId: ID;
}

export interface IDuplicateSubTodo {
  readonly subTodoId: number;
}

export interface IRemoveSubTodo {
  readonly id: number;
}

export interface IDrawSubTodoBelow {
  readonly todoId: number;
  readonly belowId: number;
}

export interface IDrawSubTodoOnTop {
  readonly todoId: number;
}
