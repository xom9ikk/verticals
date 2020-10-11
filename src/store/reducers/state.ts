import {
  ISystem, IBoards, IColumns, ITodos, IComments, IUser,
} from '@/types/entities';

export interface IRootState {
  system: ISystem;
  boards: IBoards;
  columns: IColumns;
  todos: ITodos;
  comments: IComments;
  user: IUser;
}
