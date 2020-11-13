import {
  IGetMeResponse,
  IRemoveUserAvatarResponse,
  IUpdateUserRequest,
  IUpdateUserResponse,
  IUploadUserAvatarRequest,
  IUploadUserAvatarResponse,
} from '@/types/api';

export interface IUserService {
  getMe(): Promise<IGetMeResponse>;
  update(body: IUpdateUserRequest): Promise<IUpdateUserResponse>;
  uploadAvatar(body: IUploadUserAvatarRequest): Promise<IUploadUserAvatarResponse>;
  removeAvatar(): Promise<IRemoveUserAvatarResponse>;
}
