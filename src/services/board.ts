import { inject, injectable } from 'inversify';

import 'reflect-metadata';
import { IHttpClient } from '@inversify/interfaces/httpClient';
import { IBoardService } from '@inversify/interfaces/services';
import { TYPES } from '@inversify/types';
import {
  ICreateBoardRequest,
  ICreateBoardResponse,
  IGetAllBoardsResponse,
  IRemoveBoardRequest,
  IRemoveBoardResponse,
  IUpdateBoardPositionRequest,
  IUpdateBoardPositionResponse,
  IUpdateBoardRequest,
  IUpdateBoardResponse,
} from '@type/api';

@injectable()
export class BoardService implements IBoardService {
  httpClient: IHttpClient;

  constructor(
  @inject(TYPES.HttpClient) httpClient: IHttpClient,
  ) {
    this.httpClient = httpClient;
  }

  getAll() {
    return this.httpClient.get<IGetAllBoardsResponse>('/board');
  }

  create(body: ICreateBoardRequest) {
    return this.httpClient.post<ICreateBoardResponse>('/board', body);
  }

  remove(body: IRemoveBoardRequest) {
    const { id } = body;
    return this.httpClient.delete<IRemoveBoardResponse>(`/board/${id}`, body);
  }

  update(body: IUpdateBoardRequest) {
    const { id } = body;
    return this.httpClient.patch<IUpdateBoardResponse>(`/board/${id}`, body);
  }

  updatePosition(body: IUpdateBoardPositionRequest) {
    return this.httpClient.patch<IUpdateBoardPositionResponse>('/board/position', body);
  }
}
