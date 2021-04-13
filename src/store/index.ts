import { configureStore } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import createSagaMiddleware from 'redux-saga';
import createSentryMiddleware from 'redux-sentry-middleware';

import { rootReducer } from '@store/reducers';
import { rootSaga } from '@store/sagas';

const sagaMiddleware = createSagaMiddleware({
  onError: (error, { sagaStack }) => {
    console.error(error, sagaStack);
    Sentry.captureException({
      error,
      sagaStack,
    });
  },
});

export const configureAppStore = () => {
  const middleware = [
    sagaMiddleware,
    createSentryMiddleware(Sentry as any),
  ];

  const store = configureStore({
    reducer: rootReducer,
    middleware,
  });

  sagaMiddleware.run(rootSaga);
  return store;
};
