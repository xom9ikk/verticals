import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../inversify.types';
import { IHttpClient } from '../plugins/httpClient';

export interface IServerResponse<T = {}> {
  message: string
  data: T
}

export interface ISignUpRequest {
  email: string;
  password: string;
  name: string;
  surname: string;
  username: string;
}

export type ISignUpResponse = IServerResponse<{
  token: string;
  refreshToken: string;
}>;

export type ISignInRequest = {
  password: string;
} & ({ username: string } | { email: string });

export type ISignInResponse = IServerResponse<{
  token: string;
  refreshToken: string;
}>;

export interface IAuthService {
  signUp(body: ISignUpRequest): Promise<ISignUpResponse>;
  signIn(body: ISignInRequest): Promise<ISignInResponse>;
}

@injectable()
export class AuthService implements IAuthService {
  httpClient: IHttpClient;

  constructor(
  @inject(TYPES.HttpClient) httpClient: IHttpClient,
  ) {
    this.httpClient = httpClient;
  }

  signUp(body: ISignUpRequest) {
    return this.httpClient.post<ISignUpResponse>('/auth/register', body);
  }

  signIn(body: ISignInRequest) {
    return this.httpClient.post<ISignInResponse>('/auth/login', body);
  }
}
