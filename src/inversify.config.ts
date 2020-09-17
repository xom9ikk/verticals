import { Container } from 'inversify';
import { TYPES } from '@/inversify.types';
import { HttpClient } from '@/plugins/httpClient';
import { Services } from '@/services';
import { AuthService } from '@/services/auth';
import { BoardService } from '@/services/board';
import { ColumnService } from '@/services/column';
import { TodoService } from '@/services/todo';

import {
  IHttpClient,
  IServices,
  IAuthService,
  IBoardService,
  IColumnService,
  ITodoService,
} from './inversify.interfaces';

const container = new Container();

container
  .bind<IHttpClient>(TYPES.HttpClient)
  .to(HttpClient)
  .inSingletonScope();

container
  .bind<IServices>(TYPES.Services)
  .to(Services)
  .inSingletonScope();

container
  .bind<IAuthService>(TYPES.AuthService)
  .to(AuthService)
  .inSingletonScope();

container
  .bind<IBoardService>(TYPES.BoardService)
  .to(BoardService)
  .inSingletonScope();

container
  .bind<IColumnService>(TYPES.ColumnService)
  .to(ColumnService)
  .inSingletonScope();

container
  .bind<ITodoService>(TYPES.TodoService)
  .to(TodoService)
  .inSingletonScope();

export { container };
