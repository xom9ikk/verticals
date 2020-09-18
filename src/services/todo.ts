import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify.types';
import { ITodoService, IHttpClient } from '@/inversify.interfaces';
import {
  ICreateTodoRequest, ICreateTodoResponse,
  IRemoveTodoRequest, IRemoveTodoResponse,
  IUpdateTodoRequest, IUpdateTodoResponse,
  IUpdateTodoPositionRequest, IUpdateTodoPositionResponse,
  IGetAllTodosResponse,
  IGetTodosByBoardIdRequest, IGetTodosByBoardIdResponse,
  IDuplicateTodoRequest, IDuplicateTodoResponse,
} from '@/types/api';

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
}
