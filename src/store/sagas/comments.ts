import {
  all, apply, call, put, select, takeLatest, takeLeading,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@/use/alert';
import { CommentAttachmentsActions, CommentsActions } from '@/store/actions';
import {
  getAvatarUrl, getName, getSurname, getUsername,
} from '@/store/selectors';
import { container } from '@/inversify/config';
import { IServices } from '@/inversify/interfaces';
import { TYPES } from '@/inversify/types';
import {
  IAddCommentLike,
  ICreateComment,
  IFetchCommentsByTodoId,
  IRemoveComment,
  IRemoveCommentLike,
  IUpdateCommentText,
} from '@/types/actions';

const { commentService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* fetchByTodoIdWorker(action: PayloadAction<IFetchCommentsByTodoId>) {
  try {
    const response = yield* apply(commentService, commentService.getByTodoId, [action.payload]);
    const { comments } = response.data;
    yield put(CommentsActions.setAll(comments));
    // yield put(SystemActions.setIsLoadedComments(true));
  } catch (error) {
    yield call(show, 'Comment', error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(action: PayloadAction<ICreateComment>) {
  try {
    const { files, ...comment } = action.payload;
    const response = yield* apply(commentService, commentService.create, [comment]);
    const { commentId } = response.data;
    yield put(CommentsActions.add({
      ...action.payload,
      id: commentId,
    }));
    if (files) {
      yield put(CommentAttachmentsActions.uploadFiles({
        commentId,
        files,
      }));
    }
    yield call(show, 'Comment', 'Comment added successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Comment', error, ALERT_TYPES.DANGER);
  }
}

function* removeWorker(action: PayloadAction<IRemoveComment>) {
  try {
    yield* apply(commentService, commentService.remove, [action.payload]);
    yield call(show, 'Comment', 'Comment removed successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Comment', error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(action: PayloadAction<IUpdateCommentText>) {
  try {
    yield* apply(commentService, commentService.update, [action.payload]);
    yield call(show, 'Comment', 'Comment updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Comment', error, ALERT_TYPES.DANGER);
  }
}

function* addLikeWorker(action: PayloadAction<IAddCommentLike>) {
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
    yield call(show, 'Comment', error, ALERT_TYPES.DANGER);
  }
}

function* removeLikeWorker(action: PayloadAction<IRemoveCommentLike>) {
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
    yield call(show, 'Comment', error, ALERT_TYPES.DANGER);
  }
}

export function* watchComment() {
  yield* all([
    takeLatest(CommentsActions.fetchByTodoId, fetchByTodoIdWorker),
    takeLatest(CommentsActions.create, createWorker),
    takeLatest(CommentsActions.remove, removeWorker),
    takeLatest(CommentsActions.updateText, updateWorker),
    takeLeading(CommentsActions.addLike, addLikeWorker),
    takeLeading(CommentsActions.removeLike, removeLikeWorker),
  ]);
}
