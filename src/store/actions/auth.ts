import { createAction } from 'redux-actions';
import {
  IChangePassword,
  IResetPassword,
  ISetAuthInfo, ISignIn, ISignUp,
} from '@/types/actions';

enum Type {
  SIGN_IN = 'AUTH/SIGN_IN',
  SET_AUTH_INFO = 'AUTH/SET_AUTH_INFO',
  SIGN_UP = 'AUTH/SIGN_UP',
  LOGOUT = 'AUTH/LOGOUT',
  RESET = 'AUTH/RESET',
  CHANGE = 'AUTH/CHANGE',
}

const setAuthInfo = createAction<ISetAuthInfo>(Type.SET_AUTH_INFO);
const signUp = createAction<ISignUp>(Type.SIGN_UP);
const signIn = createAction<ISignIn>(Type.SIGN_IN);
const logout = createAction(Type.LOGOUT);
const reset = createAction<IResetPassword>(Type.RESET);
const changePassword = createAction<IChangePassword>(Type.CHANGE);

export const AuthActions = {
  Type,
  setAuthInfo,
  signIn,
  signUp,
  logout,
  reset,
  changePassword,
};
