import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@use/alert';
import { UserActions } from '@store/actions';
import {
  IUpdateEmail, IUpdatePersonalData, IUpdateUsername, IUploadAvatar,
} from '@type/actions';
import i18n from '@/i18n';
import { IUserService } from '@inversify/interfaces/services';

const { show, ALERT_TYPES } = useAlert();

function* fetchMeWorker(userService: IUserService) {
  try {
    const response = yield* apply(userService, userService.getMe, []);
    const { data } = response;
    yield put(UserActions.setUserData(data));
  } catch (error) {
    yield call(show, i18n.t('User'), error, ALERT_TYPES.DANGER);
  }
}

function* updateUsernameWorker(userService: IUserService, action: PayloadAction<IUpdateUsername>) {
  try {
    yield* apply(userService, userService.update, [action.payload]);
    yield put(UserActions.setUsername(action.payload.username));
    yield call(show, i18n.t('User'), i18n.t('Username updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('User'), error, ALERT_TYPES.DANGER);
  }
}

function* updateEmailWorker(userService: IUserService, action: PayloadAction<IUpdateEmail>) {
  try {
    yield* apply(userService, userService.update, [action.payload]);
    yield put(UserActions.setEmail(action.payload.email));
    yield call(show, i18n.t('User'), i18n.t('Email updated successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('User'), error, ALERT_TYPES.DANGER);
  }
}

function* updatePersonalDataWorker(userService: IUserService, action: PayloadAction<IUpdatePersonalData>) {
  try {
    yield* apply(userService, userService.update, [action.payload]);
    yield put(UserActions.setPersonalData(action.payload));
    yield call(
      show, i18n.t('User'), i18n.t('Personal data updated successfully'), ALERT_TYPES.SUCCESS,
    );
  } catch (error) {
    yield call(show, i18n.t('User'), error, ALERT_TYPES.DANGER);
  }
}

function* uploadAvatarWorker(userService: IUserService, action: PayloadAction<IUploadAvatar>) {
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

function* removeAvatarWorker(userService: IUserService) {
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

export function* watchUser(userService: IUserService) {
  yield all([
    takeLatest(UserActions.effect.fetchMe, fetchMeWorker, userService),
    takeLatest(UserActions.effect.updateUsername, updateUsernameWorker, userService),
    takeLatest(UserActions.effect.updateEmail, updateEmailWorker, userService),
    takeLatest(UserActions.effect.updatePersonalData, updatePersonalDataWorker, userService),
    takeLatest(UserActions.effect.uploadAvatar, uploadAvatarWorker, userService),
    takeLatest(UserActions.effect.removeAvatar, removeAvatarWorker, userService),
  ]);
}
