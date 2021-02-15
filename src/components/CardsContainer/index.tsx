import React, { FC, useMemo } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import {
  EnumTodoStatus, EnumTodoType, IColor, ITodo,
} from '@type/entities';
import { Card } from '@comp/Card';
import { FallbackLoader } from '@comp/FallbackLoader';
import { getActiveTodoId, getIsLoadedTodos, getIsSearchMode } from '@store/selectors';
import { EnumColumnMode } from '@comp/Column';
import { ControlButton } from '@comp/ControlButton';
import { useHover } from '@use/hover';

interface ICardsContainer {
  columnId: number;
  todos?: Array<ITodo>;
  cardType: EnumTodoType;
  mode: EnumColumnMode;
  isOpenNewCard: boolean;
  isDraggingCard: boolean;
  onExitFromEditable: (
    id?: number,
    title?: string,
    description?: string,
    status?: EnumTodoStatus,
    color?: IColor,
    belowId?: number,
  ) => void;
  onAddCard: () => void;
}

export const CardsContainer: FC<ICardsContainer> = ({
  columnId,
  todos,
  cardType,
  mode,
  isOpenNewCard,
  isDraggingCard,
  onExitFromEditable,
  onAddCard,
}) => {
  const { isHovering, hoveringProps } = useHover();

  const activeTodoId = useSelector(getActiveTodoId);
  const isLoadedTodos = useSelector(getIsLoadedTodos);
  const isSearchMode = useSelector(getIsSearchMode);

  const todosCount = todos?.length;

  const memoAddCard = useMemo(() => (
    (!isDraggingCard && mode !== EnumColumnMode.New) && (
      <ControlButton
        imageSrc="/assets/svg/add.svg"
        alt="add"
        text="Add card"
        isInvisible
        isMaxWidth
        isHoverBlock={isHovering || todosCount === 0}
        onClick={onAddCard}
      />
    )
  ), [isHovering, isDraggingCard, isOpenNewCard, mode, todosCount]);

  const memoNewCard = useMemo(() => (
    <Card
      columnId={columnId}
      cardType={cardType}
      isEditableDefault
      onExitFromEditable={(t, d, isDone) => onExitFromEditable(undefined, t, d, isDone)}
    />
  ), [isOpenNewCard]);

  return (
    <div
      {...hoveringProps}
    >
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
      {
        mode !== EnumColumnMode.Deleted && (
        <>
          {
            isOpenNewCard ? memoNewCard : memoAddCard
          }
          {
            isDraggingCard && (
            <div style={{ height: 78 }} />
            )
          }
        </>
        )
      }
    </div>
  );
};
