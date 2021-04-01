import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@use/alert';
import { HeadingsActions } from '@store/actions';
import {
  ICreateHeading,
  IDuplicateHeading,
  IFetchHeadingsByBoardId,
  IMoveHeading,
  IRemoveHeading,
  IUpdateHeading,
} from '@type/actions';
import { EnumHeadingType } from '@type/entities';
import i18n from '@/i18n';
import { IHeadingService } from '@inversify/interfaces/services';

const { show, ALERT_TYPES } = useAlert();

function* fetchByBoardIdWorker(headingService: IHeadingService, action: PayloadAction<IFetchHeadingsByBoardId>) {
  try {
    const response = yield* apply(headingService, headingService.getByBoardId, [action.payload]);
    const { headings } = response.data;
    yield put(HeadingsActions.setAll(headings));
  } catch (error) {
    yield call(show, i18n.t('Heading'), error, ALERT_TYPES.DANGER);
  }
}

function* createWorker(headingService: IHeadingService, action: PayloadAction<ICreateHeading>) {
  try {
    const response = yield* apply(headingService, headingService.create, [action.payload]);
    const { headingId } = response.data;
    yield put(HeadingsActions.add({
      ...action.payload,
      id: headingId,
      type: EnumHeadingType.Custom,
    }));
    yield call(show, i18n.t('Heading'), i18n.t('Heading created successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Heading'), error, ALERT_TYPES.DANGER);
  }
}

function* removeWorker(headingService: IHeadingService, action: PayloadAction<IRemoveHeading>) {
  try {
    yield put(HeadingsActions.remove(action.payload));
    yield* apply(headingService, headingService.remove, [action.payload]);
    yield call(show, i18n.t('Heading'), i18n.t('Heading removed successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Heading'), error, ALERT_TYPES.DANGER);
  }
}

function* updateWorker(headingService: IHeadingService, action: PayloadAction<IUpdateHeading>) {
  try {
    yield put(HeadingsActions.updateEntity(action.payload));
    yield* apply(headingService, headingService.update, [action.payload]);
    yield call(show, i18n.t('Heading'), i18n.t('Heading updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Heading'), error, ALERT_TYPES.DANGER);
  }
}

function* moveWorker(headingService: IHeadingService, action: PayloadAction<IMoveHeading>) {
  try {
    yield put(HeadingsActions.move(action.payload));
    yield* apply(headingService, headingService.updatePosition, [action.payload]);
    yield call(show, i18n.t('Heading'), i18n.t('Heading position updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Heading'), error, ALERT_TYPES.DANGER);
  }
}

function* duplicateWorker(headingService: IHeadingService, action: PayloadAction<IDuplicateHeading>) {
  try {
    const response = yield* apply(headingService, headingService.duplicate, [action.payload]);
    const {
      headingId, todos, position, ...heading
    } = response.data;
    yield put(HeadingsActions.insertInPosition({
      entity: {
        ...heading,
        id: headingId,
        type: EnumHeadingType.Custom,
      },
      position,
    }));
    yield call(show, i18n.t('Heading'), i18n.t('Heading duplicated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Heading'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchHeading(headingService: IHeadingService) {
  yield all([
    takeLatest(HeadingsActions.effect.fetchByBoardId, fetchByBoardIdWorker, headingService),
    takeLatest(HeadingsActions.effect.create, createWorker, headingService),
    takeLatest(HeadingsActions.effect.remove, removeWorker, headingService),
    takeLatest(HeadingsActions.effect.update, updateWorker, headingService),
    takeLatest(HeadingsActions.effect.move, moveWorker, headingService),
    takeLatest(HeadingsActions.effect.duplicate, duplicateWorker, headingService),
  ]);
}
