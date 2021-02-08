import {
  all, apply, call, put, select, takeLatest,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify/config';
import { TYPES } from '@/inversify/types';
import { IServices } from '@/inversify/interfaces';
import {
  BoardsActions, SystemActions,
} from '@/store/actions';
import { getActiveBoardId, getUsername } from '@/store/selectors';
import { useReadableId } from '@/use/readableId';
import { forwardTo } from '@/router/history';
import {
  ICreateBoard,
  IRemoveBoard,
  IUpdateBoardCardType,
  IUpdateBoardColor,
  IUpdateBoardDescription,
  IUpdateBoardIcon,
  IUpdateBoardPosition,
  IUpdateBoardTitle,
} from '@/types/actions';

const { boardService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();
const { toReadableId } = useReadableId();

function* fetchWorker() {
  try {
    const response = yield* apply(boardService, boardService.getAll, []);
    const { boards } = response.data;
    yield put(BoardsActions.setAll(boards));
    yield put(SystemActions.setIsLoadedBoards(true));
    const currentBoardId = yield select(getActiveBoardId);
    const username = yield select(getUsername);
    if (currentBoardId === null) {
      const [board] = boards;
      if (board) {
        const { id, title } = board;
        const readableBoardId = toReadableId(title, id);
        forwardTo(`/${username}/${readableBoardId}`);
      }
    }
  } catch (error) {
    yield call(show, 'Board', error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(action: PayloadAction<ICreateBoard>) {
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

function* removeWorker(action: PayloadAction<IRemoveBoard>) {
  try {
    yield* apply(boardService, boardService.remove, [action.payload]);
    yield call(show, 'Board', 'Board removed successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Board', error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(action: PayloadAction<
IUpdateBoardTitle
& IUpdateBoardDescription
& IUpdateBoardColor
& IUpdateBoardCardType
& IUpdateBoardIcon
>) {
  try {
    yield* apply(boardService, boardService.update, [action.payload]);
    yield call(show, 'Board', 'Board updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Board', error, ALERT_TYPES.DANGER);
  }
}

function* updatePositionWorker(action: PayloadAction<IUpdateBoardPosition>) {
  try {
    yield* apply(boardService, boardService.updatePosition, [action.payload]);
    yield call(show, 'Board', 'Board position updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Board', error, ALERT_TYPES.DANGER);
  }
}

export function* watchBoard() {
  yield* all([
    takeLatest(BoardsActions.fetchAll, fetchWorker),
    takeLatest(BoardsActions.create, createWorker),
    takeLatest(BoardsActions.remove, removeWorker),
    takeLatest(BoardsActions.updateTitle, updateWorker),
    takeLatest(BoardsActions.updateDescription, updateWorker),
    takeLatest(BoardsActions.updateColor, updateWorker),
    takeLatest(BoardsActions.updateCardType, updateWorker),
    takeLatest(BoardsActions.updateIcon, updateWorker),
    takeLatest(BoardsActions.updatePosition, updatePositionWorker),
  ]);
}
