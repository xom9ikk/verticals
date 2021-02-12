import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { Input } from '@comp/Input';
import { ControlButton } from '@comp/ControlButton';
import {
  BoardsActions, ColumnsActions, SearchActions, SystemActions, TodosActions,
} from '@store/actions';
import { getActiveBoardId, getIsSearchMode } from '@store/selectors';

export const Search: FC<{}> = () => {
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
    }
    if (!query && isSearchMode) {
      dispatch(BoardsActions.fetchAll());
      dispatch(ColumnsActions.fetchByBoardId({ boardId: activeBoardId! }));
      dispatch(TodosActions.fetchByBoardId({ boardId: activeBoardId! }));
      dispatch(SystemActions.setIsSearchMode(false));
    }
  }, [query, isSearchMode]);

  const handleClear = () => {
    setQuery('');
  };

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
        <ControlButton
          imageSrc="/assets/svg/close.svg"
          alt="clear"
          isHide={query.length === 0}
          imageSize={10}
          size={21}
          style={{
            position: 'absolute',
            right: 4,
            top: 6,
          }}
          onClick={handleClear}
        />
      </Input>
    </div>
  );
};
