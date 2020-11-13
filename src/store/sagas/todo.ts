import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { Action } from 'redux-actions';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify/config';
import { TYPES } from '@/inversify/types';
import { IServices } from '@/inversify/interfaces';
import { SystemActions, TodosActions } from '@/store/actions';
import {
  ICreateTodoRequest,
  IRemoveTodoRequest,
  IUpdateTodoRequest,
  IUpdateTodoPositionRequest,
  IGetTodosByBoardIdRequest,
  IDuplicateTodoRequest,
} from '@/types/api';

const { todoService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* fetchByBoardIdWorker(action: Action<IGetTodosByBoardIdRequest>) {
  try {
    const response = yield* apply(todoService, todoService.getByBoardId, [action.payload]);
    const { todos } = response.data;
    yield put(TodosActions.setAll(todos));
    yield put(SystemActions.setIsLoadedTodos(true));
  } catch (error) {
    yield call(show, 'Todo', error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(action: Action<ICreateTodoRequest>) {
  try {
    const { belowId } = action.payload;
    const response = yield* apply(todoService, todoService.create, [action.payload]);
    const { todoId, position } = response.data;
    if (belowId) {
      yield put(TodosActions.removeTemp());
      yield put(TodosActions.insertInPosition({
        ...action.payload,
        id: todoId,
        position,
      }));
    } else {
      yield put(TodosActions.add({
        ...action.payload,
        id: todoId,
        position,
      }));
    }
    yield call(show, 'Todo', 'Todo created successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Todo', error, ALERT_TYPES.DANGER);
  }
}

function* removeWorker(action: Action<IRemoveTodoRequest>) {
  try {
    yield* apply(todoService, todoService.remove, [action.payload]);
    yield call(show, 'Todo', 'Todo removed successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Todo', error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(action: Action<IUpdateTodoRequest>) {
  try {
    yield* apply(todoService, todoService.update, [action.payload]);
    yield call(show, 'Todo', 'Todo updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Todo', error, ALERT_TYPES.DANGER);
  }
}

function* updatePositionWorker(action: Action<IUpdateTodoPositionRequest>) {
  try {
    yield* apply(todoService, todoService.updatePosition, [action.payload]);
    yield call(show, 'Todo', 'Todo position updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Todo', error, ALERT_TYPES.DANGER);
  }
}

function* duplicateWorker(action: Action<IDuplicateTodoRequest>) {
  try {
    const response = yield* apply(todoService, todoService.duplicate, [action.payload]);
    const { columnId, todoId, ...todo } = response.data;
    yield put(TodosActions.insertInPosition({
      id: todoId,
      columnId,
      ...todo,
    }));
    yield call(show, 'Todo', 'Todo duplicated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Todo', error, ALERT_TYPES.DANGER);
  }
}

export function* watchTodo() {
  yield* all([
    takeLatest(TodosActions.Type.FETCH_BY_BOARD_ID, fetchByBoardIdWorker),
    takeLatest(TodosActions.Type.CREATE, createWorker),
    takeLatest(TodosActions.Type.REMOVE, removeWorker),
    takeLatest(TodosActions.Type.UPDATE_TITLE, updateWorker),
    takeLatest(TodosActions.Type.UPDATE_DESCRIPTION, updateWorker),
    takeLatest(TodosActions.Type.UPDATE_COLOR, updateWorker),
    takeLatest(TodosActions.Type.UPDATE_COMPLETE_STATUS, updateWorker),
    takeLatest(TodosActions.Type.UPDATE_IS_ARCHIVE, updateWorker),
    takeLatest(TodosActions.Type.UPDATE_NOTIFICATION_ENABLED, updateWorker),
    takeLatest(TodosActions.Type.UPDATE_POSITION, updatePositionWorker),
    takeLatest(TodosActions.Type.DUPLICATE, duplicateWorker),
  ]);
}
