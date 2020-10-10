import { IUser } from '@/types/entities';
import { IServerResponse } from './response';

export type IGetMeResponse = IServerResponse<IUser>;
