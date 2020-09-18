import { all } from 'redux-saga/effects';
import { watchAuth } from '@/store/sagas/auth';
import { watchBoard } from '@/store/sagas/board';
import { watchColumn } from '@/store/sagas/column';
import { watchTodo } from '@/store/sagas/todo';

export function* rootSaga() {
  yield all([
    watchAuth(),
    watchBoard(),
    watchColumn(),
    watchTodo(),
  ]);
}
