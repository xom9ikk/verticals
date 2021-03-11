import { createAction } from '@reduxjs/toolkit';
import {
  IChangePassword,
  IResetPassword,
  ISetAuthInfo,
  ISignIn,
  ISignUp,
} from '@type/actions';

export const AuthActions = {
  effect: {
    setAuthInfo: createAction<ISetAuthInfo>('AUTH-EFFECT/SET_AUTH_INFO'),
    signIn: createAction<ISignIn>('AUTH-EFFECT/SIGN_IN'),
    signUp: createAction<ISignUp>('AUTH-EFFECT/SIGN_UP'),
    logout: createAction('AUTH-EFFECT/LOGOUT'),
    reset: createAction<IResetPassword>('AUTH-EFFECT/RESET'),
    changePassword: createAction<IChangePassword>('AUTH-EFFECT/CHANGE_PASSWORD'),
  },
};
