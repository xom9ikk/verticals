import { IServerResponse } from '@type/api/response';
import { IBoards, IColumns, ITodos } from '@type/entities';

export interface ISearchByTodoTitleRequest {
  query: string;
}

export type ISearchByTodoTitleResponse = IServerResponse<{
  todos: ITodos;
  columns: IColumns;
  boards: IBoards;
}>;
