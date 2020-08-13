import {
  apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { Action } from 'redux-actions';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { IServices } from '@/inversify.interfaces';
import { storage } from '@/plugins/storage';
import { forwardTo } from '@/router/history';
import { ISignInRequest, ISignUpRequest } from '@/types/api';
import { ISetAuthInfo } from '@/types/actions';
import { AuthActions } from '../actions';

const { auth } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* signUpWorker(action: Action<ISignUpRequest>) {
  try {
    const response = yield* apply(auth, auth.signUp, [action.payload]);
    const { token, refreshToken } = response.data;
    yield put(AuthActions.setAuthInfo({
      token,
      refreshToken,
    }));
    yield call(forwardTo, '/');
    yield call(show, 'Success', 'Registration completed successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    console.error('signUpWorker', error);
    yield call(show, 'Internal Error', 'Registration Error', ALERT_TYPES.DANGER);
  }
}

function* signInWorker(action: Action<ISignInRequest>) {
  try {
    const response = yield* apply(auth, auth.signIn, [action.payload]);
    const { token, refreshToken } = response.data;
    yield put(AuthActions.setAuthInfo({
      token,
      refreshToken,
    }));
    yield call(show, 'Success', 'Successful login ', ALERT_TYPES.SUCCESS);
  } catch (error) {
    console.error('signInWorker', error);
    yield call(show, 'Internal Error', 'Login Error', ALERT_TYPES.DANGER);
  }
}

function* setAuthInfoWorker(action: Action<ISetAuthInfo>) {
  try {
    const { token, refreshToken } = action.payload;
    yield* call(storage.setToken, token);
    yield* call(storage.setRefreshToken, refreshToken);
  } catch (error) {
    console.error('setAuthInfoWorker', error);
    show('Internal Error', '', ALERT_TYPES.DANGER);
  }
}

export function* watchAuth() {
  yield* takeLatest(AuthActions.Type.SIGN_UP, signUpWorker);
  yield* takeLatest(AuthActions.Type.SIGN_IN, signInWorker);
  yield* takeLatest(AuthActions.Type.SET_AUTH_INFO, setAuthInfoWorker);
}
