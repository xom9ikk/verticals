import {
  IBoardPositionsUpdateResponse,
  IBoardUpdateResponse,
  IColumnPositionsUpdateResponse,
  IColumnUpdateResponse,
  ICommentAttachmentUpdateResponse,
  ICommentUpdateResponse,
  ITodoPositionsUpdateResponse,
  ITodoUpdateResponse,
} from '@type/api';

export interface IUpdateService {
  openChannel(): void;
  closeChannel(): void;
  onBoardsUpdate(): Promise<IBoardUpdateResponse>;
  onColumnsUpdate(): Promise<IColumnUpdateResponse>;
  onTodosUpdate(): Promise<ITodoUpdateResponse>;
  onBoardPositionsUpdate(): Promise<IBoardPositionsUpdateResponse>;
  onColumnPositionsUpdate(): Promise<IColumnPositionsUpdateResponse>;
  onTodoPositionsUpdate(): Promise<ITodoPositionsUpdateResponse>;
  onCommentsUpdate(): Promise<ICommentUpdateResponse>;
  onCommentAttachmentsUpdate(): Promise<ICommentAttachmentUpdateResponse>;
}
