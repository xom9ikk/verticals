import { IColor } from '@type/entities/colors';
import { ID, IPositions } from '@type/entities/system';

export interface IColumn {
  id: ID;
  boardId: number;
  title: string;
  description?: string;
  color?: IColor;
  isCollapsed?: boolean;
  belowId?: number;
  width?: number | null;
}

export interface IColumns {
  entities: Array<IColumn>;
  positions: IPositions;
}
