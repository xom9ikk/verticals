import { EnumColors, EnumTodoType } from '@type/entities';

export interface IBoard {
  id: number;
  title: string;
  icon: string;
  position: number;
  cardType: EnumTodoType;
  description?: string;
  color?: EnumColors | null;
  belowId?: number;
}

export type IBoards = Array<IBoard>;
