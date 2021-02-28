import {
  IChangePasswordRequest,
  IChangePasswordResponse,
  ILogoutResponse,
  IResetPasswordRequest,
  IResetPasswordResponse,
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
  ISignUpResponse,
} from '@type/api';

export interface IAuthService {
  signUp(body: ISignUpRequest): Promise<ISignUpResponse>;
  signIn(body: ISignInRequest): Promise<ISignInResponse>;
  logout(): Promise<ILogoutResponse>;
  reset(body: IResetPasswordRequest): Promise<IResetPasswordResponse>;
  change(body: IChangePasswordRequest): Promise<IChangePasswordResponse>;
}
