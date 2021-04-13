import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, apply, call, put, select, takeLatest,
} from 'typed-redux-saga';

import { LANGUAGE_CODES, NEW_TODO_ID } from '@/constants';
import i18n from '@/i18n';
import { storage } from '@plugins/storage';
import { SystemActions } from '@store/actions';
import { getDefaultHeadingIdByColumnId } from '@store/selectors';
import { ISetSystemLanguage } from '@type/actions';
import { useAlert } from '@use/alert';

const { show, ALERT_TYPES } = useAlert();

function* setLanguageWorker(action: PayloadAction<ISetSystemLanguage>) {
  try {
    const languageCode = LANGUAGE_CODES[action.payload];
    yield* apply(i18n, i18n.changeLanguage, [languageCode]);
    yield* apply(storage, storage.setLanguage, [action.payload]);
    yield put(SystemActions.setLanguage(action.payload));
  } catch (error) {
    yield call(show, i18n.t('System'), error, ALERT_TYPES.DANGER);
  }
}

function* fetchLanguageWorker() {
  try {
    const language = yield* apply(storage, storage.getLanguage, []);
    const normalizedLanguage = language || 0;
    yield put(SystemActions.setLanguage(normalizedLanguage));
  } catch (error) {
    yield call(show, i18n.t('System'), error, ALERT_TYPES.DANGER);
  }
}

function* setEditableCardIdByColumnIdWorker(action: PayloadAction<any>) {
  try {
    const columnId = action.payload;
    const defaultHeadingId = yield select(getDefaultHeadingIdByColumnId(columnId));
    yield put(SystemActions.setEditableCardId(`${defaultHeadingId}-${NEW_TODO_ID}`));
  } catch (error) {
    yield call(show, i18n.t('System'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchSystem() {
  yield all([
    takeLatest(SystemActions.effect.setLanguage, setLanguageWorker),
    takeLatest(SystemActions.effect.fetchLanguage, fetchLanguageWorker),
    takeLatest(SystemActions.effect.setEditableCardIdByColumnId, setEditableCardIdByColumnIdWorker),
  ]);
}
