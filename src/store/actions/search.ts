import { createAction } from '@reduxjs/toolkit';

import { ISearchByTodoTitle } from '@type/actions';

export const SearchActions = {
  effect: {
    searchByTodoTitle: createAction<ISearchByTodoTitle>('SEARCH-EFFECT/SEARCH_BY_TODO_TITLE'),
  },
};
