import {
  ICreateTodoRequest,
  ICreateTodoResponse,
  IDuplicateTodoRequest,
  IDuplicateTodoResponse,
  IGetAllTodosResponse,
  IGetTodosByBoardIdRequest,
  IGetTodosByBoardIdResponse,
  IGetRemovedTodosResponse,
  IRemoveTodoRequest,
  IRemoveTodoResponse,
  IUpdateTodoPositionRequest,
  IUpdateTodoPositionResponse,
  IUpdateTodoRequest,
  IUpdateTodoResponse,
} from '@type/api';

export interface ITodoService {
  getAll(): Promise<IGetAllTodosResponse>;
  getByBoardId(body: IGetTodosByBoardIdRequest): Promise<IGetTodosByBoardIdResponse>;
  getRemoved(): Promise<IGetRemovedTodosResponse>;
  create(body: ICreateTodoRequest): Promise<ICreateTodoResponse>;
  remove(body: IRemoveTodoRequest): Promise<IRemoveTodoResponse>;
  update(body: IUpdateTodoRequest): Promise<IUpdateTodoResponse>;
  updatePosition(body: IUpdateTodoPositionRequest): Promise<IUpdateTodoPositionResponse>;
  duplicate(body: IDuplicateTodoRequest): Promise<IDuplicateTodoResponse>;
}
