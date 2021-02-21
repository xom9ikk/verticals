import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@use/alert';
import { container } from '@inversify/config';
import { TYPES } from '@inversify/types';
import { IServices } from '@inversify/interfaces';
import { CommentsActions, SystemActions, TodosActions } from '@store/actions';
import {
  ICreateTodo,
  IRemoveTodo,
  IUpdateTodoPosition,
  IDuplicateTodo,
  IFetchTodosByBoardId,
  IUpdateTodo,
} from '@type/actions';
import i18n from '@/i18n';

const { todoService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* fetchByBoardIdWorker(action: PayloadAction<IFetchTodosByBoardId>) {
  try {
    const response = yield* apply(todoService, todoService.getByBoardId, [action.payload]);
    const { todos } = response.data;
    yield put(TodosActions.setAll(todos));
    yield put(SystemActions.setIsLoadedTodos(true));
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

function* fetchRemovedWorker() {
  try {
    const response = yield* apply(todoService, todoService.getRemoved, []);
    const { todos } = response.data;
    yield put(TodosActions.setAll(todos));
    yield put(SystemActions.setIsLoadedColumns(true));
    yield put(SystemActions.setIsLoadedTodos(true));
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(action: PayloadAction<ICreateTodo>) {
  try {
    const { belowId, files, ...entity } = action.payload;
    const response = yield* apply(todoService, todoService.create, [action.payload]);
    const { todoId, position } = response.data;
    if (files?.length) {
      yield put(CommentsActions.create({
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

function* removeWorker(action: PayloadAction<IRemoveTodo>) {
  try {
    const { id } = action.payload;
    yield* apply(todoService, todoService.remove, [action.payload]);
    yield put(TodosActions.removeEntity({ id }));
    yield call(show, i18n.t('Todo'), i18n.t('Todo removed successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(action: PayloadAction<IUpdateTodo>) {
  try {
    yield* apply(todoService, todoService.update, [action.payload]);
    yield call(show, i18n.t('Todo'), i18n.t('Todo updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

function* updatePositionWorker(action: PayloadAction<IUpdateTodoPosition>) {
  try {
    yield* apply(todoService, todoService.updatePosition, [action.payload]);
    yield call(show, i18n.t('Todo'), i18n.t('Todo position updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
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
        attachmentsCount: 0,
        commentsCount: 0,
        imagesCount: 0,
      },
      position: todo.position,
    }));
    yield call(show, i18n.t('Todo'), i18n.t('Todo duplicated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Todo'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchTodo() {
  yield* all([
    takeLatest(TodosActions.fetchByBoardId, fetchByBoardIdWorker),
    takeLatest(TodosActions.fetchRemoved, fetchRemovedWorker),
    takeLatest(TodosActions.create, createWorker),
    takeLatest(TodosActions.remove, removeWorker),
    takeLatest(TodosActions.update, updateWorker),
    takeLatest(TodosActions.updatePosition, updatePositionWorker),
    takeLatest(TodosActions.duplicate, duplicateWorker),
  ]);
}
