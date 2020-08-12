import { IBoards } from '../board';
import { EnumTodoType } from '../todo';

export type ISetBoards = IBoards;

export interface IAddBoard {
  icon: string;
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
  color: number;
}

export interface IResetBoardColor {
  id: string;
}

export interface IUpdateBoardCardType {
  id: string;
  cardType: EnumTodoType;
}

export interface IRemoveBoard {
  id: string;
}

export interface IAddBoardBelow {
  id: string;
}

export interface IGenerateNewBoardId {
  id: string;
}
