import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '@/store/sagas';
import { rootReducer } from '@/store/reducers';

const sagaMiddleware = createSagaMiddleware();

export const configureStore = () => {
  const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  ));
  sagaMiddleware.run(rootSaga);
  return store;
};
