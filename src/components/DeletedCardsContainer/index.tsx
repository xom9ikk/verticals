import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { TodoCard } from '@comp/Card/Todo';
import { FallbackLoader } from '@comp/FallbackLoader';
import {
  getIsLoadedTodos,
  getIsSearchMode,
  getTodosEntities,
} from '@store/selectors';
import { EnumCardType } from '@type/entities';

export const DeletedCardsContainer: FC = () => {
  const isLoadedTodos = useSelector(getIsLoadedTodos);
  const allTodos = useSelector(getTodosEntities);
  const isSearchMode = useSelector(getIsSearchMode);

  const todos = isSearchMode ? [] : allTodos;

  return (
    <div>
      {
        todos?.map(({ id }) => (
          <TodoCard
            cardType={EnumCardType.Checkboxes}
            key={id}
            todoId={id}
            isEditable={false}
          />
        ))
      }
      <FallbackLoader
        isAbsolute
        size="small"
        isLoading={!isLoadedTodos}
      />
    </div>
  );
};
