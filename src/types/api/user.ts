import { IUser } from '@type/entities';

import { IServerResponse } from './response';

export type IGetMeResponse = IServerResponse<IUser>;

export interface IUpdateUserRequest {
  readonly email?: string,
  readonly name?: string,
  readonly surname?: string,
  readonly username?: string,
  readonly bio?: string | null,
}

export type IUpdateUserResponse = IServerResponse;

export type IUploadUserAvatarRequest = FormData;

export type IUploadUserAvatarResponse = IServerResponse<{
  readonly avatar: string;
}>;

export type IRemoveUserAvatarResponse = IServerResponse;
