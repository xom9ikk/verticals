import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { Action } from 'redux-actions';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { IServices } from '@/inversify.interfaces';
import { BoardsActions, SystemActions } from '@/store/actions';
import {
  ICreateBoardRequest,
  IRemoveBoardRequest,
  IUpdateBoardRequest,
  IUpdateBoardPositionRequest,
} from '@/types/api';

const { boardService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* fetchWorker() {
  try {
    const response = yield* apply(boardService, boardService.getAll, []);
    const { boards } = response.data;
    yield put(BoardsActions.setAll(boards));
    yield put(SystemActions.setIsLoadedBoards(true));
  } catch (error) {
    yield call(show, 'Board', error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(action: Action<ICreateBoardRequest>) {
  try {
    const { belowId } = action.payload;
    const response = yield* apply(boardService, boardService.create, [action.payload]);
    const { boardId, position } = response.data;
    if (belowId) {
      yield put(BoardsActions.removeTemp());
      yield put(BoardsActions.insertInPosition({
        ...action.payload,
        id: boardId,
        position,
      }));
    } else {
      yield put(BoardsActions.add({
        ...action.payload,
        id: boardId,
        position,
      }));
    }
    yield call(show, 'Board', 'Board created successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Board', error, ALERT_TYPES.DANGER);
  }
}

function* removeWorker(action: Action<IRemoveBoardRequest>) {
  try {
    yield* apply(boardService, boardService.remove, [action.payload]);
    yield call(show, 'Board', 'Board removed successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Board', error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(action: Action<IUpdateBoardRequest>) {
  try {
    yield* apply(boardService, boardService.update, [action.payload]);
    yield call(show, 'Board', 'Board updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Board', error, ALERT_TYPES.DANGER);
  }
}

function* updatePositionWorker(action: Action<IUpdateBoardPositionRequest>) {
  try {
    yield* apply(boardService, boardService.updatePosition, [action.payload]);
    yield call(show, 'Board', 'Board position updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Board', error, ALERT_TYPES.DANGER);
  }
}

export function* watchBoard() {
  yield* all([
    takeLatest(BoardsActions.Type.FETCH_ALL, fetchWorker),
    takeLatest(BoardsActions.Type.CREATE, createWorker),
    takeLatest(BoardsActions.Type.REMOVE, removeWorker),
    takeLatest(BoardsActions.Type.UPDATE_TITLE, updateWorker),
    takeLatest(BoardsActions.Type.UPDATE_DESCRIPTION, updateWorker),
    takeLatest(BoardsActions.Type.UPDATE_COLOR, updateWorker),
    takeLatest(BoardsActions.Type.UPDATE_CARD_TYPE, updateWorker),
    takeLatest(BoardsActions.Type.UPDATE_ICON, updateWorker),
    takeLatest(BoardsActions.Type.RESET_COLOR, updateWorker),
    takeLatest(BoardsActions.Type.UPDATE_POSITION, updatePositionWorker),
  ]);
}
