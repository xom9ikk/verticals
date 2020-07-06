export interface ITodo {
  id: string;
  columnId: string;
  title: string;
  position: number;
  description?: string;
  status?: EnumTodoStatus;
  color?: number;
  isArchive?: boolean;
}

export type ITodos = Array<ITodo>;

export enum EnumTodoType {
  Checkboxes,
  Arrows,
  Dots,
  Dashes,
  Nothing,
}

export enum EnumTodoStatus {
  Todo,
  Doing,
  Done,
}
