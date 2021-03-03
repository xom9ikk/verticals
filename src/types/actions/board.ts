import {
  EnumTodoType, IBoards, IBoard, IColor, ID,
} from '@type/entities';

export type ISetBoards = IBoards;

export interface ICreateBoard {
  readonly icon: string;
  readonly title: string;
  readonly cardType: EnumTodoType;
  readonly description?: string;
  readonly color?: IColor;
  readonly belowId?: number;
}

export type IAddBoard = IBoard;

export interface IInsertBoard {
  readonly entity: IBoard;
  readonly position: number;
}

export type IUpdateBoard = {
  readonly id: ID;
} & (
  | { readonly title: string }
  | { readonly description: string }
  | { readonly color: IColor }
  | { readonly cardType: EnumTodoType }
  | { readonly icon: string }
);

export interface IMoveBoard {
  readonly sourcePosition: number;
  readonly destinationPosition: number;
}

export type ISetBoardPositions = Array<ID>;

export interface IRemoveBoard {
  readonly id: number;
}

export interface IDrawBoardBelow {
  readonly belowId: number;
}
