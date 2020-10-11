import { combineReducers } from 'redux';
import { IRootState } from './state';
import { SystemReducer } from './system';
import { BoardsReducer } from './boards';
import { ColumnsReducer } from './columns';
import { TodosReducer } from './todos';
import { CommentsReducer } from './comments';
import { UserReducer } from './user';

export const rootReducer = combineReducers<IRootState>({
  system: SystemReducer as any,
  boards: BoardsReducer as any,
  columns: ColumnsReducer as any,
  todos: TodosReducer as any,
  comments: CommentsReducer as any,
  user: UserReducer as any,
});
