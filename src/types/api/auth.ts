import { IServerResponse } from './response';

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

export type IRefreshResponse = IServerResponse<{
  token: string;
  refreshToken: string;
}>;

export type IMeResponse = IServerResponse<{
  email: string;
  name: string;
  surname: string;
  username: string;
}>;

export type ILogoutResponse = IServerResponse;

export interface IResetPasswordRequest {
  email: string;
}

export type IResetPasswordResponse = IServerResponse<{}>;
