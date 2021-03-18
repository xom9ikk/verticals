import { IColor } from '@type/entities/colors';
import { ID, IPositions } from '@type/entities/system';

export interface IHeading {
  readonly id: ID;
  readonly columnId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
  readonly type: EnumHeadingType;
}

export interface IHeadings {
  readonly entities: Array<IHeading>;
  readonly positions: IPositions;
}

export enum EnumHeadingType {
  Default,
  Archived,
  Removed,
  Custom,
}
