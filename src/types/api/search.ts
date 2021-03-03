import { IServerResponse } from '@type/api/response';
import { IBoards, IColumns, ITodos } from '@type/entities';

export interface ISearchByTodoTitleRequest {
  readonly query: string;
}

export type ISearchByTodoTitleResponse = IServerResponse<{
  readonly todos: ITodos;
  readonly columns: IColumns;
  readonly boards: IBoards;
}>;
