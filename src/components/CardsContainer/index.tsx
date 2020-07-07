import React, { FC } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { EnumTodoStatus, EnumTodoType, ITodos } from '../../types';
import { Card } from '../Card';
import { IRootState } from '../../store/reducers/state';

interface ICardsContainer {
  todos?: ITodos;
  isActiveQuery: boolean;
  cardType: EnumTodoType;
  onExitFromEditable: (
    id: string,
    title?: string,
    description?: string,
    status?: EnumTodoStatus,
    color?: number) => void;
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
            ?.map((todo, todoIndex) => (
              <Draggable
                key={todo.id}
                draggableId={todo.id}
                index={todoIndex}
                isDragDisabled={isActiveQuery || todo.id === 'new-todo'}
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
                    title={todo.title}
                    description={todo.description}
                    status={todo.status}
                    color={todo.color}
                    isArchive={todo.isArchive}
                    isNotificationsEnabled={todo.isNotificationsEnabled}
                    onExitFromEditable={
                            (newTitle, newDescription,
                              newStatus, newColor) => onExitFromEditable(
                              todo.id, newTitle, newDescription, newStatus, newColor,
                            )
                          }
                    isActive={currentTodoId === todo.id}
                  />
                )}
              </Draggable>
            ))
        }
    </>
  );
};
