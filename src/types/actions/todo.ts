import {
  EnumTodoStatus, IColor, ID, ITodo, ITodos,
} from '@type/entities';

export interface IFetchTodosByBoardId {
  readonly boardId: number;
}

export type ISetTodos = ITodos;

export interface ICreateTodo {
  readonly headingId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly status?: EnumTodoStatus;
  readonly belowId?: number;
  readonly expirationDate?: Date | null;
  readonly files?: FileList | null;
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
  | { readonly isNotificationsEnabled: boolean }
  | { readonly expirationDate: Date | null }
);

export interface IMoveTodo {
  readonly sourcePosition: number;
  readonly destinationPosition: number;
  readonly headingId: number;
  readonly targetHeadingId?: number;
}

export interface ISetTodoPositionsByHeadingId {
  readonly positions: Array<ID>;
  readonly headingId: ID;
}

export interface IDuplicateTodo {
  readonly todoId: number;
}

export interface ISwitchArchivedTodo {
  readonly todoId: number;
}

export interface ISwitchRemovedTodo {
  readonly todoId: number;
}

export interface IRemoveTodo {
  readonly id: number;
}

export interface IDrawTodoBelow {
  readonly headingId: number;
  readonly belowId: number;
}
