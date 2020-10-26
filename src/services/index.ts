import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@/inversify.types';
import {
  IServices,
  IAuthService,
  IUserService,
  IBoardService,
  IColumnService,
  ITodoService,
  ICommentService,
  ICommentAttachmentService,
} from '@/inversify.interfaces';

@injectable()
export class Services implements IServices {
  authService: IAuthService;

  userService: IUserService;

  boardService: IBoardService;

  columnService: IColumnService;

  todoService: ITodoService;

  commentService: ICommentService;

  commentAttachmentService: ICommentAttachmentService;

  constructor(
  @inject(TYPES.AuthService) authService: IAuthService,
    @inject(TYPES.UserService) userService: IUserService,
    @inject(TYPES.BoardService) boardService: IBoardService,
    @inject(TYPES.ColumnService) columnService: IColumnService,
    @inject(TYPES.TodoService) todoService: ITodoService,
    @inject(TYPES.CommentService) commentService: ICommentService,
    @inject(TYPES.CommentAttachmentService) commentAttachmentService: ICommentAttachmentService,
  ) {
    this.authService = authService;
    this.userService = userService;
    this.boardService = boardService;
    this.columnService = columnService;
    this.todoService = todoService;
    this.commentService = commentService;
    this.commentAttachmentService = commentAttachmentService;
  }
}
