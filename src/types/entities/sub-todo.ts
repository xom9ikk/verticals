import {
  EnumTodoStatus,
  IColor, ID, IPositions,
} from '@type/entities';

export interface ISubTodo {
  readonly id: ID;
  readonly todoId: number;
  readonly title: string;
  readonly description?: string;
  readonly status?: EnumTodoStatus;
  readonly color?: IColor;
  readonly isNotificationsEnabled?: boolean;
  readonly expirationDate?: Date | null;
  readonly belowId?: number;
  readonly commentsCount: number;
  readonly imagesCount: number;
  readonly attachmentsCount: number;
}

export interface ISubTodos {
  readonly entities: Array<ISubTodo>;
  readonly positions: IPositions;
}
