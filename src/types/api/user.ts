import { IUser } from '@/types/entities';
import { IServerResponse } from './response';

export type IGetMeResponse = IServerResponse<IUser>;

export interface IUpdateUserRequest {
  email?: string,
  name?: string,
  surname?: string,
  username?: string,
  bio?: string | null,
}

export type IUpdateUserResponse = IServerResponse;

export type IUploadUserAvatarRequest = FormData;

export type IUploadUserAvatarResponse = IServerResponse<{
  avatar: string;
}>;

export type IRemoveUserAvatarResponse = IServerResponse;
