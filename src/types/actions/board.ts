import {
  EnumColors, EnumTodoType, IBoards, IBoard,
} from '@type/entities';

export type ISetBoards = IBoards;

export interface ICreateBoard {
  icon: string;
  title: string;
  cardType: EnumTodoType;
  description?: string;
  color?: EnumColors;
  belowId?: number;
}

export type IAddBoard = IBoard;

export interface IInsertBoard {
  entity: IBoard;
  position: number;
}

export interface IUpdateBoardTitle {
  id: number;
  title: string;
}

export interface IUpdateBoardDescription {
  id: number;
  description: string;
}

export interface IUpdateBoardPosition {
  sourcePosition: number;
  destinationPosition: number;
}

export interface IUpdateBoardColor {
  id: number;
  color: EnumColors | null;
}

export interface IUpdateBoardCardType {
  id: number;
  cardType: EnumTodoType;
}

export interface IUpdateBoardIcon {
  id: number;
  icon: string;
}

export interface IRemoveBoard {
  id: number;
}

export interface IDrawBoardBelow {
  belowId: number;
}
