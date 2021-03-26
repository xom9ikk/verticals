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
  ISubTodoPositionsUpdateResponse,
  ISubTodoUpdateResponse,
} from '@type/api';

export interface IUpdateService {
  openChannel(): void;
  closeChannel(): void;
  onBoardsUpdate(): Promise<IBoardUpdateResponse>;
  onColumnsUpdate(): Promise<IColumnUpdateResponse>;
  onHeadingsUpdate(): Promise<IHeadingUpdateResponse>;
  onTodosUpdate(): Promise<ITodoUpdateResponse>;
  onSubTodosUpdate(): Promise<ISubTodoUpdateResponse>;
  onBoardPositionsUpdate(): Promise<IBoardPositionsUpdateResponse>;
  onColumnPositionsUpdate(): Promise<IColumnPositionsUpdateResponse>;
  onHeadingPositionsUpdate(): Promise<IHeadingPositionsUpdateResponse>;
  onTodoPositionsUpdate(): Promise<ITodoPositionsUpdateResponse>;
  onSubTodoPositionsUpdate(): Promise<ISubTodoPositionsUpdateResponse>;
  onCommentsUpdate(): Promise<ICommentUpdateResponse>;
  onCommentAttachmentsUpdate(): Promise<ICommentAttachmentUpdateResponse>;
}
