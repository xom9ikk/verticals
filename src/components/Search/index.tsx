import React, { FC, SyntheticEvent, useState } from 'react';
import { Input } from '../Input';

interface ISearch {
}

export const Search: FC<ISearch> = () => {
  const [query, setQuery] = useState<string>('');
  return (
    <div className="search">
      <Input
        type="text"
        placeholder="Search"
        name="search"
        value={query}
        onChange={(e: any) => setQuery(e.target.value)}
      >
        <img src="/svg/search.svg" alt="search" />
      </Input>
    </div>
  );
};
