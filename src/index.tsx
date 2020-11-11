import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import { Provider } from 'react-redux';
import 'react-notifications-component/dist/theme.css';
// @ts-ignore
import ReactNotification from 'react-notifications-component';
import ReactTooltip from 'react-tooltip';

import './styles/scss/main.scss';

// import createDebug from 'debug';
import { Gallery } from '@comp/Gallery';
import { configureStore } from './store/configureStore';
import { MainRouter } from './router';

const store = configureStore();
// const debug = createDebug('app');

// @ts-ignore
// console.log = (...rest) => {
//   debug(rest.join(' '));
// };

ReactDOM.render(
  <Provider store={store}>
    {createPortal(<><ReactNotification /></>, document.querySelector('#notification-root')!)}
    <MainRouter />
    <ReactTooltip
      id="tooltip"
      place="top"
      effect="solid"
      multiline
      arrowColor="transparent"
      overridePosition={({ left, top }) => ({ left, top })}
    />
    <Gallery />
  </Provider>,
  document.getElementById('root'),
);

setInterval(() => {
  console.log('rebuild');
  ReactTooltip.rebuild();
}, 2000);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
