import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify.types';
import { IColumnService, IHttpClient } from '@/inversify.interfaces';
import {
  ICreateColumnRequest, ICreateColumnResponse,
  IRemoveColumnRequest, IRemoveColumnResponse,
  IUpdateColumnRequest, IUpdateColumnResponse,
  IUpdateColumnPositionRequest, IUpdateColumnPositionResponse,
  IGetAllColumnsResponse,
  IGetColumnsByBoardIdRequest, IGetColumnsByBoardIdResponse,
  IDuplicateColumnRequest, IDuplicateColumnResponse,
  IReverseColumnOrderRequest, IReverseColumnOrderResponse,
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

  getByBoardId(body: IGetColumnsByBoardIdRequest) {
    return this.httpClient.get<IGetColumnsByBoardIdResponse>('/column', {
      params: body,
    });
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

  duplicate(body: IDuplicateColumnRequest) {
    return this.httpClient.post<IDuplicateColumnResponse>('/column/duplicate', body);
  }

  reverseOrder(body: IReverseColumnOrderRequest) {
    return this.httpClient.post<IReverseColumnOrderResponse>('/column/reverse', body);
  }
}
