import { Container } from 'inversify';
import { HttpClient } from '@plugins/httpClient';
import { IServices } from '@inversify/interfaces';
import {
  IAuthService,
  IBoardService,
  IColumnService,
  ICommentAttachmentService,
  ICommentService,
  ISearchService,
  ITodoService,
  IUserService,
} from '@inversify/interfaces/services';
import { IHttpClient } from '@inversify/interfaces/httpClient';
import { Services } from '@/services';
import { AuthService } from '@services/auth';
import { UserService } from '@services/user';
import { BoardService } from '@services/board';
import { ColumnService } from '@services/column';
import { TodoService } from '@services/todo';
import { CommentService } from '@services/comment';
import { CommentAttachmentService } from '@services/comment-attachment';
import { SearchService } from '@services/search';
import { TYPES } from '@inversify/types';

const container = new Container();

container
  .bind<IHttpClient>(TYPES.HttpClient)
  .to(HttpClient)
  .inSingletonScope();

container
  .bind<IServices>(TYPES.Services)
  .to(Services)
  .inSingletonScope();

container
  .bind<IAuthService>(TYPES.AuthService)
  .to(AuthService)
  .inSingletonScope();

container
  .bind<IUserService>(TYPES.UserService)
  .to(UserService)
  .inSingletonScope();

container
  .bind<IBoardService>(TYPES.BoardService)
  .to(BoardService)
  .inSingletonScope();

container
  .bind<IColumnService>(TYPES.ColumnService)
  .to(ColumnService)
  .inSingletonScope();

container
  .bind<ITodoService>(TYPES.TodoService)
  .to(TodoService)
  .inSingletonScope();

container
  .bind<ICommentService>(TYPES.CommentService)
  .to(CommentService)
  .inSingletonScope();

container
  .bind<ICommentAttachmentService>(TYPES.CommentAttachmentService)
  .to(CommentAttachmentService)
  .inSingletonScope();

container
  .bind<ISearchService>(TYPES.SearchService)
  .to(SearchService)
  .inSingletonScope();

export { container };
