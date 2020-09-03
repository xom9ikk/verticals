import { EnumTodoType } from './todo';

export interface IBoard {
  id: string;
  title: string;
  icon: string;
  position: number;
  cardType: EnumTodoType;
  description?: string;
  color?: number;
  belowId?: string;
}

export type IBoards = Array<IBoard>;
