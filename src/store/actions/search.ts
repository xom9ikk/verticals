import { createAction } from '@reduxjs/toolkit';
import { ISearchByTodoTitle } from '@type/actions';

const searchByTodoTitle = createAction<ISearchByTodoTitle>('SEARCH/SEARCH_BY_TODO_TITLE');

export const SearchActions = {
  searchByTodoTitle,
};
