import { EnumColors } from '@/types/colors';

export interface ITodo {
  id: number;
  columnId: number;
  title: string;
  position: number;
  description?: string;
  status?: EnumTodoStatus;
  color?: EnumColors;
  isArchive?: boolean;
  isNotificationsEnabled?: boolean;
  belowId?: number;
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
}
