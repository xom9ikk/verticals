import { createAction, PrepareAction } from '@reduxjs/toolkit';
import {
  ISetUserData,
  IUpdateEmail,
  IUpdateEmailRaw,
  IUpdatePersonalData,
  IUploadAvatar,
  IUploadAvatarRaw,
  ISetEmail,
  ISetEmailRaw,
  ISetUsername,
  ISetUsernameRaw,
  ISetPersonalData,
  ISetAvatar,
  ISetAvatarRaw,
  IUpdateUsername,
  IUpdateUsernameRaw,
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
    uploadAvatar: createAction<PrepareAction<IUploadAvatar>>(
      'USER-EFFECT/UPLOAD_AVATAR',
      (payload: IUploadAvatarRaw) => {
        const formData = new FormData();
        formData.append('avatar', payload);
        return {
          payload: formData,
        };
      },
    ),
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
