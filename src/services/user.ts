import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify.types';
import { IUserService, IHttpClient } from '@/inversify.interfaces';
import { IGetMeResponse } from '@/types/api';

@injectable()
export class UserService implements IUserService {
  httpClient: IHttpClient;

  constructor(
  @inject(TYPES.HttpClient) httpClient: IHttpClient,
  ) {
    this.httpClient = httpClient;
  }

  getMe() {
    return this.httpClient.get<IGetMeResponse>('/auth/me');
  }
}
