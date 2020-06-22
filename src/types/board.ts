
export interface IBoard {
  id: string;
  title: string;
  icon: string;
  position: number;
  description?: string;
  color?: number;
}

export type IBoards = Array<IBoard>;
