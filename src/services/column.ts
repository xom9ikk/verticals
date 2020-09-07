import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify.types';
import { IColumnService, IHttpClient } from '@/inversify.interfaces';
import {
  ICreateColumnRequest, ICreateColumnResponse,
  IRemoveColumnRequest, IRemoveColumnResponse,
  IUpdateColumnRequest, IUpdateColumnResponse,
  IUpdateColumnPositionRequest, IUpdateColumnPositionResponse, IGetAllColumnsResponse,
} from '@/types/api';

@injectable()
export class ColumnService implements IColumnService {
  httpClient: IHttpClient;

  constructor(
  @inject(TYPES.HttpClient) httpClient: IHttpClient,
  ) {
    this.httpClient = httpClient;
  }

  getAll() {
    return this.httpClient.get<IGetAllColumnsResponse>('/column');
  }

  create(body: ICreateColumnRequest) {
    return this.httpClient.post<ICreateColumnResponse>('/column', body);
  }

  remove(body: IRemoveColumnRequest) {
    const { id } = body;
    return this.httpClient.delete<IRemoveColumnResponse>(`/column/${id}`, body);
  }

  update(body: IUpdateColumnRequest) {
    const { id } = body;
    return this.httpClient.patch<IUpdateColumnResponse>(`/column/${id}`, body);
  }

  updatePosition(body: IUpdateColumnPositionRequest) {
    return this.httpClient.patch<IUpdateColumnPositionResponse>('/column/position', body);
  }
}
