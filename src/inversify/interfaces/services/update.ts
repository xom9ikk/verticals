import {
  IBoardPositionsUpdateResponse,
  IBoardUpdateResponse,
  IColumnPositionsUpdateResponse,
  IColumnUpdateResponse,
  ICommentAttachmentUpdateResponse,
  ICommentUpdateResponse,
  IHeadingPositionsUpdateResponse,
  IHeadingUpdateResponse,
  ISubTodoPositionsUpdateResponse,
  ISubTodoUpdateResponse,
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
  onSubTodosUpdate(): Promise<ISubTodoUpdateResponse>;
  onBoardPositionsUpdate(): Promise<IBoardPositionsUpdateResponse>;
  onColumnPositionsUpdate(): Promise<IColumnPositionsUpdateResponse>;
  onHeadingPositionsUpdate(): Promise<IHeadingPositionsUpdateResponse>;
  onTodoPositionsUpdate(): Promise<ITodoPositionsUpdateResponse>;
  onSubTodoPositionsUpdate(): Promise<ISubTodoPositionsUpdateResponse>;
  onCommentsUpdate(): Promise<ICommentUpdateResponse>;
  onCommentAttachmentsUpdate(): Promise<ICommentAttachmentUpdateResponse>;
}
