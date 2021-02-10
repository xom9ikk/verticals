import React, { FC } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import {
  EnumColors, EnumTodoStatus, EnumTodoType, ITodo,
} from '@type/entities';
import { Card } from '@comp/Card';
import { FallbackLoader } from '@comp/FallbackLoader';
import { getActiveTodoId, getIsLoadedTodos, getIsSearchMode } from '@store/selectors';

interface ICardsContainer {
  todos?: Array<ITodo>;
  cardType: EnumTodoType;
  onExitFromEditable: (
    id: number,
    title?: string,
    description?: string,
    status?: EnumTodoStatus,
    color?: EnumColors,
    belowId?: number,
  ) => void;
}

export const CardsContainer: FC<ICardsContainer> = ({
  todos,
  cardType,
  onExitFromEditable,
}) => {
  const activeTodoId = useSelector(getActiveTodoId);
  const isLoadedTodos = useSelector(getIsLoadedTodos);
  const isSearchMode = useSelector(getIsSearchMode);

  return (
    <>
      {
        todos
          ?.map((todo, index) => (
            <Draggable
              key={todo.id}
              draggableId={`todo-${todo.id}`}
              index={index}
              isDragDisabled={isSearchMode || todo.belowId !== undefined}
            >
              {(
                dragProvided: DraggableProvided,
                dragSnapshot: DraggableStateSnapshot,
              ) => (
                <Card
                  cardType={cardType}
                  provided={dragProvided}
                  snapshot={dragSnapshot}
                  key={todo.id}
                  id={todo.id}
                  columnId={todo.columnId}
                  belowId={todo.belowId}
                  title={todo.title}
                  description={todo.description}
                  status={todo.status}
                  color={todo.color}
                  isArchived={todo.isArchived}
                  isNotificationsEnabled={todo.isNotificationsEnabled}
                  commentsCount={todo.commentsCount}
                  imagesCount={todo.imagesCount}
                  attachmentsCount={todo.attachmentsCount}
                  onExitFromEditable={(...rest) => onExitFromEditable(todo.id, ...rest)}
                  isActive={activeTodoId === todo.id}
                />
              )}
            </Draggable>
          ))
        }
      <FallbackLoader
        isAbsolute
        size="small"
        isLoading={!isLoadedTodos}
      />
    </>
  );
};
