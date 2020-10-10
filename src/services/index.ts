import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify.types';
import {
  IServices,
  IAuthService,
  IBoardService,
  IColumnService,
  ITodoService,
  IUserService,
} from '@/inversify.interfaces';

@injectable()
export class Services implements IServices {
  authService: IAuthService;

  boardService: IBoardService;

  columnService: IColumnService;

  todoService: ITodoService;

  userService: IUserService;

  constructor(
  @inject(TYPES.AuthService) authService: IAuthService,
    @inject(TYPES.BoardService) boardService: IBoardService,
    @inject(TYPES.ColumnService) columnService: IColumnService,
    @inject(TYPES.TodoService) todoService: ITodoService,
    @inject(TYPES.UserService) userService: IUserService,
  ) {
    this.authService = authService;
    this.boardService = boardService;
    this.columnService = columnService;
    this.todoService = todoService;
    this.userService = userService;
  }
}
