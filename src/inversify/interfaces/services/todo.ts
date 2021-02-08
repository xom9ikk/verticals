import {
  ICreateTodoRequest,
  ICreateTodoResponse,
  IDuplicateTodoRequest,
  IDuplicateTodoResponse,
  IGetAllTodosResponse,
  IGetTodosByBoardIdRequest,
  IGetTodosByBoardIdResponse,
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
  create(body: ICreateTodoRequest): Promise<ICreateTodoResponse>;
  remove(body: IRemoveTodoRequest): Promise<IRemoveTodoResponse>;
  update(body: IUpdateTodoRequest): Promise<IUpdateTodoResponse>;
  updatePosition(body: IUpdateTodoPositionRequest): Promise<IUpdateTodoPositionResponse>;
  duplicate(body: IDuplicateTodoRequest): Promise<IDuplicateTodoResponse>;
}
