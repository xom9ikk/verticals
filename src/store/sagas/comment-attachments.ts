import {
  all, apply, call, put, takeLatest, takeEvery,
} from 'typed-redux-saga';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { IServices } from '@/inversify.interfaces';
import { CommentAttachmentsActions } from '@/store/actions';
import { Action } from 'redux-actions';
import {
  IGetCommentAttachmentsByTodoIdRequest, IRemoveCommentAttachmentRequest,
  IUploadCommentAttachmentRequest,
} from '@/types/api';
import { IUploadCommentAttachmentsFiles } from '@/types/actions';

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

function* uploadFilesWorker(action: Action<IUploadCommentAttachmentsFiles>) {
  try {
    const { files, commentId } = action.payload;
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      yield put(CommentAttachmentsActions.uploadFile({
        commentId,
        file,
      }));
    }
  } catch (error) {
    yield call(show, 'Attachments', error, ALERT_TYPES.DANGER);
  }
}

function* uploadFileWorker(action: Action<IUploadCommentAttachmentRequest>) {
  try {
    const response = yield* apply(
      commentAttachmentService, commentAttachmentService.uploadFile, [action.payload],
    );
    const { data } = response;
    console.log('uploadFileWorker response', data);
    yield put(CommentAttachmentsActions.add(data));
  } catch (error) {
    yield call(show, 'Attachments', error, ALERT_TYPES.DANGER);
  }
}

function* removeWorker(action: Action<IRemoveCommentAttachmentRequest>) {
  try {
    yield* apply(commentAttachmentService, commentAttachmentService.remove, [action.payload]);
    yield call(show, 'Attachments', 'Attachment removed successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Attachments', error, ALERT_TYPES.DANGER);
  }
}

export function* watchCommentAttachments() {
  yield* all([
    takeLatest(CommentAttachmentsActions.Type.FETCH_BY_TODO_ID, fetchByTodoIdWorker),
    takeLatest(CommentAttachmentsActions.Type.UPLOAD_FILES, uploadFilesWorker),
    takeEvery(CommentAttachmentsActions.Type.UPLOAD_FILE, uploadFileWorker),
    takeLatest(CommentAttachmentsActions.Type.REMOVE, removeWorker),
  ]);
}
