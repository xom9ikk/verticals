import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-notifications-component/dist/theme.css';
// @ts-ignore
import ReactNotification from 'react-notifications-component';

import './styles/scss/main.scss';
import { configureStore } from './store/configureStore';
import { MainRouter } from './router';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ReactNotification />
    <MainRouter />
  </Provider>,
  document.getElementById('root'),
);
