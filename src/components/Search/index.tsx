import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@comp/Input';
import { SystemActions } from '@/store/actions';

interface ISearch {
}

export const Search: FC<ISearch> = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState<string>('');
  useEffect(() => {
    dispatch(SystemActions.setQuery(query));
  }, [query]);
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
