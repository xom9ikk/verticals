import { Container } from 'inversify';
import { TYPES } from './inversify.types';
import { Services, IServices } from './services';
import { HttpClient, IHttpClient } from './plugins/httpClient';
import { AuthService, IAuthService } from './services/auth';

const container = new Container();

container
  .bind<IHttpClient>(TYPES.HttpClient)
  .to(HttpClient)
  .inSingletonScope();

container
  .bind<IAuthService>(TYPES.AuthService)
  .to(AuthService)
  .inSingletonScope();

container
  .bind<IServices>(TYPES.Services)
  .to(Services)
  .inSingletonScope();

export { container };
