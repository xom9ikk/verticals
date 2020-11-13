import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify/types';
import {
  ISearchByTodoTitleRequest,
  ISearchByTodoTitleResponse,
} from '@/types/api';
import { IHttpClient } from '@/inversify/interfaces/httpClient';
import { ISearchService } from '@/inversify/interfaces/services';

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
