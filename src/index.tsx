import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-notifications-component/dist/theme.css';
// @ts-ignore
import ReactNotification from 'react-notifications-component';
import ReactTooltip from 'react-tooltip';

import './styles/scss/main.scss';
import { configureStore } from './store/configureStore';
import { MainRouter } from './router';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ReactNotification />
    <MainRouter />
    <ReactTooltip
      id="tooltip"
      place="top"
      effect="solid"
      multiline
      arrowColor="transparent"
      overridePosition={({ left, top }, currentEvent) => {
        console.log('currentEvent', currentEvent);
        return { left, top };
      }}
    />
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
