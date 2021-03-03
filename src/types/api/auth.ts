import { IServerResponse } from './response';

export interface ISignUpRequest {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly surname: string;
  readonly username: string;
}

export type ISignUpResponse = IServerResponse<{
  readonly token: string;
  readonly refreshToken: string;
}>;

export type ISignInRequest = {
  readonly password: string;
} & ({ readonly username: string } | { readonly email: string });

export type ISignInResponse = IServerResponse<{
  readonly token: string;
  readonly refreshToken: string;
}>;

export type IRefreshResponse = IServerResponse<{
  readonly token: string;
  readonly refreshToken: string;
}>;

export type ILogoutResponse = IServerResponse;

export interface IResetPasswordRequest {
  readonly email: string;
}

export type IResetPasswordResponse = IServerResponse;

export interface IChangePasswordRequest {
  readonly oldPassword: string;
  readonly newPassword: string;
}

export type IChangePasswordResponse = IServerResponse;
