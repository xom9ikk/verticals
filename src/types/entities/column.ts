export interface IColumn {
  id: number;
  boardId: number;
  title: string;
  position: number;
  description?: string;
  color?: number;
  isCollapsed?: boolean;
  belowId?: string;
}

export type IColumns = Array<IColumn>;
