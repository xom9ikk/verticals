import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify.types';
import {
  IServices,
  IAuthService,
  IBoardService,
  IColumnService,
} from '@/inversify.interfaces';

@injectable()
export class Services implements IServices {
  authService: IAuthService;

  boardService: IBoardService;

  columnService: IColumnService;

  constructor(
  @inject(TYPES.AuthService) authService: IAuthService,
    @inject(TYPES.BoardService) boardService: IBoardService,
    @inject(TYPES.BoardService) columnService: IColumnService,
  ) {
    this.authService = authService;
    this.boardService = boardService;
    this.columnService = columnService;
  }
}
