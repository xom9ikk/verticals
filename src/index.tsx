import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './store/configureStore';
import * as serviceWorker from './serviceWorker';

import './styles/scss/main.scss';
import { AuthLayout } from './layouts/auth';
import { MainLayout } from './layouts/main';

import { myContainer } from './inversify.config';
import { TYPES } from './inversify.types';
import { IAuthService } from './inversify.interfaces';

const authService = myContainer.get<IAuthService>(TYPES.AuthService);
// @ts-ignore
authService.signUp({});

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthLayout />
      {/* <MainLayout /> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
