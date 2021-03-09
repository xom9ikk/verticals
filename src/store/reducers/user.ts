import { createReducer } from '@reduxjs/toolkit';
import { IUser } from '@type/entities';
import { UserActions } from '@store/actions';

export const initialState: IUser = {
  email: null,
  name: null,
  surname: null,
  username: null,
  bio: null,
  avatar: null,
};

export const UserReducer = createReducer(initialState, (builder) => builder
  .addCase(UserActions.setUserData, (draft, action) => action.payload)
  .addCase(UserActions.setUsername, (draft, action) => { draft.username = action.payload.username; })
  .addCase(UserActions.setEmail, (draft, action) => { draft.email = action.payload.email; })
  .addCase(UserActions.setPersonalData, (draft, action) => {
    draft.name = action.payload.name;
    draft.surname = action.payload.surname;
    draft.bio = action.payload.bio;
  })
  .addCase(UserActions.setAvatar, (draft, action) => { draft.avatar = action.payload.avatar; }));
