import {
  ICreateBoardRequest,
  ICreateBoardResponse,
  IGetAllBoardsResponse,
  IRemoveBoardRequest,
  IRemoveBoardResponse,
  IUpdateBoardPositionRequest,
  IUpdateBoardPositionResponse,
  IUpdateBoardRequest,
  IUpdateBoardResponse,
} from '@type/api';

export interface IBoardService {
  getAll(): Promise<IGetAllBoardsResponse>;
  create(body: ICreateBoardRequest): Promise<ICreateBoardResponse>;
  remove(body: IRemoveBoardRequest): Promise<IRemoveBoardResponse>;
  update(body: IUpdateBoardRequest): Promise<IUpdateBoardResponse>;
  updatePosition(body: IUpdateBoardPositionRequest): Promise<IUpdateBoardPositionResponse>;
}
