import {
  ICreateSubTodoRequest,
  ICreateSubTodoResponse,
  IDuplicateSubTodoRequest,
  IDuplicateSubTodoResponse,
  IGetAllSubTodosResponse,
  IGetSubTodosByBoardIdRequest,
  IGetSubTodosByBoardIdResponse,
  IGetRemovedSubTodosResponse,
  IRemoveSubTodoRequest,
  IRemoveSubTodoResponse,
  IUpdateSubTodoPositionRequest,
  IUpdateSubTodoPositionResponse,
  IUpdateSubTodoRequest,
  IUpdateSubTodoResponse,
} from '@type/api';

export interface ISubTodoService {
  getAll(): Promise<IGetAllSubTodosResponse>;
  getByBoardId(body: IGetSubTodosByBoardIdRequest): Promise<IGetSubTodosByBoardIdResponse>;
  getRemoved(): Promise<IGetRemovedSubTodosResponse>;
  create(body: ICreateSubTodoRequest): Promise<ICreateSubTodoResponse>;
  remove(body: IRemoveSubTodoRequest): Promise<IRemoveSubTodoResponse>;
  update(body: IUpdateSubTodoRequest): Promise<IUpdateSubTodoResponse>;
  updatePosition(body: IUpdateSubTodoPositionRequest): Promise<IUpdateSubTodoPositionResponse>;
  duplicate(body: IDuplicateSubTodoRequest): Promise<IDuplicateSubTodoResponse>;
}
