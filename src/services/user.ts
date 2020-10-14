import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify.types';
import { IUserService, IHttpClient } from '@/inversify.interfaces';
import {
  IGetMeResponse,
  IUpdateUserRequest, IUpdateUserResponse,
} from '@/types/api';

@injectable()
export class UserService implements IUserService {
  httpClient: IHttpClient;

  constructor(
  @inject(TYPES.HttpClient) httpClient: IHttpClient,
  ) {
    this.httpClient = httpClient;
  }

  getMe() {
    return this.httpClient.get<IGetMeResponse>('/user/me');
  }

  update(body: IUpdateUserRequest) {
    console.log('body', body);
    return this.httpClient.patch<IUpdateUserResponse>('/user', body);
  }
}
