import React from 'react';
import ReactDOM from 'react-dom';
import ReactTooltip from 'react-tooltip';
import { Provider } from 'react-redux';
import { App } from '@/app';
import { configureAppStore } from '@/store';
import { ErrorBoundary } from '@comp/ErrorBoundary/ErrorBoundary';

const store = configureAppStore();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);

setInterval(() => {
  // console.log('rebuild');
  ReactTooltip.rebuild(); // TODO: move to data-tip update hook useEffect(() => {})
}, 2000);
