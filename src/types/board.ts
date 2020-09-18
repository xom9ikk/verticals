import { EnumColors } from '@/types/colors';
import { EnumTodoType } from '@/types/todo';

export interface IBoard {
  id: number;
  title: string;
  icon: string;
  position: number;
  cardType: EnumTodoType;
  description?: string;
  color?: EnumColors;
  belowId?: number;
}

export type IBoards = Array<IBoard>;
