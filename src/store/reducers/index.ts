import { combineReducers } from '@reduxjs/toolkit';

import { BoardsReducer } from './boards';
import { ColumnsReducer } from './columns';
import { CommentAttachmentsReducer } from './comment-attachments';
import { CommentsReducer } from './comments';
import { HeadingsReducer } from './headings';
import { SubTodosReducer } from './sub-todos';
import { SystemReducer } from './system';
import { TodosReducer } from './todos';
import { UserReducer } from './user';

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
