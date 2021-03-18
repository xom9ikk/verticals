import {
  IBoardPositionsUpdateResponse,
  IBoardUpdateResponse,
  IColumnPositionsUpdateResponse,
  IHeadingPositionsUpdateResponse,
  IColumnUpdateResponse,
  IHeadingUpdateResponse,
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
  onHeadingsUpdate(): Promise<IHeadingUpdateResponse>;
  onTodosUpdate(): Promise<ITodoUpdateResponse>;
  onBoardPositionsUpdate(): Promise<IBoardPositionsUpdateResponse>;
  onColumnPositionsUpdate(): Promise<IColumnPositionsUpdateResponse>;
  onHeadingPositionsUpdate(): Promise<IHeadingPositionsUpdateResponse>;
  onTodoPositionsUpdate(): Promise<ITodoPositionsUpdateResponse>;
  onCommentsUpdate(): Promise<ICommentUpdateResponse>;
  onCommentAttachmentsUpdate(): Promise<ICommentAttachmentUpdateResponse>;
}
