import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { Action } from 'redux-actions';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { IServices } from '@/inversify.interfaces';
import { storage } from '@/plugins/storage';
import { forwardTo } from '@/router/history';
import {
  IChangePasswordRequest, IResetPasswordRequest, ISignInRequest, ISignUpRequest,
} from '@/types/api';
import { ISetAuthInfo } from '@/types/actions';
import { AuthActions } from '@/store/actions';

const { authService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* signUpWorker(action: Action<ISignUpRequest>) {
  try {
    const response = yield* apply(authService, authService.signUp, [action.payload]);
    const { token, refreshToken } = response.data;
    yield put(AuthActions.setAuthInfo({
      token,
      refreshToken,
    }));
    yield call(forwardTo, '/');
    yield call(show, 'Success', 'Registration completed successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Error', error, ALERT_TYPES.DANGER);
  }
}

function* signInWorker(action: Action<ISignInRequest>) {
  try {
    const response = yield* apply(authService, authService.signIn, [action.payload]);
    const { token, refreshToken } = response.data;
    yield put(AuthActions.setAuthInfo({
      token,
      refreshToken,
    }));
    yield call(show, 'Success', 'Successful login', ALERT_TYPES.SUCCESS);
    yield call(forwardTo, '/');
  } catch (error) {
    yield call(show, 'Error', error, ALERT_TYPES.DANGER);
  }
}

function* setAuthInfoWorker(action: Action<ISetAuthInfo>) {
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
    yield* apply(authService, authService.logout, []);
    yield call(show, 'Success', 'Successful logout', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Error', error, ALERT_TYPES.DANGER);
  } finally {
    yield put(AuthActions.setAuthInfo({
      token: '',
      refreshToken: '',
    }));
    yield call(forwardTo, '/');
  }
}

function* resetPasswordWorker(action: Action<IResetPasswordRequest>) {
  try {
    yield* apply(authService, authService.reset, [action.payload]);
    yield call(show, 'Success', 'Successful reset password', ALERT_TYPES.SUCCESS);
    yield call(forwardTo, '/auth/login');
  } catch (error) {
    yield call(show, 'Error', error, ALERT_TYPES.DANGER);
  }
}

function* changePasswordWorker(action: Action<IChangePasswordRequest>) {
  try {
    yield* apply(authService, authService.change, [action.payload]);
    yield call(show, 'Success', 'Successful change password', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'Error', error, ALERT_TYPES.DANGER);
  }
}

export function* watchAuth() {
  yield* all([
    takeLatest(AuthActions.Type.SIGN_UP, signUpWorker),
    takeLatest(AuthActions.Type.SIGN_IN, signInWorker),
    takeLatest(AuthActions.Type.SET_AUTH_INFO, setAuthInfoWorker),
    takeLatest(AuthActions.Type.LOGOUT, logoutWorker),
    takeLatest(AuthActions.Type.RESET, resetPasswordWorker),
    takeLatest(AuthActions.Type.CHANGE, changePasswordWorker),
  ]);
}
