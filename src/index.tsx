import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import * as serviceWorker from './serviceWorker';

import './styles/scss/main.scss';
import { MainRouter } from './router';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MainRouter />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
