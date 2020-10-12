import { IRootState } from '@/store/reducers/state';

export const getTodos = (state: IRootState) => state.todos;
