import { handleActions } from 'redux-actions';
import { IUser } from '@/types/entities';
import { UserActions } from '../actions';

const initialState: IUser = {
  email: null,
  name: null,
  surname: null,
  username: null,
};

export const UserReducer = handleActions<IUser, IUser>({
  [UserActions.Type.SET_USER_DATA]:
        (state, action) => ({ ...state, ...action.payload }),
}, initialState);
