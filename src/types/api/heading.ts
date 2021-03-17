import {
  IColor, IHeadings, ITodos,
} from '@type/entities';
import { IServerResponse } from './response';

export type IGetAllHeadingsResponse = IServerResponse<{
  readonly headings: IHeadings;
}>;

export interface IGetHeadingsByBoardIdRequest {
  readonly boardId: number;
}

export type IGetHeadingsByBoardIdResponse = IServerResponse<{
  readonly headings: IHeadings;
}>;

export interface ICreateHeadingRequest {
  readonly columnId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
  readonly belowId?: number;
  readonly width?: number;
}

export type ICreateHeadingResponse = IServerResponse<{
  readonly headingId: number;
  readonly position: number;
}>;

export interface IRemoveHeadingRequest {
  readonly id: number;
}

export type IRemoveHeadingResponse = IServerResponse;

export interface IUpdateHeadingRequest {
  readonly id: number;
  readonly title?: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
  readonly width?: number;
}

export type IUpdateHeadingResponse = IServerResponse;

export interface IUpdateHeadingPositionRequest {
  readonly sourcePosition: number;
  readonly destinationPosition: number;
  readonly columnId: number;
  readonly targetColumnId?: number;
}

export type IUpdateHeadingPositionResponse = IServerResponse;

export interface IDuplicateHeadingRequest {
  readonly headingId: number;
}

export type IDuplicateHeadingResponse = IServerResponse<{
  readonly headingId: number;
  readonly position: number;
  readonly columnId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
  readonly todos: ITodos;
}>;
