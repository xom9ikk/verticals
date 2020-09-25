import React, { FC } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import {
  EnumColors, EnumTodoStatus, EnumTodoType, ITodos,
} from '@/types';
import { Card } from '@comp/Card';
import { IRootState } from '@/store/reducers/state';

interface ICardsContainer {
  todos?: ITodos;
  isActiveQuery: boolean;
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
  isActiveQuery,
  cardType,
  onExitFromEditable,
}) => {
  const { currentTodoId } = useSelector((state: IRootState) => state.system);

  return (
    <>
      {
        todos
          ?.map((todo) => (
            <Draggable
              key={todo.id}
              draggableId={`todo-${todo.id}`}
              index={todo.position}
              isDragDisabled={isActiveQuery || todo.belowId !== undefined}
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
                  title={`${todo.title}-${todo.position}-${todo.id}`}
                  description={todo.description}
                  status={todo.status}
                  color={todo.color}
                  isArchived={todo.isArchived}
                  isNotificationsEnabled={todo.isNotificationsEnabled}
                  onExitFromEditable={(...rest) => onExitFromEditable(todo.id, ...rest)}
                  isActive={currentTodoId === todo.id}
                />
              )}
            </Draggable>
          ))
        }
    </>
  );
};
