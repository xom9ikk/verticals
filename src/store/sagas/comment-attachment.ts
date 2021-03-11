import {
  all, apply, call, put, takeLatest, takeEvery,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@use/alert';
import { CommentAttachmentsActions } from '@store/actions';
import {
  IFetchCommentAttachmentsByTodoId,
  IRemoveCommentAttachment,
  IUploadCommentAttachmentsFile,
  IUploadCommentAttachmentsFiles,
} from '@type/actions';
import i18n from '@/i18n';
import { ICommentAttachmentService } from '@inversify/interfaces/services';

const { show, ALERT_TYPES } = useAlert();

function* fetchByTodoIdWorker(
  commentAttachmentService: ICommentAttachmentService,
  action: PayloadAction<IFetchCommentAttachmentsByTodoId>,
) {
  try {
    const response = yield* apply(
      commentAttachmentService, commentAttachmentService.getByTodoId, [action.payload],
    );
    const { attachments } = response.data;
    yield put(CommentAttachmentsActions.merge(attachments));
  } catch (error) {
    yield call(show, i18n.t('Attachments'), error, ALERT_TYPES.DANGER);
  }
}

function* uploadFilesWorker(
  commentAttachmentService: ICommentAttachmentService,
  action: PayloadAction<IUploadCommentAttachmentsFiles>,
) {
  try {
    const { files, commentId } = action.payload;
    for (let i = 0; i < files.length; i += 1) { // TODO: foreach?
      const file = files[i];
      yield put(CommentAttachmentsActions.uploadFile({
        commentId,
        file,
      }));
    }
  } catch (error) {
    yield call(show, i18n.t('Attachments'), error, ALERT_TYPES.DANGER);
  }
}

function* uploadFileWorker(
  commentAttachmentService: ICommentAttachmentService,
  action: PayloadAction<IUploadCommentAttachmentsFile>,
) {
  try {
    const response = yield* apply(
      commentAttachmentService, commentAttachmentService.uploadFile, [action.payload],
    );
    const { data } = response;
    yield put(CommentAttachmentsActions.add(data));
  } catch (error) {
    yield call(show, i18n.t('Attachments'), error, ALERT_TYPES.DANGER);
  }
}

function* removeWorker(
  commentAttachmentService: ICommentAttachmentService,
  action: PayloadAction<IRemoveCommentAttachment>,
) {
  try {
    yield* apply(commentAttachmentService, commentAttachmentService.remove, [action.payload]);
    yield call(show, i18n.t('Attachments'), i18n.t('Attachment removed successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Attachments'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchCommentAttachment(commentAttachmentService: ICommentAttachmentService) {
  yield all([
    takeLatest(CommentAttachmentsActions.fetchByTodoId, fetchByTodoIdWorker, commentAttachmentService),
    takeLatest(CommentAttachmentsActions.uploadFiles, uploadFilesWorker, commentAttachmentService),
    takeEvery(CommentAttachmentsActions.uploadFile, uploadFileWorker, commentAttachmentService),
    takeLatest(CommentAttachmentsActions.remove, removeWorker, commentAttachmentService),
  ]);
}