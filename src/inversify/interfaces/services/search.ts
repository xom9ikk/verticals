import {
  ISearchByTodoTitleRequest,
  ISearchByTodoTitleResponse,
} from '@type/api';

export interface ISearchService {
  searchByTodoTitle(body: ISearchByTodoTitleRequest): Promise<ISearchByTodoTitleResponse>;
}
