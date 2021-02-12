import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { useAlert } from '@use/alert';
import { container } from '@inversify/config';
import { TYPES } from '@inversify/types';
import { IServices } from '@inversify/interfaces';
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

const { authService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* signUpWorker(action: PayloadAction<ISignUp>) {
  try {
    const response = yield* apply(authService, authService.signUp, [action.payload]);
    const { token, refreshToken } = response.data;
    yield put(AuthActions.setAuthInfo({
      token,
      refreshToken,
    }));
    yield call(redirectTo, '/');
    yield call(show, 'Success', 'Registration completed successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Error', error, ALERT_TYPES.DANGER);
  }
}

function* signInWorker(action: PayloadAction<ISignIn>) {
  try {
    const response = yield* apply(authService, authService.signIn, [action.payload]);
    const { token, refreshToken } = response.data;
    yield put(AuthActions.setAuthInfo({
      token,
      refreshToken,
    }));
    yield call(show, 'Success', 'Successful login', ALERT_TYPES.SUCCESS);
    yield call(redirectTo, '/');
  } catch (error) {
    yield call(show, 'Error', error, ALERT_TYPES.DANGER);
  }
}

function* setAuthInfoWorker(action: PayloadAction<ISetAuthInfo>) {
  try {
    const { token, refreshToken } = action.payload;
    yield call(storage.setToken, token);
    yield call(storage.setRefreshToken, refreshToken);
  } catch (error) {
    yield call(show, 'Error', error, ALERT_TYPES.DANGER);
  }
}

function* logoutWorker() {
  try {
    yield apply(authService, authService.logout, []);
    yield call(show, 'Success', 'Successful logout', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Error', error, ALERT_TYPES.DANGER);
  } finally {
    yield put(AuthActions.setAuthInfo({
      token: '',
      refreshToken: '',
    }));
    yield call(redirectTo, '/');
  }
}

function* resetPasswordWorker(action: PayloadAction<IResetPassword>) {
  try {
    yield* apply(authService, authService.reset, [action.payload]);
    yield call(show, 'Success', 'Successful reset password', ALERT_TYPES.SUCCESS);
    yield call(redirectTo, '/auth/login');
  } catch (error) {
    yield call(show, 'Error', error, ALERT_TYPES.DANGER);
  }
}

function* changePasswordWorker(action: PayloadAction<IChangePassword>) {
  try {
    yield* apply(authService, authService.change, [action.payload]);
    yield call(show, 'Success', 'Successful change password', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Error', error, ALERT_TYPES.DANGER);
  }
}

export function* watchAuth() {
  yield* all([
    takeLatest(AuthActions.signUp, signUpWorker),
    takeLatest(AuthActions.signIn, signInWorker),
    takeLatest(AuthActions.setAuthInfo, setAuthInfoWorker),
    takeLatest(AuthActions.logout, logoutWorker),
    takeLatest(AuthActions.reset, resetPasswordWorker),
    takeLatest(AuthActions.changePassword, changePasswordWorker),
  ]);
}
