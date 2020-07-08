import {
  ISystem, IBoards, IColumns, ITodos, IComments,
} from '../../types';

export interface IRootState {
  system: ISystem;
  boards: IBoards;
  columns: IColumns;
  todos: ITodos;
  comments: IComments;
}
