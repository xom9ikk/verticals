import {
  ICreateHeadingRequest,
  ICreateHeadingResponse,
  IDuplicateHeadingRequest,
  IDuplicateHeadingResponse,
  IGetAllHeadingsResponse,
  IGetHeadingsByBoardIdRequest,
  IGetHeadingsByBoardIdResponse,
  IRemoveHeadingRequest,
  IRemoveHeadingResponse,
  IUpdateHeadingPositionRequest,
  IUpdateHeadingPositionResponse,
  IUpdateHeadingRequest,
  IUpdateHeadingResponse,
} from '@type/api';

export interface IHeadingService {
  getAll(): Promise<IGetAllHeadingsResponse>;
  getByBoardId(body: IGetHeadingsByBoardIdRequest): Promise<IGetHeadingsByBoardIdResponse>;
  create(body: ICreateHeadingRequest): Promise<ICreateHeadingResponse>;
  remove(body: IRemoveHeadingRequest): Promise<IRemoveHeadingResponse>;
  update(body: IUpdateHeadingRequest): Promise<IUpdateHeadingResponse>;
  updatePosition(body: IUpdateHeadingPositionRequest): Promise<IUpdateHeadingPositionResponse>;
  duplicate(body: IDuplicateHeadingRequest): Promise<IDuplicateHeadingResponse>;
}
