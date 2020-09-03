import { all } from 'redux-saga/effects';
import { watchBoard } from '@/store/sagas/board';
import { watchAuth } from '@/store/sagas/auth';

export function* rootSaga() {
  yield all([
    watchAuth(),
    watchBoard(),
  ]);
}
