import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify.types';
import { IServices, IAuthService, IBoardService } from '@/inversify.interfaces';

@injectable()
export class Services implements IServices {
  authService: IAuthService;

  boardService: IBoardService;

  constructor(
  @inject(TYPES.AuthService) authService: IAuthService,
    @inject(TYPES.BoardService) boardService: IBoardService,
  ) {
    this.authService = authService;
    this.boardService = boardService;
  }
}
