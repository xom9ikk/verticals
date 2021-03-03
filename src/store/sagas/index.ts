import { all, fork } from 'typed-redux-saga';
import { watchAuth } from '@store/sagas/auth';
import { watchUser } from '@store/sagas/user';
import { watchBoard } from '@store/sagas/board';
import { watchColumn } from '@store/sagas/column';
import { watchTodo } from '@store/sagas/todo';
import { watchComment } from '@store/sagas/comments';
import { watchCommentAttachments } from '@store/sagas/comment-attachments';
import { watchSearch } from '@store/sagas/search';
import { watchSystem } from '@store/sagas/system';
import { watchUpdate } from '@store/sagas/update';

export function* rootSaga() {
  yield all([
    yield fork(watchAuth),
    yield fork(watchUser),
    yield fork(watchBoard),
    yield fork(watchColumn),
    yield fork(watchTodo),
    yield fork(watchComment),
    yield fork(watchCommentAttachments),
    yield fork(watchSearch),
    yield fork(watchSystem),
    yield fork(watchUpdate),
  ]);
}
