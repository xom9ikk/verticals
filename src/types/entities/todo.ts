import {
  IColor, ID, IPositions,
} from '@type/entities';

export interface ITodo {
  id: ID;
  columnId: number;
  title: string;
  description?: string;
  status?: EnumTodoStatus;
  color?: IColor;
  isArchived?: boolean;
  isRemoved?: boolean;
  isNotificationsEnabled?: boolean;
  expirationDate?: Date | null;
  belowId?: number;
  commentsCount: number;
  imagesCount: number;
  attachmentsCount: number;
}

export interface ITodos {
  entities: Array<ITodo>;
  positions: IPositions;
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
