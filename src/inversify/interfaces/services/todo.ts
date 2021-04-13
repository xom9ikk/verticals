import {
  ICreateTodoRequest,
  ICreateTodoResponse,
  IDuplicateTodoRequest,
  IDuplicateTodoResponse,
  IGetAllTodosResponse,
  IGetRemovedTodosResponse,
  IGetTodosByBoardIdRequest,
  IGetTodosByBoardIdResponse,
  IRemoveTodoRequest,
  IRemoveTodoResponse,
  ISwitchArchivedTodoRequest,
  ISwitchArchivedTodoResponse,
  ISwitchRemovedTodoRequest,
  ISwitchRemovedTodoResponse,
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
  switchArchived(body: ISwitchArchivedTodoRequest): Promise<ISwitchArchivedTodoResponse>;
  switchRemoved(body: ISwitchRemovedTodoRequest): Promise<ISwitchRemovedTodoResponse>;
}
