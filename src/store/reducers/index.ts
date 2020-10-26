import { combineReducers } from 'redux';
import { IRootState } from './state';
import { SystemReducer } from './system';
import { UserReducer } from './user';
import { BoardsReducer } from './boards';
import { ColumnsReducer } from './columns';
import { TodosReducer } from './todos';
import { CommentsReducer } from './comments';
import { CommentAttachmentsReducer } from './comment-attachments';

export const rootReducer = combineReducers<IRootState>({
  system: SystemReducer as any,
  user: UserReducer as any,
  boards: BoardsReducer as any,
  columns: ColumnsReducer as any,
  todos: TodosReducer as any,
  comments: CommentsReducer as any,
  commentAttachments: CommentAttachmentsReducer as any,
});
