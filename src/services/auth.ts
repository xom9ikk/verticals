import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../inversify.types';
import {
  IMeResponse,
  ISignInRequest, ISignInResponse,
  ISignUpRequest, ISignUpResponse,
} from '../types/api';
import { IAuthService, IHttpClient } from '../inversify.interfaces';

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

  me() {
    return this.httpClient.get<IMeResponse>('/auth/me');
  }
}
