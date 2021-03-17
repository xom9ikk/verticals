import {
  IColor, ID, IPositions,
} from '@type/entities';

export interface ITodo {
  readonly id: ID;
  readonly headingId: number;
  readonly title: string;
  readonly description?: string;
  readonly status?: EnumTodoStatus;
  readonly color?: IColor;
  // readonly isArchived?: boolean;
  // readonly isRemoved?: boolean;
  readonly isNotificationsEnabled?: boolean;
  readonly expirationDate?: Date | null;
  readonly belowId?: number;
  readonly commentsCount: number;
  readonly imagesCount: number;
  readonly attachmentsCount: number;
}

export interface ITodos {
  readonly entities: Array<ITodo>;
  readonly positions: IPositions;
}

export enum EnumTodoType {
  Checkboxes,
  Arrows,
  Dots,
  Dashes,
  Nothing,
}

export enum EnumTodoStatus {
  Todo,
  Doing,
  Done,
  Canceled,
}
