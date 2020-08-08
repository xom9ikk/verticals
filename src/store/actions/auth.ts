import { createAction } from 'redux-actions';
import { IAuth, ISignIn, ISignUp } from '../../types';

enum Type {
  SIGN_IN = 'AUTH/SIGN_IN',
  SET_AUTH = 'AUTH/SET_AUTH',
  SIGN_UP = 'AUTH/SIGN_UP',
}

const setAuthInfo = createAction<IAuth>(Type.SET_AUTH);
const signIn = createAction<ISignIn>(Type.SIGN_IN);
const signUp = createAction<ISignUp>(Type.SIGN_UP);

export const AuthActions = {
  Type,
  setAuthInfo,
  signIn,
  signUp,
};

export type AuthActions = Omit<typeof AuthActions, 'Type'>;
