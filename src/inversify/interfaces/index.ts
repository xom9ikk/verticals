import {
  IAuthService,
  IBoardService,
  IColumnService,
  ICommentAttachmentService,
  ICommentService,
  ISearchService,
  ITodoService,
  IUserService,
  IUpdateService,
} from '@inversify/interfaces/services';

export interface IServices {
  readonly authService: IAuthService;
  readonly userService: IUserService;
  readonly boardService: IBoardService;
  readonly columnService: IColumnService;
  readonly todoService: ITodoService;
  readonly commentService: ICommentService;
  readonly commentAttachmentService: ICommentAttachmentService;
  readonly searchService: ISearchService;
  readonly updateService: IUpdateService;
}
