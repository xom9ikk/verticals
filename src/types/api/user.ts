import { IUser } from '@/types/entities';
import { IServerResponse } from './response';

export type IGetMeResponse = IServerResponse<IUser>;

export interface IUpdateUserRequest {
  email?: string,
  name?: string,
  surname?: string,
  username?: string,
  bio?: string,
}

export type IUpdateUserResponse = IServerResponse;
