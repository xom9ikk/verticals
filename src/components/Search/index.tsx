import React, {
  FC, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@comp/Input';
import { ControlButton } from '@comp/ControlButton';
import {
  BoardsActions, ColumnsActions, SearchActions, SystemActions, TodosActions,
} from '@store/actions';
import { getActiveBoardId, getIsSearchMode } from '@store/selectors';
import { useDebounce } from '@use/debounce';
import { useTranslation } from 'react-i18next';

export const Search: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [query, setQuery] = useState<string>('');

  const activeBoardId = useSelector(getActiveBoardId);
  const isSearchMode = useSelector(getIsSearchMode);

  const debounceSearch = useDebounce((queryString: string) => {
    dispatch(SearchActions.searchByTodoTitle({ query: queryString }));
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
      dispatch(TodosActions.effect.fetchByBoardId({ boardId: activeBoardId! }));
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
        placeholder={t('Search')}
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
