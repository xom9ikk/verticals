import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../inversify.types';
import { IAuthService, IServices } from '../inversify.interfaces';

@injectable()
export class Services implements IServices {
  auth: IAuthService;

  constructor(
  @inject(TYPES.AuthService) auth: IAuthService,
  ) {
    this.auth = auth;
  }
}
