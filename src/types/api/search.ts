import { IServerResponse } from '@type/api/response';
import {
  IBoards, IColumns, IHeadings, ITodos,
} from '@type/entities';

export interface ISearchByTodoTitleRequest {
  readonly query: string;
}

export type ISearchByTodoTitleResponse = IServerResponse<{
  readonly todos: ITodos;
  readonly headings: IHeadings;
  readonly columns: IColumns;
  readonly boards: IBoards;
}>;
