import { all } from 'typed-redux-saga';
import { watchAuth } from '@store/sagas/auth';
import { watchUser } from '@store/sagas/user';
import { watchBoard } from '@store/sagas/board';
import { watchColumn } from '@store/sagas/column';
import { watchTodo } from '@store/sagas/todo';
import { watchComment } from '@store/sagas/comments';
import { watchCommentAttachments } from '@store/sagas/comment-attachments';
import { watchSearch } from '@store/sagas/search';
import { watchSystem } from './system';

export function* rootSaga() {
  yield all([
    watchAuth(),
    watchUser(),
    watchBoard(),
    watchColumn(),
    watchTodo(),
    watchComment(),
    watchCommentAttachments(),
    watchSearch(),
    watchSystem(),
  ]);
}
