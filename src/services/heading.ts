import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@inversify/types';
import {
  ICreateHeadingRequest, ICreateHeadingResponse,
  IRemoveHeadingRequest, IRemoveHeadingResponse,
  IUpdateHeadingRequest, IUpdateHeadingResponse,
  IUpdateHeadingPositionRequest, IUpdateHeadingPositionResponse,
  IGetAllHeadingsResponse,
  IGetHeadingsByBoardIdRequest, IGetHeadingsByBoardIdResponse,
  IDuplicateHeadingRequest, IDuplicateHeadingResponse,
} from '@type/api';
import { IHttpClient } from '@inversify/interfaces/httpClient';
import { IHeadingService } from '@inversify/interfaces/services';

@injectable()
export class HeadingService implements IHeadingService {
  httpClient: IHttpClient;

  constructor(
  @inject(TYPES.HttpClient) httpClient: IHttpClient,
  ) {
    this.httpClient = httpClient;
  }

  getAll() {
    return this.httpClient.get<IGetAllHeadingsResponse>('/heading');
  }

  getByBoardId(body: IGetHeadingsByBoardIdRequest) {
    return this.httpClient.get<IGetHeadingsByBoardIdResponse>('/heading', {
      params: body,
    });
  }

  create(body: ICreateHeadingRequest) {
    return this.httpClient.post<ICreateHeadingResponse>('/heading', body);
  }

  remove(body: IRemoveHeadingRequest) {
    const { id } = body;
    return this.httpClient.delete<IRemoveHeadingResponse>(`/heading/${id}`, body);
  }

  update(body: IUpdateHeadingRequest) {
    const { id } = body;
    return this.httpClient.patch<IUpdateHeadingResponse>(`/heading/${id}`, body);
  }

  updatePosition(body: IUpdateHeadingPositionRequest) {
    return this.httpClient.patch<IUpdateHeadingPositionResponse>('/heading/position', body);
  }

  duplicate(body: IDuplicateHeadingRequest) {
    return this.httpClient.post<IDuplicateHeadingResponse>('/heading/duplicate', body);
  }
}
