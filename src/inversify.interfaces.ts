import {
  ILogoutResponse,
  IMeResponse,
  IGetAllColumnsResponse,
  IGetAllBoardsResponse,
  IGetAllTodosResponse,
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
  IGetColumnsByBoardIdRequest, IGetColumnsByBoardIdResponse,
  IDuplicateColumnRequest, IDuplicateColumnResponse,
  IGetTodosByBoardIdRequest, IGetTodosByBoardIdResponse,
  ICreateTodoRequest, ICreateTodoResponse,
  IRemoveTodoRequest, IRemoveTodoResponse,
  IUpdateTodoRequest, IUpdateTodoResponse,
  IUpdateTodoPositionRequest, IUpdateTodoPositionResponse,
  IDuplicateTodoRequest, IDuplicateTodoResponse,
  IReverseColumnOrderRequest, IReverseColumnOrderResponse,
  IGetMeResponse,
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
  todoService: ITodoService;
  userService: IUserService;
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
  reverseOrder(body: IReverseColumnOrderRequest): Promise<IReverseColumnOrderResponse>;
}

export interface ITodoService {
  getAll(): Promise<IGetAllTodosResponse>;
  getByBoardId(body: IGetTodosByBoardIdRequest): Promise<IGetTodosByBoardIdResponse>;
  create(body: ICreateTodoRequest): Promise<ICreateTodoResponse>;
  remove(body: IRemoveTodoRequest): Promise<IRemoveTodoResponse>;
  update(body: IUpdateTodoRequest): Promise<IUpdateTodoResponse>;
  updatePosition(body: IUpdateTodoPositionRequest): Promise<IUpdateTodoPositionResponse>;
  duplicate(body: IDuplicateTodoRequest): Promise<IDuplicateTodoResponse>;
}

export interface IUserService {
  getMe(): Promise<IGetMeResponse>;
}
