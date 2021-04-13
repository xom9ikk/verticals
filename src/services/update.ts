import { inject, injectable } from 'inversify';

import 'reflect-metadata';
import { IUpdateService } from '@inversify/interfaces/services';
import { IWSClient } from '@inversify/interfaces/wsClient';
import { TYPES } from '@inversify/types';
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
  ISubTodoUpdateResponse, ITodoPositionsUpdateResponse, ITodoUpdateResponse,
} from '@type/api';

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

  onHeadingsUpdate(): Promise<IHeadingUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<IHeadingUpdateResponse>('updates', 'heading', resolve);
    });
  }

  onTodosUpdate(): Promise<ITodoUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<ITodoUpdateResponse>('updates', 'todo', resolve);
    });
  }

  onSubTodosUpdate(): Promise<ISubTodoUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<ISubTodoUpdateResponse>('updates', 'sub_todo', resolve);
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

  onHeadingPositionsUpdate(): Promise<IHeadingPositionsUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<IHeadingPositionsUpdateResponse>('updates', 'heading_position', resolve);
    });
  }

  onTodoPositionsUpdate(): Promise<ITodoPositionsUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<ITodoPositionsUpdateResponse>('updates', 'todo_position', resolve);
    });
  }

  onSubTodoPositionsUpdate(): Promise<ISubTodoPositionsUpdateResponse> {
    return new Promise((resolve) => {
      this.wsClient.on<ISubTodoPositionsUpdateResponse>('updates', 'sub_todo_position', resolve);
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
