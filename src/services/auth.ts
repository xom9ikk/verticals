import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify.types';
import { IAuthService, IHttpClient } from '@/inversify.interfaces';
import {
  ILogoutResponse,
  IResetPasswordRequest, IResetPasswordResponse,
  ISignInRequest, ISignInResponse,
  ISignUpRequest, ISignUpResponse,
} from '../types/api';

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

  logout() {
    return this.httpClient.post<ILogoutResponse>('/auth/logout');
  }

  reset(body: IResetPasswordRequest) {
    return this.httpClient.post<IResetPasswordResponse>('/auth/reset', body);
  }
}
