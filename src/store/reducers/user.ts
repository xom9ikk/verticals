import { handleActions } from 'redux-actions';
import { IUser } from '@/types/entities';
import { UserActions } from '../actions';

const initialState: IUser = {
  email: null,
  name: null,
  surname: null,
  username: null,
  bio: null,
  avatar: null,
};

export const UserReducer = handleActions<IUser, IUser>({
  [UserActions.Type.SET_USER_DATA]:
        (state, action) => ({ ...state, ...action.payload }),
  [UserActions.Type.SET_USERNAME]:
        (state, action) => ({ ...state, username: action.payload.username }),
  [UserActions.Type.SET_EMAIL]:
        (state, action) => ({ ...state, email: action.payload.email }),
  [UserActions.Type.SET_PERSONAL_DATA]:
        (state, action) => ({
          ...state,
          name: action.payload.name,
          surname: action.payload.surname,
          bio: action.payload.bio,
        }),
  [UserActions.Type.SET_AVATAR]:
        (state, action) => ({ ...state, avatar: action.payload.avatar }),
}, initialState);
