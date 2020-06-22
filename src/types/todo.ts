export interface ITodo {
  id: string;
  columnId: string;
  title: string;
  position: number;
  description?: string;
  isDone?: boolean;
  color?: number;
}

export type ITodos = Array<ITodo>;
