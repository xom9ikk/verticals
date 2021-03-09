import { IColor } from '@type/entities/colors';
import { ID, IPositions } from '@type/entities/system';

export interface IColumn {
  readonly id: ID;
  readonly boardId: number;
  readonly title: string;
  readonly description?: string;
  readonly color?: IColor;
  readonly isCollapsed?: boolean;
  readonly belowId?: number;
  readonly width?: number | null;
}

export interface IColumns {
  readonly entities: Array<IColumn>;
  readonly positions: IPositions;
}
