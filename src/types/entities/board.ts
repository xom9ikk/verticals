import {
  EnumTodoType, IColor, ID,
} from '@type/entities';

export interface IBoard {
  id: ID;
  title: string;
  icon: string;
  cardType: EnumTodoType;
  description?: string;
  color?: IColor;
  belowId?: number;
}

export interface IBoards {
  entities: Array<IBoard>;
  positions: Array<ID>;
}
