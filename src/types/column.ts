export interface IColumn {
  id: string;
  boardId: string;
  title: string;
  position: number;
  description?: string;
  color?: number;
}

export type IColumns = Array<IColumn>;
