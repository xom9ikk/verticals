import {
  apply, takeLatest,
} from 'typed-redux-saga';
import { Action } from 'redux-actions';
import { container } from '../../inversify.config';
import { TYPES } from '../../inversify.types';
import { AuthActions } from '../actions';
import { ISignInRequest, ISignUpRequest } from '../../services/auth';
import { IServices } from '../../services';
import { storage } from '../../plugins/storage';

const { auth } = container.get<IServices>(TYPES.Services);

function* signUpWorker(action: Action<ISignUpRequest>) {
  try {
    const response = yield* apply(auth, auth.signUp, [action.payload]);
    const { token, refreshToken } = response.data;
    storage.setToken(token);
    storage.setRefreshToken(refreshToken);
  } catch (error) {
    console.error('signUpWorker', error);
  }
}

function* signInWorker(action: Action<ISignInRequest>) {
  try {
    const response = yield* apply(auth, auth.signIn, [action.payload]);
    const { token, refreshToken } = response.data;
    storage.setToken(token);
    storage.setRefreshToken(refreshToken);
  } catch (error) {
    console.error('signInWorker', error);
  }
}

export function* watchAuth() {
  yield takeLatest(AuthActions.Type.SIGN_UP, signUpWorker);
  yield takeLatest(AuthActions.Type.SIGN_IN, signInWorker);
}
