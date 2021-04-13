import React, {
  BaseSyntheticEvent,
  FC, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ControlButton } from '@comp/ControlButton';
import { Input } from '@comp/Input';
import {
  BoardsActions, ColumnsActions, HeadingsActions, SearchActions, SubTodosActions, SystemActions, TodosActions,
} from '@store/actions';
import { getActiveBoardId, getIsSearchMode } from '@store/selectors';
import { useDebounce } from '@use/debounce';

export const Search: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [query, setQuery] = useState<string>('');

  const activeBoardId = useSelector(getActiveBoardId);
  const isSearchMode = useSelector(getIsSearchMode);

  const debounceSearch = useDebounce((queryString: string) => {
    dispatch(SearchActions.effect.searchByTodoTitle({ query: queryString }));
  }, 100);

  useEffect(() => {
    if (query) {
      debounceSearch(query);
    }
  }, [query]);

  useEffect(() => {
    if (!query && isSearchMode) {
      dispatch(BoardsActions.effect.fetchAll());
      dispatch(ColumnsActions.effect.fetchByBoardId({ boardId: activeBoardId! }));
      dispatch(HeadingsActions.effect.fetchByBoardId({ boardId: activeBoardId! }));
      dispatch(TodosActions.effect.fetchByBoardId({ boardId: activeBoardId! }));
      dispatch(SubTodosActions.effect.fetchByBoardId({ boardId: activeBoardId! }));
      dispatch(SystemActions.setIsSearchMode(false));
    }
  }, [query, isSearchMode]);

  const handleClear = () => {
    setQuery('');
  };

  const handleQueryChange = (event: BaseSyntheticEvent) => setQuery(event.target.value);

  return (
    <div className="search">
      <Input
        type="text"
        placeholder={t('Search')}
        name="search"
        value={query}
        onChange={handleQueryChange}
        style={{ height: 36, paddingLeft: 33 }}
      >
        <img src="/assets/svg/search.svg" alt="search" />
        <ControlButton
          className="search__button"
          imageSrc="/assets/svg/close.svg"
          alt="clear"
          isHide={query.length === 0}
          imageSize={10}
          size={21}
          onClick={handleClear}
        />
      </Input>
    </div>
  );
};
