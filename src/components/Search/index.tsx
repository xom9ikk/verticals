/* eslint-disable no-shadow */
import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@comp/Input';
import {
  BoardsActions, ColumnsActions,
  SearchActions, SystemActions, TodosActions,
} from '@store/actions';
import debounce from 'lodash.debounce';
import { getActiveBoardId, getIsSearchMode } from '@store/selectors';

interface ISearch {
}

export const Search: FC<ISearch> = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState<string>('');
  const activeBoardId = useSelector(getActiveBoardId);
  const isSearchMode = useSelector(getIsSearchMode);

  const debounceSearch = useCallback(
    debounce((queryString: string) => {
      dispatch(SearchActions.searchByTodoTitle({ query: queryString }));
    }, 100),
    [],
  );

  useEffect(() => {
    if (query) {
      debounceSearch(query);
    } else {
      dispatch(BoardsActions.fetchAll());
      dispatch(ColumnsActions.fetchByBoardId({ boardId: activeBoardId! }));
      dispatch(TodosActions.fetchByBoardId({ boardId: activeBoardId! }));
    }
    if (!query && isSearchMode) {
      dispatch(SystemActions.setIsSearchMode(false));
    }
  }, [query, isSearchMode]);

  return (
    <div className="search">
      <Input
        type="text"
        placeholder="Search"
        name="search"
        value={query}
        onChange={(e: any) => setQuery(e.target.value)}
        style={{ height: 33, paddingLeft: 33 }}
      >
        <img src="/assets/svg/search.svg" alt="search" />
      </Input>
    </div>
  );
};
