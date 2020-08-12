import { all } from 'redux-saga/effects';
import { watchAuth } from './auth';

export function* rootSaga() {
  yield all([
    watchAuth(),
  ]);
}
