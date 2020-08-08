import { Container } from 'inversify';
import { AxiosInstance } from 'axios';
import { TYPES } from './inversify.types';
import { AuthService, IAuthService } from './services';

import { Api } from './plugins/api';

const { client } = new Api();
const myContainer = new Container();

myContainer
  .bind<IAuthService>(TYPES.AuthService)
  .to(AuthService)
  .inSingletonScope();

myContainer
  .bind<AxiosInstance>(TYPES.HttpClient)
  .toConstantValue(client);

export { myContainer };
