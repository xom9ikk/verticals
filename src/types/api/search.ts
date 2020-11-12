import { IServerResponse } from '@/types/api/response';
import { IBoards, IColumns, ITodos } from '@/types/entities';

export interface ISearchByTodoTitleRequest {
  query: string;
}

export type ISearchByTodoTitleResponse = IServerResponse<{
  todos: ITodos;
  columns: IColumns;
  boards: IBoards;
}>;
