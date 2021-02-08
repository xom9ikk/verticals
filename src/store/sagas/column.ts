import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify/config';
import { TYPES } from '@/inversify/types';
import { IServices } from '@/inversify/interfaces';
import {
  ColumnsActions, SystemActions, TodosActions,
} from '@/store/actions';
import {
  IFetchColumnsByBoardId,
  ICreateColumn,
  IRemoveColumn,
  IUpdateColumnPosition,
  IDuplicateColumn,
  IReverseColumnOrder,
  IUpdateColumnTitle,
  IUpdateColumnDescription,
  IUpdateColumnColor,
  IUpdateColumnIsCollapsed,
} from '@/types/actions';
import { ITodo } from '@/types/entities';

const { columnService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* fetchByBoardIdWorker(action: PayloadAction<IFetchColumnsByBoardId>) {
  try {
    const response = yield* apply(columnService, columnService.getByBoardId, [action.payload]);
    const { columns } = response.data;
    yield put(ColumnsActions.setAll(columns));
    yield put(SystemActions.setIsLoadedColumns(true));
  } catch (error) {
    yield call(show, 'Column', error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(action: PayloadAction<ICreateColumn>) {
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

function* removeWorker(action: PayloadAction<IRemoveColumn>) {
  try {
    yield* apply(columnService, columnService.remove, [action.payload]);
    yield call(show, 'Column', 'Column removed successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Column', error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(action: PayloadAction<
IUpdateColumnTitle
& IUpdateColumnDescription
& IUpdateColumnColor
& IUpdateColumnIsCollapsed
>) {
  try {
    yield* apply(columnService, columnService.update, [action.payload]);
    yield call(show, 'Column', 'Column updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Column', error, ALERT_TYPES.DANGER);
  }
}

function* updatePositionWorker(action: PayloadAction<IUpdateColumnPosition>) {
  try {
    yield* apply(columnService, columnService.updatePosition, [action.payload]);
    yield call(show, 'Column', 'Column position updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Column', error, ALERT_TYPES.DANGER);
  }
}

function* duplicateWorker(action: PayloadAction<IDuplicateColumn>) {
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

function* reverseOrderWorker(action: PayloadAction<IReverseColumnOrder>) {
  try {
    yield* apply(columnService, columnService.reverseOrder, [action.payload]);
    yield call(show, 'Column', 'Reverse successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Column', error, ALERT_TYPES.DANGER);
  }
}

export function* watchColumn() {
  yield* all([
    takeLatest(ColumnsActions.fetchByBoardId, fetchByBoardIdWorker),
    takeLatest(ColumnsActions.create, createWorker),
    takeLatest(ColumnsActions.remove, removeWorker),
    takeLatest(ColumnsActions.updateTitle, updateWorker),
    takeLatest(ColumnsActions.updateDescription, updateWorker),
    takeLatest(ColumnsActions.updateColor, updateWorker),
    takeLatest(ColumnsActions.updateIsCollapsed, updateWorker),
    takeLatest(ColumnsActions.updatePosition, updatePositionWorker),
    takeLatest(ColumnsActions.duplicate, duplicateWorker),
    takeLatest(ColumnsActions.reverseOrder, reverseOrderWorker),
  ]);
}
