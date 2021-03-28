import {
  EnumCardType, IColor, ID,
} from '@type/entities';

export interface IBoard {
  readonly id: ID;
  readonly title: string;
  readonly icon: string;
  readonly cardType: EnumCardType;
  readonly description?: string;
  readonly color?: IColor;
  readonly belowId?: number;
}

export interface IBoards {
  readonly entities: Array<IBoard>;
  readonly positions: Array<ID>;
}
