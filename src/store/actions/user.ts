/* eslint-disable max-len */
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
} from '@/types/actions';

const fetchMe = createAction('USER/FETCH_ME');
const setUserData = createAction<ISetUserData>('USER/SET_USER_DATA');
const updateUsername = createAction<PrepareAction<IUpdateUsername>>(
  'USER/UPDATE_USERNAME',
  (payload: IUpdateUsernameRaw) => ({ payload: { username: payload } }),
);

const updateEmail = createAction<PrepareAction<IUpdateEmail>>(
  'USER/UPDATE_EMAIL',
  (payload: IUpdateEmailRaw) => ({ payload: { email: payload } }),
);
const setUsername = createAction<PrepareAction<ISetUsername>>(
  'USER/SET_USERNAME',
  (payload: ISetUsernameRaw) => ({ payload: { username: payload } }),
);
const setEmail = createAction<PrepareAction<ISetEmail>>(
  'USER/SET_EMAIL',
  (payload: ISetEmailRaw) => ({ payload: { email: payload } }),
);
const setAvatar = createAction<PrepareAction<ISetAvatar>>(
  'USER/SET_AVATAR',
  (payload: ISetAvatarRaw) => ({ payload: { avatar: payload } }),
);
const setPersonalData = createAction<ISetPersonalData>('USER/SET_PERSONAL_DATA');
const updatePersonalData = createAction<IUpdatePersonalData>('USER/UPDATE_PERSONAL_DATA');
const uploadAvatar = createAction<PrepareAction<IUploadAvatar>>(
  'USER/UPLOAD_AVATAR',
  (payload: IUploadAvatarRaw) => {
    const formData = new FormData();
    formData.append('avatar', payload);
    return {
      payload: formData,
    };
  },
);
const removeAvatar = createAction('USER/REMOVE_AVATAR');

export const UserActions = {
  fetchMe,
  setUserData,
  updateUsername,
  updateEmail,
  setUsername,
  setEmail,
  setAvatar,
  setPersonalData,
  updatePersonalData,
  uploadAvatar,
  removeAvatar,
};
