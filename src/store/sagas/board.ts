import {
  all, apply, call, put, select, takeLatest,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@use/alert';
import { container } from '@inversify/config';
import { TYPES } from '@inversify/types';
import { IServices } from '@inversify/interfaces';
import {
  BoardsActions, SystemActions,
} from '@store/actions';
import {
  getActiveBoardId, getUsername,
} from '@store/selectors';
import { useReadableId } from '@use/readableId';
import { redirectTo } from '@router/history';
import {
  ICreateBoard,
  IRemoveBoard,
  IUpdateBoard,
  IMoveBoard,
} from '@type/actions';
import i18n from '@/i18n';

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
      const firstBoardId = boards.positions[0];
      const firstBoard = boards.entities.find((board) => board.id === firstBoardId);
      if (firstBoard) {
        const { id, title } = firstBoard;
        const readableBoardId = toReadableId(title, id);
        yield call(redirectTo, `/${username}/${readableBoardId}`);
      }
    }
  } catch (error) {
    yield call(show, i18n.t('Board'), error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(action: PayloadAction<ICreateBoard>) {
  try {
    const { belowId, ...board } = action.payload;
    const response = yield* apply(boardService, boardService.create, [action.payload]);
    const { boardId, position } = response.data;
    if (belowId) {
      yield put(BoardsActions.removeTemp());
      yield put(BoardsActions.insertInPosition({
        entity: {
          ...board,
          id: boardId,
        },
        position,
      }));
    } else {
      yield put(BoardsActions.add({
        ...action.payload,
        id: boardId,
      }));
    }
    yield call(show, i18n.t('Board'), i18n.t('Board created successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Board'), error, ALERT_TYPES.DANGER);
  }
}

function* removeWorker(action: PayloadAction<IRemoveBoard>) {
  try {
    yield put(BoardsActions.remove(action.payload));
    yield* apply(boardService, boardService.remove, [action.payload]);
    yield call(show, i18n.t('Board'), i18n.t('Board removed successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Board'), error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(action: PayloadAction<IUpdateBoard>) {
  try {
    yield put(BoardsActions.updateEntity(action.payload));
    yield* apply(boardService, boardService.update, [action.payload]);
    yield call(show, i18n.t('Board'), i18n.t('Board updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Board'), error, ALERT_TYPES.DANGER);
  }
}

function* moveWorker(action: PayloadAction<IMoveBoard>) {
  try {
    yield put(BoardsActions.move(action.payload));
    yield* apply(boardService, boardService.updatePosition, [action.payload]);
    yield call(show, i18n.t('Board'), i18n.t('Board position updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Board'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchBoard() {
  yield* all([
    takeLatest(BoardsActions.effect.fetchAll, fetchWorker),
    takeLatest(BoardsActions.effect.create, createWorker),
    takeLatest(BoardsActions.effect.remove, removeWorker),
    takeLatest(BoardsActions.effect.update, updateWorker),
    takeLatest(BoardsActions.effect.move, moveWorker),
  ]);
}
