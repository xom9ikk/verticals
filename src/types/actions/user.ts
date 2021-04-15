import { IUser } from '@type/entities';

export type ISetUserData = IUser;

export type IUpdateUsernameRaw = string;
export interface IUpdateUsername {
  readonly username: IUpdateUsernameRaw;
}

export type IUpdateEmailRaw = string;
export interface IUpdateEmail{
  readonly email: IUpdateEmailRaw;
}

export type ISetUsernameRaw = string;
export interface ISetUsername {
  readonly username: IUpdateEmailRaw;
}

export type ISetEmailRaw = string;
export interface ISetEmail {
  readonly email: ISetEmailRaw;
}

export type ISetAvatarRaw = string | null;
export interface ISetAvatar {
  readonly avatar: ISetAvatarRaw;
}

export type IUploadAvatar = FormData;

export interface IUpdatePersonalData {
  readonly name: string;
  readonly surname: string;
  readonly bio: string | null;
}

export type ISetPersonalData = IUpdatePersonalData;
