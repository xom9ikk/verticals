import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { useAlert } from '@use/alert';
import { storage } from '@plugins/storage';
import { redirectTo } from '@router/history';
import { AuthActions } from '@store/actions';
import {
  IChangePassword,
  IResetPassword,
  ISignIn,
  ISignUp,
  ISetAuthInfo,
} from '@type/actions';
import { PayloadAction } from '@reduxjs/toolkit';
import i18n from '@/i18n';
import { IAuthService } from '@inversify/interfaces/services';

const { show, ALERT_TYPES } = useAlert();

export function* signUpWorker(authService: IAuthService, action: PayloadAction<ISignUp>) {
  try {
    const response = yield* apply(authService, authService.signUp, [action.payload]);
    const { token, refreshToken } = response.data;
    yield put(AuthActions.setAuthInfo({
      token,
      refreshToken,
    }));
    yield call(redirectTo, '/');
    yield call(show, i18n.t('Success'), i18n.t('Registration completed successfully'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Error'), error, ALERT_TYPES.DANGER);
  }
}

export function* signInWorker(authService: IAuthService, action: PayloadAction<ISignIn>) {
  try {
    const response = yield* apply(authService, authService.signIn, [action.payload]);
    const { token, refreshToken } = response.data;
    yield put(AuthActions.setAuthInfo({
      token,
      refreshToken,
    }));
    yield call(show, i18n.t('Success'), i18n.t('Successful login'), ALERT_TYPES.SUCCESS);
    yield call(redirectTo, '/');
  } catch (error) {
    console.log('error', error);
    yield call(show, i18n.t('Error'), error, ALERT_TYPES.DANGER);
  }
}

export function* setAuthInfoWorker(authService: IAuthService, action: PayloadAction<ISetAuthInfo>) {
  try {
    const { token, refreshToken } = action.payload;
    yield call(storage.setToken, token);
    yield call(storage.setRefreshToken, refreshToken);
  } catch (error) {
    yield call(show, i18n.t('Error'), error, ALERT_TYPES.DANGER);
  }
}

export function* logoutWorker(authService: IAuthService) {
  try {
    yield apply(authService, authService.logout, []);
    yield call(show, i18n.t('Success'), i18n.t('Successful logout'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Error'), error, ALERT_TYPES.DANGER);
  } finally {
    yield put(AuthActions.setAuthInfo({
      token: '',
      refreshToken: '',
    }));
    yield call(redirectTo, '/');
  }
}

export function* resetPasswordWorker(authService: IAuthService, action: PayloadAction<IResetPassword>) {
  try {
    yield* apply(authService, authService.reset, [action.payload]);
    yield call(show, i18n.t('Success'), i18n.t('Successful reset password'), ALERT_TYPES.SUCCESS);
    yield call(redirectTo, '/auth/login');
  } catch (error) {
    yield call(show, i18n.t('Error'), error, ALERT_TYPES.DANGER);
  }
}

export function* changePasswordWorker(authService: IAuthService, action: PayloadAction<IChangePassword>) {
  try {
    yield* apply(authService, authService.change, [action.payload]);
    yield call(show, i18n.t('Success'), i18n.t('Successful change password'), ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, i18n.t('Error'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchAuth(authService: IAuthService) {
  yield all([
    takeLatest(AuthActions.signUp, signUpWorker, authService),
    takeLatest(AuthActions.signIn, signInWorker, authService),
    takeLatest(AuthActions.setAuthInfo, setAuthInfoWorker, authService),
    takeLatest(AuthActions.logout, logoutWorker, authService),
    takeLatest(AuthActions.reset, resetPasswordWorker, authService),
    takeLatest(AuthActions.changePassword, changePasswordWorker, authService),
  ]);
}
