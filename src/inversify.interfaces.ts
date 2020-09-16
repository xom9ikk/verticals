import {
  ILogoutResponse,
  IMeResponse,
  IGetAllColumnsResponse,
  IGetAllBoardsResponse,
  IResetPasswordRequest, IResetPasswordResponse,
  ISignInRequest, ISignInResponse,
  ISignUpRequest, ISignUpResponse,
  ICreateBoardRequest, ICreateBoardResponse,
  IRemoveBoardRequest, IRemoveBoardResponse,
  IUpdateBoardRequest, IUpdateBoardResponse,
  IUpdateBoardPositionRequest, IUpdateBoardPositionResponse,
  ICreateColumnRequest, ICreateColumnResponse,
  IRemoveColumnRequest, IRemoveColumnResponse,
  IUpdateColumnRequest, IUpdateColumnResponse,
  IUpdateColumnPositionRequest, IUpdateColumnPositionResponse,
  IGetColumnsByBoardIdResponse, IGetColumnsByBoardIdRequest,
  IDuplicateColumnRequest, IDuplicateColumnResponse,
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
  columnService: IColumnService;
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

export interface IColumnService {
  getAll(): Promise<IGetAllColumnsResponse>;
  getByBoardId(body: IGetColumnsByBoardIdRequest): Promise<IGetColumnsByBoardIdResponse>;
  create(body: ICreateColumnRequest): Promise<ICreateColumnResponse>;
  remove(body: IRemoveColumnRequest): Promise<IRemoveColumnResponse>;
  update(body: IUpdateColumnRequest): Promise<IUpdateColumnResponse>;
  updatePosition(body: IUpdateColumnPositionRequest): Promise<IUpdateColumnPositionResponse>;
  duplicate(body: IDuplicateColumnRequest): Promise<IDuplicateColumnResponse>;
}
