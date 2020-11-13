import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify/types';
import {
  IGetMeResponse, IRemoveUserAvatarResponse,
  IUpdateUserRequest, IUpdateUserResponse,
  IUploadUserAvatarRequest, IUploadUserAvatarResponse,
} from '@/types/api';
import { IHttpClient } from '@/inversify/interfaces/httpClient';
import { IUserService } from '@/inversify/interfaces/services';

@injectable()
export class UserService implements IUserService {
  httpClient: IHttpClient;

  constructor(
  @inject(TYPES.HttpClient) httpClient: IHttpClient,
  ) {
    this.httpClient = httpClient;
  }

  getMe() {
    return this.httpClient.get<IGetMeResponse>('/user/me');
  }

  update(body: IUpdateUserRequest) {
    return this.httpClient.patch<IUpdateUserResponse>('/user', body);
  }

  uploadAvatar(body: IUploadUserAvatarRequest) {
    console.log('body', body);
    return this.httpClient.post<IUploadUserAvatarResponse>('/user/avatar', body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  removeAvatar() {
    return this.httpClient.delete<IRemoveUserAvatarResponse>('/user/avatar');
  }
}
