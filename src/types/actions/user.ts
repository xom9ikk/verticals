import { IUser } from '@/types/entities';

export type ISetUserData = IUser;

export type IUpdateUsernameRaw = string;
export interface IUpdateUsername {
  username: IUpdateUsernameRaw;
}

export type IUpdateEmailRaw = string;
export interface IUpdateEmail{
  email: IUpdateEmailRaw;
}

export type ISetUsernameRaw = string;
export interface ISetUsername {
  username: IUpdateEmailRaw;
}

export type ISetEmailRaw = string;
export interface ISetEmail {
  email: ISetEmailRaw;
}

export type ISetAvatarRaw = string | null;
export interface ISetAvatar {
  avatar: ISetAvatarRaw;
}

export type IUploadAvatarRaw = File;
export type IUploadAvatar = FormData;

export interface IUpdatePersonalData {
  name: string;
  surname: string;
  bio: string | null;
}

export type ISetPersonalData = IUpdatePersonalData;
