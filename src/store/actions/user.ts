import { createAction } from 'redux-actions';
import { ISetUserData } from '@/types/actions';

enum Type {
  FETCH_ME = 'USER/FETCH_ME',
  SET_USER_DATA = 'USER/SET_USER_DATA',
}

const fetchMe = createAction(Type.FETCH_ME);
const setUserData = createAction<ISetUserData>(Type.SET_USER_DATA);

export const UserActions = {
  Type,
  fetchMe,
  setUserData,
};
