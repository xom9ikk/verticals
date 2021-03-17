import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { EnumTodoType } from '@type/entities';
import { Card } from '@comp/Card';
import { FallbackLoader } from '@comp/FallbackLoader';
import {
  getIsLoadedTodos,
  getIsSearchMode,
  getTodosEntities,
} from '@store/selectors';

export const DeletedCardsContainer: FC = () => {
  const isLoadedTodos = useSelector(getIsLoadedTodos);
  const allTodos = useSelector(getTodosEntities);
  const isSearchMode = useSelector(getIsSearchMode);

  const todos = isSearchMode ? [] : allTodos;

  return (
    <div>
      {
        todos?.map(({ id }) => (
          <Card
            cardType={EnumTodoType.Checkboxes}
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
