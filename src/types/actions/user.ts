import { IUser } from '@/types/entities';

export type ISetUserData = IUser;

export type IUpdateUsername = string | null;
export type IUpdateEmail = string | null;
export type IUploadAvatar = File;

export interface IUpdatePersonalData {
  name: string;
  surname: string;
  bio: string | null;
}

export type ISetUsername = IUpdateUsername;
export type ISetEmail = IUpdateEmail;
export type ISetPersonalData = IUpdatePersonalData;
export type ISetAvatar = string | null;
