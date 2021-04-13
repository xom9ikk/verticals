import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';

import i18n from '@/i18n';
import { IAuthService } from '@inversify/interfaces/services';
import { storage } from '@plugins/storage';
import { redirectTo } from '@router/history';
import { AuthActions, SystemActions } from '@store/actions';
import {
  IChangePassword,
  IResetPassword,
  ISetAuthInfo,
  ISignIn,
  ISignUp,
} from '@type/actions';
import { useAlert } from '@use/alert';

const { show, ALERT_TYPES } = useAlert();

function* signUpWorker(authService: IAuthService, action: PayloadAction<ISignUp>) {
  try {
    const response = yield* apply(authService, authService.signUp, [action.payload]);
    const { token, refreshToken } = response.data;
    yield put(AuthActions.effect.setAuthInfo({
      token,
      refreshToken,
    }));
    yield call(redirectTo, '/');
    yield call(show, i18n.t('Success'), i18n.t('Registration completed successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Error'), error, ALERT_TYPES.DANGER);
  }
}

function* signInWorker(authService: IAuthService, action: PayloadAction<ISignIn>) {
  try {
    const response = yield* apply(authService, authService.signIn, [action.payload]);
    const { token, refreshToken } = response.data;
    yield put(AuthActions.effect.setAuthInfo({
      token,
      refreshToken,
    }));
    yield call(show, i18n.t('Success'), i18n.t('Successful login'), ALERT_TYPES.SUCCESS);
    yield call(redirectTo, '/');
  } catch (error) {
    yield call(show, i18n.t('Error'), error, ALERT_TYPES.DANGER);
  }
}

function* setAuthInfoWorker(authService: IAuthService, action: PayloadAction<ISetAuthInfo>) {
  try {
    const { token, refreshToken } = action.payload;
    yield call(storage.setToken, token);
    yield call(storage.setRefreshToken, refreshToken);
  } catch (error) {
    yield call(show, i18n.t('Error'), error, ALERT_TYPES.DANGER);
  }
}

function* logoutWorker(authService: IAuthService) {
  try {
    yield apply(authService, authService.logout, []);
    yield call(show, i18n.t('Success'), i18n.t('Successful logout'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Error'), error, ALERT_TYPES.DANGER);
  } finally {
    yield put(AuthActions.effect.setAuthInfo({
      token: '',
      refreshToken: '',
    }));
    yield put(SystemActions.setActiveBoardId(null));
    yield call(redirectTo, '/auth/login');
  }
}

function* resetPasswordWorker(authService: IAuthService, action: PayloadAction<IResetPassword>) {
  try {
    yield* apply(authService, authService.reset, [action.payload]);
    yield call(show, i18n.t('Success'), i18n.t('Successful reset password'), ALERT_TYPES.SUCCESS);
    yield call(redirectTo, '/auth/login');
  } catch (error) {
    yield call(show, i18n.t('Error'), error, ALERT_TYPES.DANGER);
  }
}

function* changePasswordWorker(authService: IAuthService, action: PayloadAction<IChangePassword>) {
  try {
    yield* apply(authService, authService.change, [action.payload]);
    yield call(show, i18n.t('Success'), i18n.t('Successful change password'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Error'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchAuth(authService: IAuthService) {
  yield all([
    takeLatest(AuthActions.effect.signUp, signUpWorker, authService),
    takeLatest(AuthActions.effect.signIn, signInWorker, authService),
    takeLatest(AuthActions.effect.setAuthInfo, setAuthInfoWorker, authService),
    takeLatest(AuthActions.effect.logout, logoutWorker, authService),
    takeLatest(AuthActions.effect.reset, resetPasswordWorker, authService),
    takeLatest(AuthActions.effect.changePassword, changePasswordWorker, authService),
  ]);
}
