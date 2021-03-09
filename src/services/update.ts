import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@inversify/types';
import {
  IBoardPositionsUpdateResponse,
  IBoardUpdateResponse,
  IColumnPositionsUpdateResponse,
  IColumnUpdateResponse, ICommentAttachmentUpdateResponse, ICommentUpdateResponse,
  ITodoPositionsUpdateResponse,
  ITodoUpdateResponse,
} from '@type/api';
import { IWSClient } from '@inversify/interfaces/wsClient';
import { IUpdateService } from '@inversify/interfaces/services';

@injectable()
export class UpdateService implements IUpdateService {
  wsClient: IWSClient;

  constructor(
  @inject(TYPES.WSClient) wsClient: IWSClient,
  ) {
    this.wsClient = wsClient;
  }

  openChannel() {
    this.wsClient.open('updates');
  }

  closeChannel() {
    this.wsClient.close('updates');
  }

  onBoardsUpdate(): Promise<IBoardUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<IBoardUpdateResponse>('updates', 'board', resolve);
    });
  }

  onColumnsUpdate(): Promise<IColumnUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<IColumnUpdateResponse>('updates', 'column', resolve);
    });
  }

  onTodosUpdate(): Promise<ITodoUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<ITodoUpdateResponse>('updates', 'todo', resolve);
    });
  }

  onBoardPositionsUpdate(): Promise<IBoardPositionsUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<IBoardPositionsUpdateResponse>('updates', 'board_position', resolve);
    });
  }

  onColumnPositionsUpdate(): Promise<IColumnPositionsUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<IColumnPositionsUpdateResponse>('updates', 'column_position', resolve);
    });
  }

  onTodoPositionsUpdate(): Promise<ITodoPositionsUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<ITodoPositionsUpdateResponse>('updates', 'todo_position', resolve);
    });
  }

  onCommentsUpdate(): Promise<ICommentUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<ICommentUpdateResponse>('updates', 'comment', resolve);
    });
  }

  onCommentAttachmentsUpdate(): Promise<ICommentAttachmentUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<ICommentAttachmentUpdateResponse>('updates', 'comment_files', resolve);
    });
  }
}
