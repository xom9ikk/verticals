import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@use/alert';
import {
  ColumnsActions, SystemActions, TodosActions,
} from '@store/actions';
import {
  IFetchColumnsByBoardId,
  ICreateColumn,
  IRemoveColumn,
  IMoveColumn,
  IDuplicateColumn,
  IReverseColumnOrder,
  IUpdateColumn,
} from '@type/actions';
import { ITodo } from '@type/entities';
import i18n from '@/i18n';
import { IColumnService } from '@inversify/interfaces/services';

const { show, ALERT_TYPES } = useAlert();

function* fetchByBoardIdWorker(columnService: IColumnService, action: PayloadAction<IFetchColumnsByBoardId>) {
  try {
    const response = yield* apply(columnService, columnService.getByBoardId, [action.payload]);
    const { columns } = response.data;
    yield put(ColumnsActions.setAll(columns));
    yield put(SystemActions.setIsLoadedColumns(true));
  } catch (error) {
    yield call(show, i18n.t('Column'), error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(columnService: IColumnService, action: PayloadAction<ICreateColumn>) {
  try {
    const { belowId, ...column } = action.payload;
    const response = yield* apply(columnService, columnService.create, [action.payload]);
    const { columnId, position } = response.data;
    if (belowId) {
      yield put(ColumnsActions.removeTemp());
      yield put(ColumnsActions.insertInPosition({
        entity: {
          ...column,
          id: columnId,
        },
        position,
      }));
    } else {
      yield put(ColumnsActions.add({
        ...action.payload,
        id: columnId,
      }));
    }
    yield call(show, i18n.t('Column'), i18n.t('Column created successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Column'), error, ALERT_TYPES.DANGER);
  }
}

function* removeWorker(columnService: IColumnService, action: PayloadAction<IRemoveColumn>) {
  try {
    yield put(ColumnsActions.remove(action.payload));
    yield* apply(columnService, columnService.remove, [action.payload]);
    yield call(show, i18n.t('Column'), i18n.t('Column removed successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Column'), error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(columnService: IColumnService, action: PayloadAction<IUpdateColumn>) {
  try {
    yield put(ColumnsActions.updateEntity(action.payload));
    yield* apply(columnService, columnService.update, [action.payload]);
    yield call(show, i18n.t('Column'), i18n.t('Column updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Column'), error, ALERT_TYPES.DANGER);
  }
}

function* moveWorker(columnService: IColumnService, action: PayloadAction<IMoveColumn>) {
  try {
    yield put(ColumnsActions.move(action.payload));
    yield* apply(columnService, columnService.updatePosition, [action.payload]);
    yield call(show, i18n.t('Column'), i18n.t('Column position updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Column'), error, ALERT_TYPES.DANGER);
  }
}

function* duplicateWorker(columnService: IColumnService, action: PayloadAction<IDuplicateColumn>) {
  try {
    const response = yield* apply(columnService, columnService.duplicate, [action.payload]);
    const {
      columnId, todos, position, ...column
    } = response.data;
    yield put(ColumnsActions.insertInPosition({
      entity: {
        ...column,
        id: columnId,
      },
      position,
    }));
    yield all(todos.entities.map((todo: ITodo) => put(TodosActions.add(todo))));
    yield call(show, i18n.t('Column'), i18n.t('Column duplicated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Column'), error, ALERT_TYPES.DANGER);
  }
}

function* reverseOrderWorker(columnService: IColumnService, action: PayloadAction<IReverseColumnOrder>) {
  try {
    yield put(ColumnsActions.reverseOrder(action.payload));
    yield* apply(columnService, columnService.reverseOrder, [action.payload]);
    yield call(show, i18n.t('Column'), i18n.t('Reverse successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Column'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchColumn(columnService: IColumnService) {
  yield all([
    takeLatest(ColumnsActions.effect.fetchByBoardId, fetchByBoardIdWorker, columnService),
    takeLatest(ColumnsActions.effect.create, createWorker, columnService),
    takeLatest(ColumnsActions.effect.remove, removeWorker, columnService),
    takeLatest(ColumnsActions.effect.update, updateWorker, columnService),
    takeLatest(ColumnsActions.effect.move, moveWorker, columnService),
    takeLatest(ColumnsActions.effect.duplicate, duplicateWorker, columnService),
    takeLatest(ColumnsActions.effect.reverseOrder, reverseOrderWorker, columnService),
  ]);
}
