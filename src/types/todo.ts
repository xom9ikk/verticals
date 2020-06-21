import { EnumColors } from './colors';

export interface ITodo {
  id: string;
  columnId: string;
  title: string;
  position: number;
  description?: string;
  isDone?: boolean;
  color?: EnumColors;
}

export type ITodos = Array<ITodo>;
