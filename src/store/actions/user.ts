import { createAction } from 'redux-actions';
import {
  ISetUserData,
  IUpdateEmail,
  IUpdateUsername,
  IUpdatePersonalData,
  IUploadAvatar,
  ISetEmail,
  ISetUsername,
  ISetPersonalData,
} from '@/types/actions';

enum Type {
  FETCH_ME = 'USER/FETCH_ME',
  SET_USER_DATA = 'USER/SET_USER_DATA',
  UPDATE_USERNAME = 'USER/UPDATE_USERNAME',
  UPDATE_EMAIL = 'USER/UPDATE_EMAIL',
  UPDATE_PERSONAL_DATA = 'USER/UPDATE_PERSONAL_DATA',
  UPLOAD_AVATAR = 'USER/UPLOAD_AVATAR',
  REMOVE_AVATAR = 'USER/REMOVE_AVATAR',
  SET_USERNAME = 'USER/SET_USERNAME',
  SET_EMAIL = 'USER/SET_EMAIL',
  SET_PERSONAL_DATA = 'USER/SET_PERSONAL_DATA',
}

const fetchMe = createAction(Type.FETCH_ME);
const setUserData = createAction<ISetUserData>(Type.SET_USER_DATA);
const updateUsername = createAction(
  Type.UPDATE_USERNAME,
  (payload: IUpdateUsername) => ({ username: payload }),
);
const updateEmail = createAction(
  Type.UPDATE_EMAIL,
  (payload: IUpdateEmail) => ({ email: payload }),
);
const updatePersonalData = createAction<IUpdatePersonalData>(Type.UPDATE_PERSONAL_DATA);
const uploadAvatar = createAction(
  Type.UPLOAD_AVATAR,
  (payload: IUploadAvatar) => {
    const formData = new FormData();
    formData.append('avatar', payload);
    return formData;
  },
);
const removeAvatar = createAction(Type.REMOVE_AVATAR);
const setUsername = createAction(
  Type.SET_USERNAME,
  (payload: ISetUsername) => ({ username: payload }),
);
const setEmail = createAction(
  Type.SET_EMAIL,
  (payload: ISetEmail) => ({ email: payload }),
);
const setPersonalData = createAction<ISetPersonalData>(Type.SET_PERSONAL_DATA);

export const UserActions = {
  Type,
  fetchMe,
  setUserData,
  updateUsername,
  updateEmail,
  updatePersonalData,
  uploadAvatar,
  removeAvatar,
  setUsername,
  setEmail,
  setPersonalData,
};
