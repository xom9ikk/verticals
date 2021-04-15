import { PrepareAction, createAction } from '@reduxjs/toolkit';

import {
  ISetAvatar,
  ISetAvatarRaw,
  ISetEmail,
  ISetEmailRaw,
  ISetPersonalData,
  ISetUserData,
  ISetUsername,
  ISetUsernameRaw,
  IUpdateEmail,
  IUpdateEmailRaw,
  IUpdatePersonalData,
  IUpdateUsername,
  IUpdateUsernameRaw,
  IUploadAvatar,
} from '@type/actions';

export const UserActions = {
  effect: {
    fetchMe: createAction('USER-EFFECT/FETCH_ME'),
    updateUsername: createAction<PrepareAction<IUpdateUsername>>(
      'USER-EFFECT/UPDATE_USERNAME',
      (payload: IUpdateUsernameRaw) => ({ payload: { username: payload } }),
    ),
    updateEmail: createAction<PrepareAction<IUpdateEmail>>(
      'USER-EFFECT/UPDATE_EMAIL',
      (payload: IUpdateEmailRaw) => ({ payload: { email: payload } }),
    ),
    updatePersonalData: createAction<IUpdatePersonalData>('USER-EFFECT/UPDATE_PERSONAL_DATA'),
    uploadAvatar: createAction<IUploadAvatar>('USER-EFFECT/UPLOAD_AVATAR'),
    removeAvatar: createAction('USER-EFFECT/REMOVE_AVATAR'),
  },
  setUserData: createAction<ISetUserData>('USER/SET_USER_DATA'),
  setUsername: createAction<PrepareAction<ISetUsername>>(
    'USER/SET_USERNAME',
    (payload: ISetUsernameRaw) => ({ payload: { username: payload } }),
  ),
  setEmail: createAction<PrepareAction<ISetEmail>>(
    'USER/SET_EMAIL',
    (payload: ISetEmailRaw) => ({ payload: { email: payload } }),
  ),
  setAvatar: createAction<PrepareAction<ISetAvatar>>(
    'USER/SET_AVATAR',
    (payload: ISetAvatarRaw) => ({ payload: { avatar: payload } }),
  ),
  setPersonalData: createAction<ISetPersonalData>('USER/SET_PERSONAL_DATA'),
};
