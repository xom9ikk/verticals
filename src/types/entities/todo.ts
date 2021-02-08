import { EnumColors } from '@type/entities';

export interface ITodo {
  id: number;
  columnId: number;
  title: string;
  position: number;
  description?: string;
  status?: EnumTodoStatus;
  color?: EnumColors | null;
  isArchived?: boolean;
  isNotificationsEnabled?: boolean;
  belowId?: number;
  commentsCount: number;
  imagesCount: number;
  attachmentsCount: number;
}

export type ITodos = Array<ITodo>;

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
