import { EnumTodoType } from './todo';

export interface IBoard {
  id: number;
  title: string;
  icon: string;
  position: number;
  cardType: EnumTodoType;
  description?: string;
  color?: number;
  belowId?: number;
}

export type IBoards = Array<IBoard>;
