import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify.types';
import { ISearchService, IHttpClient } from '@/inversify.interfaces';
import {
  ISearchByTodoTitleRequest,
  ISearchByTodoTitleResponse,
} from '@/types/api';

@injectable()
export class SearchService implements ISearchService {
  httpClient: IHttpClient;

  constructor(
  @inject(TYPES.HttpClient) httpClient: IHttpClient,
  ) {
    this.httpClient = httpClient;
  }

  searchByTodoTitle(body: ISearchByTodoTitleRequest) {
    return this.httpClient.get<ISearchByTodoTitleResponse>('/search/todo', {
      params: body,
    });
  }
}
