import {
  ILogoutResponse,
  IMeResponse,
  ISignInRequest, ISignInResponse,
  ISignUpRequest, ISignUpResponse,
} from './types/api';

export interface IHttpClient {
  post: <T>(url: string, options?: Object) => Promise<T>;
  patch: <T>(url: string, options?: Object) => Promise<T>;
  get: <T>(url: string, options?: Object) => Promise<T>;
  put: <T>(url: string, options?: Object) => Promise<T>;
  delete: <T>(url: string, options?: Object) => Promise<T>;
}

export interface IServices {
  auth: IAuthService
}

export interface IAuthService {
  signUp(body: ISignUpRequest): Promise<ISignUpResponse>;
  signIn(body: ISignInRequest): Promise<ISignInResponse>;
  me(): Promise<IMeResponse>;
  logout(): Promise<ILogoutResponse>;
}
