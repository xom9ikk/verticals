import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';

import i18n from '@/i18n';
import { ITodoService } from '@inversify/interfaces/services';
import { CommentsActions, SystemActions, TodosActions } from '@store/actions';
import {
  ICreateTodo,
  IDuplicateTodo,
  IFetchTodosByBoardId,
  IMoveTodo,
  IRemoveTodo,
  ISwitchArchivedTodo, ISwitchRemovedTodo, IUpdateTodo,
} from '@type/actions';
import { useAlert } from '@use/alert';

const { show, ALERT_TYPES } = useAlert();

function* fetchByBoardIdWorker(todoService: ITodoService, action: PayloadAction<IFetchTodosByBoardId>) {
  try {
    const response = yield* apply(todoService, todoService.getByBoardId, [action.payload]);
    const { todos } = response.data;
    yield put(TodosActions.setAll(todos));
    yield put(SystemActions.setIsLoadedTodos(true));
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

function* fetchRemovedWorker(todoService: ITodoService) {
  try {
    yield put(SystemActions.setIsLoadedColumns(false));
    yield put(SystemActions.setIsLoadedTodos(false));
    const response = yield* apply(todoService, todoService.getRemoved, []);
    const { todos } = response.data;
    yield put(TodosActions.setAll(todos));
    yield put(SystemActions.setIsLoadedColumns(true));
    yield put(SystemActions.setIsLoadedTodos(true));
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(todoService: ITodoService, action: PayloadAction<ICreateTodo>) {
  try {
    const { belowId, files, ...entity } = action.payload;
    const response = yield* apply(todoService, todoService.create, [action.payload]);
    const { todoId, position } = response.data;
    if (files?.length) {
      yield put(CommentsActions.effect.create({
        todoId,
        text: '',
        files,
      }));
    }
    if (belowId) {
      yield put(TodosActions.removeTemp());
      yield put(TodosActions.insertInPosition({
        entity: {
          ...entity,
          id: todoId,
          attachmentsCount: 0,
          commentsCount: 0,
          imagesCount: 0,
        },
        position,
      }));
    } else {
      yield put(TodosActions.add({
        ...entity,
        id: todoId,
        attachmentsCount: 0,
        commentsCount: 0,
        imagesCount: 0,
      }));
    }
    yield call(show, i18n.t('Todo'), i18n.t('Todo created successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

function* removeWorker(todoService: ITodoService, action: PayloadAction<IRemoveTodo>) {
  try {
    yield put(TodosActions.remove(action.payload));
    yield* apply(todoService, todoService.remove, [action.payload]);
    yield call(show, i18n.t('Todo'), i18n.t('Todo removed successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(todoService: ITodoService, action: PayloadAction<IUpdateTodo>) {
  try {
    yield put(TodosActions.updateEntity(action.payload));
    yield* apply(todoService, todoService.update, [action.payload]);
    yield call(show, i18n.t('Todo'), i18n.t('Todo updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

function* moveWorker(todoService: ITodoService, action: PayloadAction<IMoveTodo>) {
  try {
    yield put(TodosActions.move(action.payload));
    yield* apply(todoService, todoService.updatePosition, [action.payload]);
    yield call(show, i18n.t('Todo'), i18n.t('Todo position updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

function* duplicateWorker(todoService: ITodoService, action: PayloadAction<IDuplicateTodo>) {
  try {
    const response = yield* apply(todoService, todoService.duplicate, [action.payload]);
    const {
      headingId, todoId, position, ...todo
    } = response.data;
    yield put(TodosActions.insertInPosition({
      entity: {
        ...todo,
        id: todoId,
        headingId,
        attachmentsCount: 0,
        commentsCount: 0,
        imagesCount: 0,
      },
      position,
    }));
    yield call(show, i18n.t('Todo'), i18n.t('Todo duplicated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

function* switchArchivedWorker(todoService: ITodoService, action: PayloadAction<ISwitchArchivedTodo>) {
  try {
    yield* apply(todoService, todoService.switchArchived, [action.payload]);
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

function* switchRemovedWorker(todoService: ITodoService, action: PayloadAction<ISwitchRemovedTodo>) {
  try {
    yield* apply(todoService, todoService.switchRemoved, [action.payload]);
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchTodo(todoService: ITodoService) {
  yield all([
    takeLatest(TodosActions.effect.fetchByBoardId, fetchByBoardIdWorker, todoService),
    takeLatest(TodosActions.effect.fetchRemoved, fetchRemovedWorker, todoService),
    takeLatest(TodosActions.effect.create, createWorker, todoService),
    takeLatest(TodosActions.effect.remove, removeWorker, todoService),
    takeLatest(TodosActions.effect.update, updateWorker, todoService),
    takeLatest(TodosActions.effect.move, moveWorker, todoService),
    takeLatest(TodosActions.effect.duplicate, duplicateWorker, todoService),
    takeLatest(TodosActions.effect.switchArchived, switchArchivedWorker, todoService),
    takeLatest(TodosActions.effect.switchRemoved, switchRemovedWorker, todoService),
  ]);
}
