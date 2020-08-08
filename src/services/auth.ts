import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { AxiosInstance, AxiosResponse } from 'axios';
import { TYPES } from '../inversify.types';

export interface IServerResponse<T = {}> {
  message: string
  data: T
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
  surname: string;
  username: string;
}

export type IRegisterResponse = IServerResponse<{
  token: string;
  refreshToken: string;
}>;

export interface IAuthService {
  signUp(body: IRegisterRequest): Promise<AxiosResponse<IRegisterResponse>>;
}

@injectable()
export class AuthService implements IAuthService {
  client: AxiosInstance;

  constructor(
  @inject(TYPES.HttpClient) client: AxiosInstance,
  ) {
    this.client = client;
    console.log('services AuthService', this);
  }

  signUp(body: IRegisterRequest) {
    console.log('services signUp', body, this);
    return this.client.post<IRegisterResponse>('/auth/register', body);
  }
}
