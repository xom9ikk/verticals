import {
  EnumTodoType, IBoards, IBoard, IColor, ID,
} from '@type/entities';

export type ISetBoards = IBoards;

export interface ICreateBoard {
  icon: string;
  title: string;
  cardType: EnumTodoType;
  description?: string;
  color?: IColor;
  belowId?: number;
}

export type IAddBoard = IBoard;

export interface IInsertBoard {
  entity: IBoard;
  position: number;
}

export type IUpdateBoard = {
  id: ID;
} & (
  { title: string }
  | { description: string }
  | { color: IColor }
  | { cardType: EnumTodoType }
  | { icon: string }
);

export interface IMoveBoard {
  sourcePosition: number;
  destinationPosition: number;
}

export type ISetBoardPositions = Array<ID>;

export interface IRemoveBoard {
  id: number;
}

export interface IDrawBoardBelow {
  belowId: number;
}
