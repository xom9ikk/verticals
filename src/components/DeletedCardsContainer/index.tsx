import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { EnumCardType } from '@type/entities';
import { FallbackLoader } from '@comp/FallbackLoader';
import {
  getIsLoadedTodos,
  getIsSearchMode,
  getTodosEntities,
} from '@store/selectors';
import { TodoCard } from '@comp/Card/Todo';

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
