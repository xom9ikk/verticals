import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '@inversify/types';
import { IServices } from '@inversify/interfaces';
import {
  IAuthService,
  IBoardService,
  IColumnService,
  IHeadingService,
  ITodoService,
  ICommentAttachmentService,
  ICommentService, ISearchService, IUpdateService,
  IUserService,
} from '@inversify/interfaces/services';

@injectable()
export class Services implements IServices {
  authService: IAuthService;

  userService: IUserService;

  boardService: IBoardService;

  columnService: IColumnService;

  headingService: IHeadingService;

  todoService: ITodoService;

  commentService: ICommentService;

  commentAttachmentService: ICommentAttachmentService;

  searchService: ISearchService;

  updateService: IUpdateService;

  constructor(
  @inject(TYPES.AuthService) authService: IAuthService,
    @inject(TYPES.UserService) userService: IUserService,
    @inject(TYPES.BoardService) boardService: IBoardService,
    @inject(TYPES.ColumnService) columnService: IColumnService,
    @inject(TYPES.HeadingService) headingService: IHeadingService,
    @inject(TYPES.TodoService) todoService: ITodoService,
    @inject(TYPES.CommentService) commentService: ICommentService,
    @inject(TYPES.CommentAttachmentService) commentAttachmentService: ICommentAttachmentService,
    @inject(TYPES.SearchService) searchService: ISearchService,
    @inject(TYPES.UpdateService) updateService: IUpdateService,
  ) {
    this.authService = authService;
    this.userService = userService;
    this.boardService = boardService;
    this.columnService = columnService;
    this.headingService = headingService;
    this.todoService = todoService;
    this.commentService = commentService;
    this.commentAttachmentService = commentAttachmentService;
    this.searchService = searchService;
    this.updateService = updateService;
  }
}
