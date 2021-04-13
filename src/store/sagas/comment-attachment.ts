import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, apply, call, put, takeEvery, takeLatest,
} from 'typed-redux-saga';

import i18n from '@/i18n';
import { ICommentAttachmentService } from '@inversify/interfaces/services';
import { CommentAttachmentsActions } from '@store/actions';
import {
  IFetchCommentAttachmentsBySubTodoId,
  IFetchCommentAttachmentsByTodoId,
  IRemoveCommentAttachment,
  IUploadCommentAttachmentsFile,
  IUploadCommentAttachmentsFiles,
} from '@type/actions';
import { useAlert } from '@use/alert';

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

function* fetchBySubTodoIdWorker(
  commentAttachmentService: ICommentAttachmentService,
  action: PayloadAction<IFetchCommentAttachmentsBySubTodoId>,
) {
  try {
    const response = yield* apply(
      commentAttachmentService, commentAttachmentService.getBySubTodoId, [action.payload],
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
      yield put(CommentAttachmentsActions.effect.uploadFile({
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
    yield put(CommentAttachmentsActions.remove(action.payload));
    yield* apply(commentAttachmentService, commentAttachmentService.remove, [action.payload]);
    yield call(show, i18n.t('Attachments'), i18n.t('Attachment removed successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Attachments'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchCommentAttachment(commentAttachmentService: ICommentAttachmentService) {
  yield all([
    takeLatest(CommentAttachmentsActions.effect.fetchByTodoId, fetchByTodoIdWorker, commentAttachmentService),
    takeLatest(CommentAttachmentsActions.effect.fetchBySubTodoId, fetchBySubTodoIdWorker, commentAttachmentService),
    takeLatest(CommentAttachmentsActions.effect.uploadFiles, uploadFilesWorker, commentAttachmentService),
    takeEvery(CommentAttachmentsActions.effect.uploadFile, uploadFileWorker, commentAttachmentService),
    takeLatest(CommentAttachmentsActions.effect.remove, removeWorker, commentAttachmentService),
  ]);
}
