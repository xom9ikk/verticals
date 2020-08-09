import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/scss/main.scss';
import { configureStore } from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { MainRouter } from './router';
import { container } from './inversify.config';
import { IServices } from './inversify.interfaces';
import { TYPES } from './inversify.types';

const store = configureStore();
const { auth } = container.get<IServices>(TYPES.Services);
(async () => {
  const res = await auth.signIn({ email: 'test@test.test', password: '123456' });
  console.log('auth res', res);
  setTimeout(async () => {
    const resMe = await auth.me();
    console.log('me res', resMe);
  });
})();
ReactDOM.render(
  <Provider store={store}>
    <MainRouter />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
