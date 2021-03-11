import { all, fork } from 'typed-redux-saga';
import { watchAuth } from '@store/sagas/auth';
import { watchUser } from '@store/sagas/user';
import { watchBoard } from '@store/sagas/board';
import { watchColumn } from '@store/sagas/column';
import { watchTodo } from '@store/sagas/todo';
import { watchComment } from '@store/sagas/comment';
import { watchCommentAttachment } from '@store/sagas/comment-attachment';
import { watchSearch } from '@store/sagas/search';
import { watchSystem } from '@store/sagas/system';
import { watchUpdate } from '@store/sagas/update';
import { container } from '@inversify/config';
import { IServices } from '@inversify/interfaces';
import { TYPES } from '@inversify/types';

const {
  authService,
  userService,
  boardService,
  columnService,
  todoService,
  commentService,
  commentAttachmentService,
} = container.get<IServices>(TYPES.Services);

export function* rootSaga() {
  yield all([
    fork(watchAuth, authService),
    fork(watchUser, userService),
    fork(watchBoard, boardService),
    fork(watchColumn, columnService),
    fork(watchTodo, todoService),
    fork(watchComment, commentService),
    fork(watchCommentAttachment, commentAttachmentService),
    fork(watchSearch),
    fork(watchSystem),
    fork(watchUpdate),
  ]);
}
