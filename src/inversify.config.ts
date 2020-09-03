import { Container } from 'inversify';
import { BoardService } from '@/services/board';
import { TYPES } from './inversify.types';
import { Services } from './services';
import { HttpClient } from './plugins/httpClient';
import { AuthService } from './services/auth';
import {
  IAuthService, IBoardService, IHttpClient, IServices,
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

export { container };
