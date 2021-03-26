import { combineReducers } from '@reduxjs/toolkit';
import { SystemReducer } from './system';
import { UserReducer } from './user';
import { BoardsReducer } from './boards';
import { ColumnsReducer } from './columns';
import { HeadingsReducer } from './headings';
import { TodosReducer } from './todos';
import { SubTodosReducer } from './sub-todos';
import { CommentsReducer } from './comments';
import { CommentAttachmentsReducer } from './comment-attachments';

export const rootReducer = combineReducers({
  system: SystemReducer,
  user: UserReducer,
  boards: BoardsReducer,
  columns: ColumnsReducer,
  headings: HeadingsReducer,
  todos: TodosReducer,
  subTodos: SubTodosReducer,
  comments: CommentsReducer,
  commentAttachments: CommentAttachmentsReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
