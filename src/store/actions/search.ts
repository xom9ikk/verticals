import { createAction } from 'redux-actions';
import { ISearchByTodoTitle } from '@/types/actions';

enum Type {
  SEARCH_BY_TODO_TITLE = 'SEARCH/SEARCH_BY_TODO_TITLE',
}

const searchByTodoTitle = createAction<ISearchByTodoTitle>(Type.SEARCH_BY_TODO_TITLE);

export const SearchActions = {
  Type,
  searchByTodoTitle,
};
