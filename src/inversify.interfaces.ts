import {
  ILogoutResponse,
  IMeResponse,
  IResetPasswordRequest, IResetPasswordResponse,
  ISignInRequest, ISignInResponse,
  ISignUpRequest, ISignUpResponse,
  ICreateBoardRequest, ICreateBoardResponse,
  IRemoveBoardRequest, IRemoveBoardResponse,
  IUpdateBoardRequest, IUpdateBoardResponse,
  IUpdateBoardPositionRequest, IUpdateBoardPositionResponse, IGetAllBoardsResponse,
} from './types/api';

export interface IHttpClient {
  post: <T>(url: string, options?: Object) => Promise<T>;
  patch: <T>(url: string, options?: Object) => Promise<T>;
  get: <T>(url: string, options?: Object) => Promise<T>;
  put: <T>(url: string, options?: Object) => Promise<T>;
  delete: <T>(url: string, options?: Object) => Promise<T>;
}

export interface IServices {
  authService: IAuthService;
  boardService: IBoardService;
}

export interface IAuthService {
  signUp(body: ISignUpRequest): Promise<ISignUpResponse>;
  signIn(body: ISignInRequest): Promise<ISignInResponse>;
  me(): Promise<IMeResponse>;
  logout(): Promise<ILogoutResponse>;
  reset(body: IResetPasswordRequest): Promise<IResetPasswordResponse>;
}

export interface IBoardService {
  getAll(): Promise<IGetAllBoardsResponse>;
  create(body: ICreateBoardRequest): Promise<ICreateBoardResponse>;
  remove(body: IRemoveBoardRequest): Promise<IRemoveBoardResponse>;
  update(body: IUpdateBoardRequest): Promise<IUpdateBoardResponse>;
  updatePosition(body: IUpdateBoardPositionRequest): Promise<IUpdateBoardPositionResponse>;
}
