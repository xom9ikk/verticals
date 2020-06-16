import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './store/configureStore';
import * as serviceWorker from './serviceWorker';

import './styles/scss/main.scss';
import { Auth } from './layouts/Auth';
import { Main } from './layouts/Main';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        {/*<Auth />*/}
        <Main />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
