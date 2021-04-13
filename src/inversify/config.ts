import { Container } from 'inversify';
import { TYPES } from '@inversify/types';
import { HttpClient } from '@plugins/httpClient';
import { WSClient } from '@plugins/wsClient';
import { IServices } from '@inversify/interfaces';
import {
  IAuthService,
  IBoardService,
  IColumnService,
  ICommentAttachmentService,
  ICommentService,
  IHeadingService,
  ISearchService,
  ISubTodoService,
  ITodoService,
  IUpdateService,
  IUserService,
} from '@inversify/interfaces/services';
import { IHttpClient } from '@inversify/interfaces/httpClient';
import { IWSClient } from '@inversify/interfaces/wsClient';
import { Services } from '@/services';
import { AuthService } from '@services/auth';
import { UserService } from '@services/user';
import { BoardService } from '@services/board';
import { ColumnService } from '@services/column';
import { HeadingService } from '@services/heading';
import { TodoService } from '@services/todo';
import { SubTodoService } from '@services/sub-todo';
import { CommentService } from '@services/comment';
import { CommentAttachmentService } from '@services/comment-attachment';
import { SearchService } from '@services/search';
import { UpdateService } from '@services/update';

const container = new Container();

container
  .bind<IHttpClient>(TYPES.HttpClient)
  .to(HttpClient)
  .inSingletonScope();

container
  .bind<IWSClient>(TYPES.WSClient)
  .to(WSClient)
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
  .bind<IHeadingService>(TYPES.HeadingService)
  .to(HeadingService)
  .inSingletonScope();

container
  .bind<ITodoService>(TYPES.TodoService)
  .to(TodoService)
  .inSingletonScope();

container
  .bind<ISubTodoService>(TYPES.SubTodoService)
  .to(SubTodoService)
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

container
  .bind<IUpdateService>(TYPES.UpdateService)
  .to(UpdateService)
  .inSingletonScope();

export { container };
