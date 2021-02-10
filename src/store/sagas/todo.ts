import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@use/alert';
import { container } from '@inversify/config';
import { TYPES } from '@inversify/types';
import { IServices } from '@inversify/interfaces';
import { SystemActions, TodosActions } from '@store/actions';
import {
  ICreateTodo,
  IRemoveTodo,
  IUpdateTodoPosition,
  IDuplicateTodo,
  IFetchTodosByBoardId,
  IUpdateTodoTitle,
  IUpdateTodoDescription,
  IUpdateTodoColor,
  IUpdateTodoCompleteStatus,
  IUpdateTodoNotificationsEnabled, IUpdateTodoIsArchive,
} from '@type/actions';

const { todoService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* fetchByBoardIdWorker(action: PayloadAction<IFetchTodosByBoardId>) {
  try {
    const response = yield* apply(todoService, todoService.getByBoardId, [action.payload]);
    const { todos } = response.data;
    yield put(TodosActions.setAll(todos));
    yield put(SystemActions.setIsLoadedTodos(true));
  } catch (error) {
    yield call(show, 'Todo', error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(action: PayloadAction<ICreateTodo>) {
  try {
    const { belowId } = action.payload;
    const response = yield* apply(todoService, todoService.create, [action.payload]);
    const { todoId, position } = response.data;
    if (belowId) {
      yield put(TodosActions.removeTemp());
      yield put(TodosActions.insertInPosition({
        entity: {
          ...action.payload,
          id: todoId,
          attachmentsCount: 0, // TODO: get from backend
          commentsCount: 0, // TODO: get from backend
          imagesCount: 0, // TODO: get from backend
        },
        position,
      }));
    } else {
      yield put(TodosActions.add({
        ...action.payload,
        id: todoId,
        attachmentsCount: 0, // TODO: get from backend
        commentsCount: 0, // TODO: get from backend
        imagesCount: 0, // TODO: get from backend
      }));
    }
    yield call(show, 'Todo', 'Todo created successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Todo', error, ALERT_TYPES.DANGER);
  }
}

function* removeWorker(action: PayloadAction<IRemoveTodo>) {
  try {
    yield* apply(todoService, todoService.remove, [action.payload]);
    yield call(show, 'Todo', 'Todo removed successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Todo', error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(action: PayloadAction<
IUpdateTodoTitle
& IUpdateTodoDescription
& IUpdateTodoColor
& IUpdateTodoCompleteStatus
& IUpdateTodoIsArchive
& IUpdateTodoNotificationsEnabled
>) {
  try {
    yield* apply(todoService, todoService.update, [action.payload]);
    yield call(show, 'Todo', 'Todo updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Todo', error, ALERT_TYPES.DANGER);
  }
}

function* updatePositionWorker(action: PayloadAction<IUpdateTodoPosition>) {
  try {
    yield* apply(todoService, todoService.updatePosition, [action.payload]);
    yield call(show, 'Todo', 'Todo position updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Todo', error, ALERT_TYPES.DANGER);
  }
}

function* duplicateWorker(action: PayloadAction<IDuplicateTodo>) {
  try {
    const response = yield* apply(todoService, todoService.duplicate, [action.payload]);
    const { columnId, todoId, ...todo } = response.data;
    yield put(TodosActions.insertInPosition({
      entity: {
        id: todoId,
        columnId,
        ...todo,
        attachmentsCount: 0, // TODO: get from backend
        commentsCount: 0, // TODO: get from backend
        imagesCount: 0, // TODO: get from backend
      },
      position: todo.position,
    }));
    yield call(show, 'Todo', 'Todo duplicated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Todo', error, ALERT_TYPES.DANGER);
  }
}

export function* watchTodo() {
  yield* all([
    takeLatest(TodosActions.fetchByBoardId, fetchByBoardIdWorker),
    takeLatest(TodosActions.create, createWorker),
    takeLatest(TodosActions.remove, removeWorker),
    takeLatest(TodosActions.updateTitle, updateWorker),
    takeLatest(TodosActions.updateDescription, updateWorker),
    takeLatest(TodosActions.updateColor, updateWorker),
    takeLatest(TodosActions.updateCompleteStatus, updateWorker),
    takeLatest(TodosActions.updateIsArchive, updateWorker),
    takeLatest(TodosActions.updateNotificationEnabled, updateWorker),
    takeLatest(TodosActions.updatePosition, updatePositionWorker),
    takeLatest(TodosActions.duplicate, duplicateWorker),
  ]);
}
