import { inject, injectable } from 'inversify';

import 'reflect-metadata';
import { IHttpClient } from '@inversify/interfaces/httpClient';
import { ISubTodoService } from '@inversify/interfaces/services';
import { TYPES } from '@inversify/types';
import {
  ICreateSubTodoRequest,
  ICreateSubTodoResponse,
  IDuplicateSubTodoRequest,
  IDuplicateSubTodoResponse,
  IGetAllSubTodosResponse,
  IGetRemovedSubTodosResponse,
  IGetSubTodosByBoardIdRequest,
  IGetSubTodosByBoardIdResponse,
  IRemoveSubTodoRequest,
  IRemoveSubTodoResponse,
  IUpdateSubTodoPositionRequest,
  IUpdateSubTodoPositionResponse,
  IUpdateSubTodoRequest,
  IUpdateSubTodoResponse,
} from '@type/api';

@injectable()
export class SubTodoService implements ISubTodoService {
  httpClient: IHttpClient;

  constructor(
  @inject(TYPES.HttpClient) httpClient: IHttpClient,
  ) {
    this.httpClient = httpClient;
  }

  getAll() {
    return this.httpClient.get<IGetAllSubTodosResponse>('/sub-todo');
  }

  getByBoardId(body: IGetSubTodosByBoardIdRequest) {
    return this.httpClient.get<IGetSubTodosByBoardIdResponse>('/sub-todo', {
      params: body,
    });
  }

  getRemoved() {
    return this.httpClient.get<IGetRemovedSubTodosResponse>('/sub-todo/trash');
  }

  create(body: ICreateSubTodoRequest) {
    return this.httpClient.post<ICreateSubTodoResponse>('/sub-todo', body);
  }

  remove(body: IRemoveSubTodoRequest) {
    const { id } = body;
    return this.httpClient.delete<IRemoveSubTodoResponse>(`/sub-todo/${id}`, body);
  }

  update(body: IUpdateSubTodoRequest) {
    const { id } = body;
    return this.httpClient.patch<IUpdateSubTodoResponse>(`/sub-todo/${id}`, body);
  }

  updatePosition(body: IUpdateSubTodoPositionRequest) {
    return this.httpClient.patch<IUpdateSubTodoPositionResponse>('/sub-todo/position', body);
  }

  duplicate(body: IDuplicateSubTodoRequest) {
    return this.httpClient.post<IDuplicateSubTodoResponse>('/sub-todo/duplicate', body);
  }
}
