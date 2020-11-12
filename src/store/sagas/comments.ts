import {
  all, apply, call, put, select, takeLatest, takeLeading,
} from 'typed-redux-saga';
import { Action } from 'redux-actions';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { IServices } from '@/inversify.interfaces';
import { CommentAttachmentsActions, CommentsActions } from '@/store/actions';
import {
  ICreateCommentRequest,
  IRemoveCommentRequest,
  IUpdateCommentRequest,
  IGetCommentsByTodoIdRequest,
  IAddCommentLikeRequest,
  IRemoveCommentLikeRequest,
} from '@/types/api';
import {
  getAvatarUrl, getName, getSurname, getUsername,
} from '@/store/selectors';

const { commentService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* fetchByTodoIdWorker(action: Action<IGetCommentsByTodoIdRequest>) {
  try {
    const response = yield* apply(commentService, commentService.getByTodoId, [action.payload]);
    const { comments } = response.data;
    yield put(CommentsActions.setAll(comments));
    // yield put(SystemActions.setIsLoadedComments(true));
  } catch (error) {
    yield call(show, 'Comment', error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(action: Action<ICreateCommentRequest>) {
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

function* removeWorker(action: Action<IRemoveCommentRequest>) {
  try {
    yield* apply(commentService, commentService.remove, [action.payload]);
    yield call(show, 'Comment', 'Comment removed successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Comment', error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(action: Action<IUpdateCommentRequest>) {
  try {
    yield* apply(commentService, commentService.update, [action.payload]);
    yield call(show, 'Comment', 'Comment updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Comment', error, ALERT_TYPES.DANGER);
  }
}

function* addLikeWorker(action: Action<IAddCommentLikeRequest>) {
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

function* removeLikeWorker(action: Action<IRemoveCommentLikeRequest>) {
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
    takeLatest(CommentsActions.Type.FETCH_BY_TODO_ID, fetchByTodoIdWorker),
    takeLatest(CommentsActions.Type.CREATE, createWorker),
    takeLatest(CommentsActions.Type.REMOVE, removeWorker),
    takeLatest(CommentsActions.Type.UPDATE_TEXT, updateWorker),
    takeLeading(CommentsActions.Type.ADD_LIKE, addLikeWorker),
    takeLeading(CommentsActions.Type.REMOVE_LIKE, removeLikeWorker),
  ]);
}
