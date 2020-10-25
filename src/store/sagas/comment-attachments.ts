import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { IServices } from '@/inversify.interfaces';
import { CommentAttachmentsActions } from '@/store/actions';
import { Action } from 'redux-actions';
import {
  IGetCommentAttachmentsByTodoIdRequest,
  IUploadCommentAttachmentRequest,
} from '@/types/api';

const { commentAttachmentService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* fetchByTodoIdWorker(action: Action<IGetCommentAttachmentsByTodoIdRequest>) {
  try {
    const response = yield* apply(
      commentAttachmentService, commentAttachmentService.getByTodoId, [action.payload],
    );
    const { attachments } = response.data;
    yield put(CommentAttachmentsActions.setAll(attachments));
  } catch (error) {
    yield call(show, 'Comment', error, ALERT_TYPES.DANGER);
  }
}

function* uploadFileWorker(action: Action<IUploadCommentAttachmentRequest>) {
  try {
    console.log('uploadFileWorker action', action);
    const response = yield* apply(
      commentAttachmentService, commentAttachmentService.uploadFile, [action.payload],
    );
    console.log('uploadFileWorker response', response);
  } catch (error) {
    yield call(show, 'Attachments', error, ALERT_TYPES.DANGER);
  }
}

export function* watchCommentAttachments() {
  yield* all([
    takeLatest(CommentAttachmentsActions.Type.FETCH_BY_TODO_ID, fetchByTodoIdWorker),
    takeLatest(CommentAttachmentsActions.Type.UPLOAD_FILE, uploadFileWorker),
  ]);
}
