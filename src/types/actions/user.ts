import { IUser } from '@/types/entities';

export type ISetUserData = IUser;

export type IUpdateUsername = string;
export type IUpdateEmail = string;
export interface IUpdatePersonalData {
  name: string;
  surname: string;
  bio: string | null;
}

export type ISetUsername = IUpdateUsername;
export type ISetEmail = IUpdateEmail;
export type ISetPersonalData = IUpdatePersonalData;
