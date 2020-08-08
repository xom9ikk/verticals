import {
  put, call, takeLatest,
} from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { AuthActions } from '../actions';
import { AuthService, IRegisterRequest } from '../../services';
import { Api } from '../../plugins/api';

const { client } = new Api();
const authService = new AuthService(client);

function* signUpWorker(action: Action<IRegisterRequest>) {
  try {
    const { data } = yield call(authService.signUp, action.payload);
    console.log('data', data);
  } catch (error) {
    console.error(error);
  }
}

export function* watchAuth() {
  yield takeLatest(AuthActions.Type.SIGN_UP, signUpWorker);
}
