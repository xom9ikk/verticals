import { ITodo } from '@/types/entities/todo';

export interface IColumn {
  id: number;
  boardId: number;
  title: string;
  position: number;
  description?: string;
  color?: number;
  isCollapsed?: boolean;
  belowId?: number;
}

export type IColumns = Array<IColumn>;

export interface ColumnsMap {
  [key: string]: {
    todos: ITodo[],
    title: string;
    description?: string;
    color?: number;
    isCollapsed?: boolean;
    belowId?: number;
  },
}
