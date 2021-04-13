import { inject, injectable } from 'inversify';

import 'reflect-metadata';
import { IHttpClient } from '@inversify/interfaces/httpClient';
import { ITodoService } from '@inversify/interfaces/services';
import { TYPES } from '@inversify/types';
import {
  ICreateTodoRequest,
  ICreateTodoResponse,
  IDuplicateTodoRequest,
  IDuplicateTodoResponse,
  IGetAllTodosResponse,
  IGetRemovedTodosResponse,
  IGetTodosByBoardIdRequest,
  IGetTodosByBoardIdResponse,
  IRemoveTodoRequest,
  IRemoveTodoResponse,
  ISwitchArchivedTodoRequest,
  ISwitchArchivedTodoResponse,
  ISwitchRemovedTodoRequest,
  ISwitchRemovedTodoResponse,
  IUpdateTodoPositionRequest,
  IUpdateTodoPositionResponse,
  IUpdateTodoRequest,
  IUpdateTodoResponse,
} from '@type/api';

@injectable()
export class TodoService implements ITodoService {
  httpClient: IHttpClient;

  constructor(
  @inject(TYPES.HttpClient) httpClient: IHttpClient,
  ) {
    this.httpClient = httpClient;
  }

  getAll() {
    return this.httpClient.get<IGetAllTodosResponse>('/todo');
  }

  getByBoardId(body: IGetTodosByBoardIdRequest) {
    return this.httpClient.get<IGetTodosByBoardIdResponse>('/todo', {
      params: body,
    });
  }

  getRemoved() {
    return this.httpClient.get<IGetRemovedTodosResponse>('/todo/trash');
  }

  create(body: ICreateTodoRequest) {
    return this.httpClient.post<ICreateTodoResponse>('/todo', body);
  }

  remove(body: IRemoveTodoRequest) {
    const { id } = body;
    return this.httpClient.delete<IRemoveTodoResponse>(`/todo/${id}`, body);
  }

  update(body: IUpdateTodoRequest) {
    const { id } = body;
    return this.httpClient.patch<IUpdateTodoResponse>(`/todo/${id}`, body);
  }

  updatePosition(body: IUpdateTodoPositionRequest) {
    return this.httpClient.patch<IUpdateTodoPositionResponse>('/todo/position', body);
  }

  duplicate(body: IDuplicateTodoRequest) {
    return this.httpClient.post<IDuplicateTodoResponse>('/todo/duplicate', body);
  }

  switchArchived(body: ISwitchArchivedTodoRequest) {
    return this.httpClient.post<ISwitchArchivedTodoResponse>('/todo/switch-archived', body);
  }

  switchRemoved(body: ISwitchRemovedTodoRequest) {
    return this.httpClient.post<ISwitchRemovedTodoResponse>('/todo/switch-removed', body);
  }
}
