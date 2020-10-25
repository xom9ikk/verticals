import {
  all, apply, call, takeLatest,
} from 'typed-redux-saga';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { IServices } from '@/inversify.interfaces';
import { CommentAttachmentsActions } from '@/store/actions';
import { Action } from 'redux-actions';
import { IUploadCommentAttachmentRequest } from '@/types/api/comment-attachment';

const { commentAttachmentService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

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
    takeLatest(CommentAttachmentsActions.Type.UPLOAD_FILE, uploadFileWorker),
  ]);
}
