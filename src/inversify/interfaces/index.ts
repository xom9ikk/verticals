import {
  IAuthService,
  IBoardService,
  IColumnService,
  ICommentAttachmentService,
  ICommentService,
  ISearchService,
  ITodoService,
  IUserService,
} from '@/inversify/interfaces/services';

export interface IServices {
  authService: IAuthService;
  userService: IUserService;
  boardService: IBoardService;
  columnService: IColumnService;
  todoService: ITodoService;
  commentService: ICommentService;
  commentAttachmentService: ICommentAttachmentService;
  searchService: ISearchService;
}
