import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '@store/sagas';
import { rootReducer } from '@store/reducers';

const sagaMiddleware = createSagaMiddleware();

export const configureAppStore = () => {
  const middleware = [...getDefaultMiddleware({
    thunk: false,
  }), sagaMiddleware];

  const store = configureStore({
    reducer: rootReducer,
    middleware,
  });

  sagaMiddleware.run(rootSaga);
  return store;
};
