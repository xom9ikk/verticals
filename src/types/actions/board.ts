import { EnumColors, EnumTodoType, IBoards } from '@/types';

export type ISetBoards = IBoards;

export interface ICreateBoard {
  icon: string;
  title: string;
  cardType: EnumTodoType;
  description?: string;
  color?: EnumColors;
  belowId?: number;
}

export interface IAddBoard {
  id: number;
  position: number;
  icon: string;
  cardType: EnumTodoType;
  title?: string;
  description?: string;
  color?: EnumColors;
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
  color: number | null;
}

export interface IUpdateBoardCardType {
  id: number;
  cardType: EnumTodoType;
}

export interface IRemoveBoard {
  id: number;
}

export interface IDrawBoardBelow {
  belowId: number;
}
