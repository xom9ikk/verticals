import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { Action } from 'redux-actions';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { IServices } from '@/inversify.interfaces';
import {
  ColumnsActions, SystemActions, TodosActions,
} from '@/store/actions';
import {
  ICreateColumnRequest,
  IRemoveColumnRequest,
  IUpdateColumnRequest,
  IUpdateColumnPositionRequest,
  IGetColumnsByBoardIdRequest,
  IDuplicateColumnRequest, IReverseColumnOrderRequest,
} from '@/types/api';
import { ITodo } from '@/types';

const { columnService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* fetchByBoardIdWorker(action: Action<IGetColumnsByBoardIdRequest>) {
  try {
    const response = yield* apply(columnService, columnService.getByBoardId, [action.payload]);
    const { columns } = response.data;
    yield put(ColumnsActions.setAll(columns));
    yield put(SystemActions.setIsLoadedColumns(true));
  } catch (error) {
    yield call(show, 'Column', error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(action: Action<ICreateColumnRequest>) {
  try {
    const { belowId } = action.payload;
    const response = yield* apply(columnService, columnService.create, [action.payload]);
    const { columnId, position } = response.data;
    if (belowId) {
      yield put(ColumnsActions.removeTemp());
      yield put(ColumnsActions.insertInPosition({
        ...action.payload,
        id: columnId,
        position,
      }));
    } else {
      yield put(ColumnsActions.add({
        ...action.payload,
        id: columnId,
        position,
      }));
    }
    yield call(show, 'Column', 'Column created successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Column', error, ALERT_TYPES.DANGER);
  }
}

function* removeWorker(action: Action<IRemoveColumnRequest>) {
  try {
    yield* apply(columnService, columnService.remove, [action.payload]);
    yield call(show, 'Column', 'Column removed successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Column', error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(action: Action<IUpdateColumnRequest>) {
  try {
    yield* apply(columnService, columnService.update, [action.payload]);
    yield call(show, 'Column', 'Column updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Column', error, ALERT_TYPES.DANGER);
  }
}

function* updatePositionWorker(action: Action<IUpdateColumnPositionRequest>) {
  try {
    yield* apply(columnService, columnService.updatePosition, [action.payload]);
    yield call(show, 'Column', 'Column position updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Column', error, ALERT_TYPES.DANGER);
  }
}

function* duplicateWorker(action: Action<IDuplicateColumnRequest>) {
  try {
    const response = yield* apply(columnService, columnService.duplicate, [action.payload]);
    const { columnId, todos, ...column } = response.data;
    yield put(ColumnsActions.insertInPosition({
      id: columnId,
      ...column,
    }));
    yield all(todos.map((todo: ITodo) => put(TodosActions.add(todo))));
    yield call(show, 'Column', 'Column duplicated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Column', error, ALERT_TYPES.DANGER);
  }
}

function* reverseOrderWorker(action: Action<IReverseColumnOrderRequest>) {
  try {
    yield* apply(columnService, columnService.reverseOrder, [action.payload]);
    yield call(show, 'Column', 'Reverse successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Column', error, ALERT_TYPES.DANGER);
  }
}

export function* watchColumn() {
  yield* all([
    takeLatest(ColumnsActions.Type.FETCH_BY_BOARD_ID, fetchByBoardIdWorker),
    takeLatest(ColumnsActions.Type.CREATE, createWorker),
    takeLatest(ColumnsActions.Type.REMOVE, removeWorker),
    takeLatest(ColumnsActions.Type.UPDATE_TITLE, updateWorker),
    takeLatest(ColumnsActions.Type.UPDATE_DESCRIPTION, updateWorker),
    takeLatest(ColumnsActions.Type.UPDATE_COLOR, updateWorker),
    takeLatest(ColumnsActions.Type.UPDATE_IS_COLLAPSED, updateWorker),
    takeLatest(ColumnsActions.Type.UPDATE_POSITION, updatePositionWorker),
    takeLatest(ColumnsActions.Type.DUPLICATE, duplicateWorker),
    takeLatest(ColumnsActions.Type.REVERSE_ORDER, reverseOrderWorker),
  ]);
}
