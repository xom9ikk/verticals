import React, { Suspense } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import { Provider } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import ReactTooltip from 'react-tooltip';

import 'swiper/swiper.scss';
import 'react-notifications-component/dist/theme.css';
import { Gallery } from '@comp/Gallery';
import { FormattingHelp } from '@comp/FormattingHelp';
import { configureAppStore } from '@/store';
import { MainRouter } from '@/router';
import './styles/scss/main.scss';
import i18n from '@/i18n';

console.log('i18n', i18n); // TODO: webpack delete unused code
const store = configureAppStore();

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<></>}>
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
    </Suspense>
  </Provider>,
  document.getElementById('root'),
);

setInterval(() => {
  // console.log('rebuild');
  ReactTooltip.rebuild(); // TODO: move to data-tip update hook
}, 2000);
