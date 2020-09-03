import { EnumTodoType, IBoards } from '@/types';

export type ISetBoards = IBoards;

export interface ICreateBoard {
  title: string;
  icon: string;
  cardType: EnumTodoType;
  description?: string;
  belowId?: string;
}

export interface IAddBoard {
  id: number;
  icon: string;
  position: number;
  cardType: EnumTodoType;
  title?: string;
  description?: string;
}

export interface IUpdateBoardTitle {
  id: string;
  title: string;
}

export interface IUpdateBoardDescription {
  id: string;
  description: string;
}

export interface IUpdateBoardPosition {
  sourcePosition: number;
  destinationPosition: number;
}

export interface IUpdateBoardColor {
  id: string;
  color: number | null;
}

export interface IUpdateBoardCardType {
  id: string;
  cardType: EnumTodoType;
}

export interface IRemoveBoard {
  id: string;
}

export interface IDrawBoardBelow {
  id: string;
}

export interface IGenerateNewBoardId {
  id: string;
}
