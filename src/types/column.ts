export interface IColumn {
  id: string;
  boardId: string;
  title: string;
  position: number;
  description?: string;
}

export type IColumns = Array<IColumn>;
