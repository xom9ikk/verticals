import {
  IAuthService,
  IBoardService,
  IColumnService,
  IHeadingService,
  ITodoService,
  ISubTodoService,
  ICommentService,
  ICommentAttachmentService,
  ISearchService,
  IUserService,
  IUpdateService,
} from '@inversify/interfaces/services';

export interface IServices {
  readonly authService: IAuthService;
  readonly userService: IUserService;
  readonly boardService: IBoardService;
  readonly columnService: IColumnService;
  readonly headingService: IHeadingService;
  readonly todoService: ITodoService;
  readonly subTodoService: ISubTodoService;
  readonly commentService: ICommentService;
  readonly commentAttachmentService: ICommentAttachmentService;
  readonly searchService: ISearchService;
  readonly updateService: IUpdateService;
}
