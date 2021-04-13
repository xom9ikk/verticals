import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@use/alert';
import { CommentsActions, SubTodosActions } from '@store/actions';
import {
  ICreateSubTodo,
  IDuplicateSubTodo,
  IFetchSubTodosByBoardId,
  IMoveSubTodo,
  IRemoveSubTodo,
  IUpdateSubTodo,
} from '@type/actions';
import i18n from '@/i18n';
import { ISubTodoService } from '@inversify/interfaces/services';

const { show, ALERT_TYPES } = useAlert();

function* fetchByBoardIdWorker(subTodoService: ISubTodoService, action: PayloadAction<IFetchSubTodosByBoardId>) {
  try {
    const response = yield* apply(subTodoService, subTodoService.getByBoardId, [action.payload]);
    const { subTodos } = response.data;
    yield put(SubTodosActions.setAll(subTodos));
  } catch (error) {
    yield call(show, i18n.t('SubTodo'), error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(subTodoService: ISubTodoService, action: PayloadAction<ICreateSubTodo>) {
  try {
    const { belowId, files, ...entity } = action.payload;
    const response = yield* apply(subTodoService, subTodoService.create, [action.payload]);
    const { subTodoId, position } = response.data;
    if (files?.length) {
      yield put(CommentsActions.effect.create({
        subTodoId,
        text: '',
        files,
      }));
    }
    if (belowId) {
      yield put(SubTodosActions.removeTemp());
      yield put(SubTodosActions.insertInPosition({
        entity: {
          ...entity,
          id: subTodoId,
          attachmentsCount: 0,
          commentsCount: 0,
          imagesCount: 0,
        },
        position,
      }));
    } else {
      yield put(SubTodosActions.add({
        ...entity,
        id: subTodoId,
        attachmentsCount: 0,
        commentsCount: 0,
        imagesCount: 0,
      }));
    }
    yield call(show, i18n.t('SubTodo'), i18n.t('SubTodo created successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('SubTodo'), error, ALERT_TYPES.DANGER);
  }
}

function* removeWorker(subTodoService: ISubTodoService, action: PayloadAction<IRemoveSubTodo>) {
  try {
    yield put(SubTodosActions.remove(action.payload));
    yield* apply(subTodoService, subTodoService.remove, [action.payload]);
    yield call(show, i18n.t('SubTodo'), i18n.t('SubTodo removed successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('SubTodo'), error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(subTodoService: ISubTodoService, action: PayloadAction<IUpdateSubTodo>) {
  try {
    yield put(SubTodosActions.updateEntity(action.payload));
    yield* apply(subTodoService, subTodoService.update, [action.payload]);
    yield call(show, i18n.t('SubTodo'), i18n.t('SubTodo updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('SubTodo'), error, ALERT_TYPES.DANGER);
  }
}

function* moveWorker(subTodoService: ISubTodoService, action: PayloadAction<IMoveSubTodo>) {
  try {
    yield put(SubTodosActions.move(action.payload));
    yield* apply(subTodoService, subTodoService.updatePosition, [action.payload]);
    yield call(show, i18n.t('SubTodo'), i18n.t('SubTodo position updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('SubTodo'), error, ALERT_TYPES.DANGER);
  }
}

function* duplicateWorker(subTodoService: ISubTodoService, action: PayloadAction<IDuplicateSubTodo>) {
  try {
    const response = yield* apply(subTodoService, subTodoService.duplicate, [action.payload]);
    const {
      todoId, subTodoId, position, ...subTodo
    } = response.data;
    yield put(SubTodosActions.insertInPosition({
      entity: {
        ...subTodo,
        id: subTodoId,
        todoId,
        attachmentsCount: 0,
        commentsCount: 0,
        imagesCount: 0,
      },
      position,
    }));
    yield call(show, i18n.t('SubTodo'), i18n.t('SubTodo duplicated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('SubTodo'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchSubTodo(subTodoService: ISubTodoService) {
  yield all([
    takeLatest(SubTodosActions.effect.fetchByBoardId, fetchByBoardIdWorker, subTodoService),
    takeLatest(SubTodosActions.effect.create, createWorker, subTodoService),
    takeLatest(SubTodosActions.effect.remove, removeWorker, subTodoService),
    takeLatest(SubTodosActions.effect.update, updateWorker, subTodoService),
    takeLatest(SubTodosActions.effect.move, moveWorker, subTodoService),
    takeLatest(SubTodosActions.effect.duplicate, duplicateWorker, subTodoService),
  ]);
}
