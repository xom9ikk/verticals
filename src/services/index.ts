import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IAuthService } from './auth';
import { TYPES } from '../inversify.types';

export interface IServices {
  auth: IAuthService
}

@injectable()
export class Services implements IServices {
  auth: IAuthService;

  constructor(
  @inject(TYPES.AuthService) auth: IAuthService,
  ) {
    this.auth = auth;
  }
}
