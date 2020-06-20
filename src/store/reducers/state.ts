import {
  ISystem, IBoards, IColumns, ITodos,
} from '../../types';

export interface IRootState {
  system: ISystem;
  boards: IBoards;
  columns: IColumns;
  todos: ITodos;
}
