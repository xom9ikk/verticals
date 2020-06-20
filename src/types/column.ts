export interface IColumn {
  id: string;
  boardId: string;
  title: string;
  description?: string;
}

export type IColumns = Array<IColumn>;
