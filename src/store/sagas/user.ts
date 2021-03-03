import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@use/alert';
import { container } from '@inversify/config';
import { TYPES } from '@inversify/types';
import { IServices } from '@inversify/interfaces';
import { UserActions } from '@store/actions';
import {
  IUpdateEmail, IUpdatePersonalData, IUpdateUsername, IUploadAvatar,
} from '@type/actions';
import i18n from '@/i18n';

const { userService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* fetchMeWorker() {
  try {
    const response = yield* apply(userService, userService.getMe, []);
    const { data } = response;
    yield put(UserActions.setUserData(data));
  } catch (error) {
    yield call(show, i18n.t('User'), error, ALERT_TYPES.DANGER);
  }
}

function* updateUsernameWorker(action: PayloadAction<IUpdateUsername>) {
  try {
    yield* apply(userService, userService.update, [action.payload]);
    yield put(UserActions.setUsername(action.payload.username));
    yield call(show, i18n.t('User'), i18n.t('Username updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('User'), error, ALERT_TYPES.DANGER);
  }
}

function* updateEmailWorker(action: PayloadAction<IUpdateEmail>) {
  try {
    yield* apply(userService, userService.update, [action.payload]);
    yield put(UserActions.setEmail(action.payload.email));
    yield call(show, i18n.t('User'), i18n.t('Email updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('User'), error, ALERT_TYPES.DANGER);
  }
}

function* updatePersonalDataWorker(action: PayloadAction<IUpdatePersonalData>) {
  try {
    yield* apply(userService, userService.update, [action.payload]);
    const { name, surname, bio } = action.payload;
    yield put(UserActions.setPersonalData({
      name: name!,
      surname: surname!,
      bio: bio!,
    }));
    yield call(
      show, i18n.t('User'), i18n.t('Personal data updated successfully'), ALERT_TYPES.SUCCESS,
    );
  } catch (error) {
    yield call(show, i18n.t('User'), error, ALERT_TYPES.DANGER);
  }
}

function* uploadAvatarWorker(action: PayloadAction<IUploadAvatar>) {
  try {
    const response = yield* apply(userService, userService.uploadAvatar, [action.payload]);
    const { avatar } = response.data;
    yield put(UserActions.setAvatar(avatar));
    yield call(
      show, i18n.t('User'), i18n.t('Avatar successfully uploaded'), ALERT_TYPES.SUCCESS,
    );
  } catch (error) {
    yield call(show, i18n.t('User'), error, ALERT_TYPES.DANGER);
  }
}

function* removeAvatarWorker() {
  try {
    yield* apply(userService, userService.removeAvatar, []);
    yield call(
      show, i18n.t('User'), i18n.t('Avatar removed successfully'), ALERT_TYPES.SUCCESS,
    );
    yield put(UserActions.setAvatar(null));
  } catch (error) {
    yield call(show, i18n.t('User'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchUser() {
  yield all([
    takeLatest(UserActions.fetchMe, fetchMeWorker),
    takeLatest(UserActions.updateUsername, updateUsernameWorker),
    takeLatest(UserActions.updateEmail, updateEmailWorker),
    takeLatest(UserActions.updatePersonalData, updatePersonalDataWorker),
    takeLatest(UserActions.uploadAvatar, uploadAvatarWorker),
    takeLatest(UserActions.removeAvatar, removeAvatarWorker),
  ]);
}
