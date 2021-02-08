import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import { Provider } from 'react-redux';
// @ts-ignore
import ReactNotification from 'react-notifications-component';
import ReactTooltip from 'react-tooltip';

import 'swiper/swiper.scss';
import 'react-notifications-component/dist/theme.css';
import { Gallery } from '@comp/Gallery';
import { FormattingHelp } from '@comp/FormattingHelp';
import { configureAppStore } from '@/store';
import { MainRouter } from '@/router';
import './styles/scss/main.scss';

const store = configureAppStore();

ReactDOM.render(
  <Provider store={store}>
    {createPortal(
      <ReactNotification />,
      document.getElementById('notification-root')!,
    )}
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
    <FormattingHelp />
  </Provider>,
  document.getElementById('root'),
);

setInterval(() => {
  // console.log('rebuild');
  ReactTooltip.rebuild(); // TODO: move to data-tip update hook
}, 2000);

// @ts-ignore
// if (module.hot) {
//   // @ts-ignore
//   module.hot.accept();
// }
