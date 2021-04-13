import {
  IColor, ID, IHeading, IHeadings,
} from '@type/entities';

export interface IFetchHeadingsByBoardId {
  readonly boardId: number;
}

export type ISetHeadings = IHeadings;

export interface ICreateHeading {
  readonly columnId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
}

export type IAddHeading = IHeading;

export interface IInsertHeading {
  readonly entity: IHeading;
  readonly position: number;
}

export type IUpdateHeading = {
  readonly id: number;
} & (
  | { readonly title: string }
  | { readonly description: string }
  | { readonly color: IColor }
  | { readonly isCollapsed: boolean }
);

export interface IMoveHeading {
  readonly sourcePosition: number;
  readonly destinationPosition: number;
  readonly columnId: number;
  readonly targetColumnId?: number;
}

export interface ISetHeadingPositionsByColumnId {
  readonly positions: Array<ID>;
  readonly columnId: ID;
}

export interface IRemoveHeading {
  readonly id: number;
}

export interface IDuplicateHeading {
  readonly headingId: number;
}
