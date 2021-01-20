import { createSelector } from 'reselect';
import { IRootState } from '@/store/state';

export const getUsername = (state: IRootState) => state.user.username;
export const getEmail = (state: IRootState) => state.user.email;
export const getName = (state: IRootState) => state.user.name;
export const getSurname = (state: IRootState) => state.user.surname;
export const getBio = (state: IRootState) => state.user.bio;
export const getAvatarUrl = (state: IRootState) => state.user.avatar;
export const getFullName = createSelector(
  [getName, getSurname],
  (name, surname) => `${name} ${surname}`,
);
