import {
  all, apply, call, put, select, takeLatest, takeLeading,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@use/alert';
import { CommentAttachmentsActions, CommentsActions } from '@store/actions';
import {
  getAvatarUrl, getName, getSurname, getUsername,
} from '@store/selectors';
import {
  IAddCommentLike,
  ICreateComment,
  IFetchCommentsByTodoId,
  IRemoveComment,
  IRemoveCommentLike,
  IUpdateCommentText,
} from '@type/actions';
import i18n from '@/i18n';
import { ICommentService } from '@inversify/interfaces/services';

const { show, ALERT_TYPES } = useAlert();

function* fetchByTodoIdWorker(commentService: ICommentService, action: PayloadAction<IFetchCommentsByTodoId>) {
  try {
    const response = yield* apply(commentService, commentService.getByTodoId, [action.payload]);
    const { comments } = response.data;
    yield put(CommentsActions.setAll(comments));
  } catch (error) {
    yield call(show, i18n.t('Comment'), error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(commentService: ICommentService, action: PayloadAction<ICreateComment>) {
  try {
    const { files, ...comment } = action.payload;
    const response = yield* apply(commentService, commentService.create, [comment]);
    const { commentId } = response.data;
    yield put(CommentsActions.add({
      ...comment,
      id: commentId,
    }));
    if (files) {
      yield put(CommentAttachmentsActions.uploadFiles({
        commentId,
        files,
      }));
    }
    yield call(show, i18n.t('Comment'), i18n.t('Comment added successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Comment'), error, ALERT_TYPES.DANGER);
  }
}

function* removeWorker(commentService: ICommentService, action: PayloadAction<IRemoveComment>) {
  try {
    yield put(CommentsActions.remove(action.payload));
    yield* apply(commentService, commentService.remove, [action.payload]);
    yield call(show, i18n.t('Comment'), i18n.t('Comment removed successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Comment'), error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(commentService: ICommentService, action: PayloadAction<IUpdateCommentText>) {
  try {
    yield put(CommentsActions.updateText(action.payload));
    yield* apply(commentService, commentService.update, [action.payload]);
    yield call(show, i18n.t('Comment'), i18n.t('Comment updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Comment'), error, ALERT_TYPES.DANGER);
  }
}

function* addLikeWorker(commentService: ICommentService, action: PayloadAction<IAddCommentLike>) {
  try {
    yield* apply(commentService, commentService.addLike, [action.payload]);
    const { commentId } = action.payload;
    const name = yield select(getName);
    const surname = yield select(getSurname);
    const username = yield select(getUsername);
    const avatar = yield select(getAvatarUrl);
    yield put(CommentsActions.updateLike({
      commentId,
      like: {
        name,
        surname,
        username,
        avatar,
      },
      isLiked: true,
    }));
  } catch (error) {
    yield call(show, i18n.t('Comment'), error, ALERT_TYPES.DANGER);
  }
}

function* removeLikeWorker(commentService: ICommentService, action: PayloadAction<IRemoveCommentLike>) {
  try {
    yield* apply(commentService, commentService.removeLike, [action.payload]);
    const { commentId } = action.payload;
    const name = yield select(getName);
    const surname = yield select(getSurname);
    const username = yield select(getUsername);
    const avatar = yield select(getAvatarUrl);
    yield put(CommentsActions.updateLike({
      commentId,
      like: {
        name,
        surname,
        username,
        avatar,
      },
      isLiked: false,
    }));
  } catch (error) {
    yield call(show, i18n.t('Comment'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchComment(commentService: ICommentService) {
  yield all([
    takeLatest(CommentsActions.effect.fetchByTodoId, fetchByTodoIdWorker, commentService),
    takeLatest(CommentsActions.effect.create, createWorker, commentService),
    takeLatest(CommentsActions.effect.remove, removeWorker, commentService),
    takeLatest(CommentsActions.effect.updateText, updateWorker, commentService),
    takeLeading(CommentsActions.effect.addLike, addLikeWorker, commentService),
    takeLeading(CommentsActions.effect.removeLike, removeLikeWorker, commentService),
  ]);
}
