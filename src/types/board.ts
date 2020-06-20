import { EnumColors } from './colors';

export interface IBoard {
  id: string;
  title: string;
  icon: string;
  description?: string;
  color?: EnumColors;
}

export type IBoards = Array<IBoard>;
