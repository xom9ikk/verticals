import { EnumColors } from '@type/entities/colors';

export interface IColumn {
  id: number;
  boardId: number;
  title: string;
  position: number;
  description?: string;
  color?: EnumColors | null;
  isCollapsed?: boolean;
  belowId?: number;
}

export type IColumns = Array<IColumn>;
