import { createAction } from 'redux-actions';
import {
  ISetAuthInfo, ISignIn, ISignUp,
} from '../../types';

enum Type {
  SIGN_IN = 'AUTH/SIGN_IN',
  SET_AUTH_INFO = 'AUTH/SET_AUTH_INFO',
  SIGN_UP = 'AUTH/SIGN_UP',
  LOGOUT = 'AUTH/LOGOUT',
}

const setAuthInfo = createAction<ISetAuthInfo>(Type.SET_AUTH_INFO);
const signUp = createAction<ISignUp>(Type.SIGN_UP);
const signIn = createAction<ISignIn>(Type.SIGN_IN);
const logout = createAction(Type.LOGOUT);

export const AuthActions = {
  Type,
  setAuthInfo,
  signIn,
  signUp,
  logout,
};

export type AuthActions = Omit<typeof AuthActions, 'Type'>;
