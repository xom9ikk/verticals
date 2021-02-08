import { createAction } from '@reduxjs/toolkit';
import {
  IChangePassword,
  IResetPassword,
  ISetAuthInfo,
  ISignIn,
  ISignUp,
} from '@/types/actions';

const setAuthInfo = createAction<ISetAuthInfo>('AUTH/SET_AUTH_INFO');
const signUp = createAction<ISignUp>('AUTH/SIGN_UP');
const signIn = createAction<ISignIn>('AUTH/SIGN_IN');
const logout = createAction('AUTH/LOGOUT');
const reset = createAction<IResetPassword>('AUTH/RESET');
const changePassword = createAction<IChangePassword>('AUTH/CHANGE');

export const AuthActions = {
  setAuthInfo,
  signIn,
  signUp,
  logout,
  reset,
  changePassword,
};
