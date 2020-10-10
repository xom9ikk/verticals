import { createAction } from 'redux-actions';
import {
  IResetPassword,
  ISetAuthInfo, ISignIn, ISignUp,
} from '@/types/actions';

enum Type {
  SIGN_IN = 'AUTH/SIGN_IN',
  SET_AUTH_INFO = 'AUTH/SET_AUTH_INFO',
  SIGN_UP = 'AUTH/SIGN_UP',
  LOGOUT = 'AUTH/LOGOUT',
  RESET = 'AUTH/RESET',
}

const setAuthInfo = createAction<ISetAuthInfo>(Type.SET_AUTH_INFO);
const signUp = createAction<ISignUp>(Type.SIGN_UP);
const signIn = createAction<ISignIn>(Type.SIGN_IN);
const logout = createAction(Type.LOGOUT);
const reset = createAction<IResetPassword>(Type.RESET);

export const AuthActions = {
  Type,
  setAuthInfo,
  signIn,
  signUp,
  logout,
  reset,
};

export type AuthActions = Omit<typeof AuthActions, 'Type'>;
