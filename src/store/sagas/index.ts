import { all, fork } from 'typed-redux-saga';

import { container } from '@inversify/config';
import { IServices } from '@inversify/interfaces';
import { TYPES } from '@inversify/types';
import { watchAuth } from '@store/sagas/auth';
import { watchBoard } from '@store/sagas/board';
import { watchColumn } from '@store/sagas/column';
import { watchComment } from '@store/sagas/comment';
import { watchCommentAttachment } from '@store/sagas/comment-attachment';
import { watchHeading } from '@store/sagas/heading';
import { watchSearch } from '@store/sagas/search';
import { watchSubTodo } from '@store/sagas/sub-todo';
import { watchSystem } from '@store/sagas/system';
import { watchTodo } from '@store/sagas/todo';
import { watchUpdate } from '@store/sagas/update';
import { watchUser } from '@store/sagas/user';

const {
  authService,
  userService,
  boardService,
  columnService,
  headingService,
  todoService,
  subTodoService,
  commentService,
  commentAttachmentService,
  searchService,
  updateService,
} = container.get<IServices>(TYPES.Services);

export function* rootSaga() {
  yield all([
    fork(watchAuth, authService),
    fork(watchUser, userService),
    fork(watchBoard, boardService),
    fork(watchColumn, columnService),
    fork(watchHeading, headingService),
    fork(watchTodo, todoService),
    fork(watchSubTodo, subTodoService),
    fork(watchComment, commentService),
    fork(watchCommentAttachment, commentAttachmentService),
    fork(watchSearch, searchService),
    fork(watchUpdate, updateService),
    fork(watchSystem),
  ]);
}
