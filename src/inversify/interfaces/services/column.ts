import {
  ICreateColumnRequest,
  ICreateColumnResponse,
  IDuplicateColumnRequest,
  IDuplicateColumnResponse,
  IGetAllColumnsResponse,
  IGetColumnsByBoardIdRequest,
  IGetColumnsByBoardIdResponse,
  IRemoveColumnRequest,
  IRemoveColumnResponse,
  IReverseColumnOrderRequest,
  IReverseColumnOrderResponse,
  IUpdateColumnPositionRequest,
  IUpdateColumnPositionResponse,
  IUpdateColumnRequest,
  IUpdateColumnResponse,
} from '@type/api';

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
