import {
  ISearchByTodoTitleRequest,
  ISearchByTodoTitleResponse,
} from '@/types/api';

export interface ISearchService {
  searchByTodoTitle(body: ISearchByTodoTitleRequest): Promise<ISearchByTodoTitleResponse>;
}
