export interface IColumn {
  id: string;
  boardId: string;
  title: string;
  position: number;
  description?: string;
  color?: number;
  isCollapsed?: boolean;
}

export type IColumns = Array<IColumn>;
