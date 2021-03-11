import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { SystemActions } from '@store/actions';
import { ISetSystemLanguage } from '@type/actions';
import { storage } from '@plugins/storage';
import { useAlert } from '@use/alert';
import i18n from '@/i18n';
import { LANGUAGE_CODES } from '@/constants';

const { show, ALERT_TYPES } = useAlert();

function* setLanguageWorker(action: PayloadAction<ISetSystemLanguage>) {
  try {
    const languageCode = LANGUAGE_CODES[action.payload];
    yield* apply(i18n, i18n.changeLanguage, [languageCode]);
    yield* apply(storage, storage.setLanguage, [action.payload]);
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

export function* watchSystem() {
  yield all([
    takeLatest(SystemActions.effect.setLanguage, setLanguageWorker),
    takeLatest(SystemActions.effect.fetchLanguage, fetchLanguageWorker),
  ]);
}
