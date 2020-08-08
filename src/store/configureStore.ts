import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import { rootReducer } from './reducers';

const sagaMiddleware = createSagaMiddleware();

export const configureStore = () => {
  const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  ));
  sagaMiddleware.run(rootSaga);
  return store;
};
