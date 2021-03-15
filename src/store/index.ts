import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import * as Sentry from '@sentry/react';
import createSentryMiddleware from 'redux-sentry-middleware';
import { rootSaga } from '@store/sagas';
import { rootReducer } from '@store/reducers';

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
