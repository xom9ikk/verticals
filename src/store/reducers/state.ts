import {
  ISystem,
  IUser,
  IBoards,
  IColumns,
  ITodos,
  IComments,
  ICommentAttachments,
} from '@/types/entities';

export interface IRootState {
  system: ISystem;
  user: IUser;
  boards: IBoards;
  columns: IColumns;
  todos: ITodos;
  comments: IComments;
  commentAttachments: ICommentAttachments;
}
