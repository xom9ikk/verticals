import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import {
  Draggable, DroppableProvided, DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import {
  getActiveSubTodoId,
  getEditableSubCardId,
  getIsSearchMode,
} from '@store/selectors';
import cn from 'classnames';
import { SubCardContainerToolbar } from '@comp/SubCardContainer/Toolbar';
import { SubTodoCard } from '@comp/Card/SubTodo';
import { EnumCardType, ID } from '@type/entities';
import { MAX_SUB_TODO, NEW_SUB_TODO_ID } from '@/constants';

interface ISubCardsContainer {
  dropSnapshot: DroppableStateSnapshot;
  dropProvided: DroppableProvided;
  todoId: number;
  subTodoPositions: Array<ID>;
  cardType: EnumCardType;
  isOpen: boolean;
  onAddSubCard: () => void;
}

export const SubCardContainer: FC<ISubCardsContainer> = ({
  dropSnapshot,
  dropProvided,
  todoId,
  subTodoPositions,
  cardType,
  isOpen,
  onAddSubCard,
}) => {
  const [isCollapse, setIsCollapse] = useState<boolean>(true);

  const activeSubTodoId = useSelector(getActiveSubTodoId);
  const isSearchMode = useSelector(getIsSearchMode);
  const editableSubCardId = useSelector(getEditableSubCardId);

  const subTodosCount = subTodoPositions?.length;
  const isOpenNewSubCard = editableSubCardId === `${todoId}-${NEW_SUB_TODO_ID}`;

  const handleSwitchCollapse = () => {
    setIsCollapse((prev) => !prev);
  };

  useEffect(() => {
    if (isOpenNewSubCard && isCollapse && subTodosCount > MAX_SUB_TODO) {
      setIsCollapse(false);
    }
  }, [subTodosCount]);

  const memoNewSubCard = useMemo(() => (
    <SubTodoCard
      subTodoId={NEW_SUB_TODO_ID}
      todoIdForNew={todoId}
      cardType={cardType}
      isEditable
    />
  ), [todoId]);

  useEffect(() => {
    console.log('SubCardContainer mount');
    return () => {
      console.log('SubCardContainer unmount');
    };
  }, []);

  return (
    <div
      className={cn('sub-card-container', {
        'sub-card-container--collapse': !isOpen,
      })}
    >
      {/* <Droppable */}
      {/*  droppableId={`todo-${todoId}`} */}
      {/*  type="SUBCARD" */}
      {/* > */}
      {/*  { */}
      {/*    (dropProvided, dropSnapshot) => ( */}
      <div
        ref={dropProvided.innerRef}
        className={cn('sub-card-container__inner', {
          'sub-card-container__inner--dragging-over': dropSnapshot.isDraggingOver,
        })}
      >
        {
                subTodoPositions
                  .slice(0, isCollapse ? MAX_SUB_TODO : subTodoPositions.length)
                  .map((id, index) => (
                    <Draggable
                      key={id}
                      draggableId={`subTodo-${id}`}
                      index={index}
                      isDragDisabled={isSearchMode}
                    >
                      {(dragProvided, dragSnapshot) => (
                        <SubTodoCard
                          cardType={cardType}
                          provided={dragProvided}
                          snapshot={dragSnapshot}
                          key={id}
                          subTodoId={id}
                          isActive={activeSubTodoId === id}
                          isEditable={id === editableSubCardId}
                        />
                      )}
                    </Draggable>
                  ))
              }
        {isOpenNewSubCard ? memoNewSubCard
          : (
            <SubCardContainerToolbar
              isHide={dropSnapshot.isDraggingOver}
              isCollapse={isCollapse}
              subTodosCount={subTodosCount}
              onSwitchCollapse={handleSwitchCollapse}
              onAddSubCard={onAddSubCard}
            />
          )}
        {dropProvided.placeholder}
      </div>
      {/* ) */}
      {/* } */}
      {/* </Droppable> */}
    </div>
  );
};
