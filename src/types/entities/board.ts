import { EnumColors, EnumTodoType } from '@/types/entities';

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
