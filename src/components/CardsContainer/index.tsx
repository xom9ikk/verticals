import React, { FC, useMemo } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import {
  EnumTodoType, ITodo,
} from '@type/entities';
import { Card } from '@comp/Card';
import { FallbackLoader } from '@comp/FallbackLoader';
import {
  getActiveTodoId, getEditableCardId, getIsLoadedTodos, getIsSearchMode,
} from '@store/selectors';
import { EnumColumnMode } from '@comp/Column';
import { ControlButton } from '@comp/ControlButton';
import { useHover } from '@use/hover';
import { NEW_TODO_ID } from '@/constants';
import { useTranslation } from 'react-i18next';

interface ICardsContainer {
  columnId: number;
  todos?: Array<ITodo>;
  cardType: EnumTodoType;
  mode: EnumColumnMode;
  isOpenNewCard: boolean;
  isDraggingCard: boolean;
  onAddCard: () => void;
  scrollToBottom: () => void;
}

export const CardsContainer: FC<ICardsContainer> = ({
  columnId,
  todos,
  cardType,
  mode,
  isOpenNewCard,
  isDraggingCard,
  onAddCard,
  scrollToBottom,
}) => {
  const { t } = useTranslation();
  const { isHovering, hoveringProps } = useHover();

  const activeTodoId = useSelector(getActiveTodoId);
  const isLoadedTodos = useSelector(getIsLoadedTodos);
  const isSearchMode = useSelector(getIsSearchMode);
  const editableCardId = useSelector(getEditableCardId);

  const todosCount = todos?.length;

  const memoAddCard = useMemo(() => (
    (!isDraggingCard && mode !== EnumColumnMode.New) && (
      <ControlButton
        imageSrc="/assets/svg/add.svg"
        alt="add"
        text={t('Add card')}
        isInvisible
        isMaxWidth
        isHoverBlock={isHovering || todosCount === 0}
        onClick={onAddCard}
      />
    )
  ), [isHovering, isDraggingCard, isOpenNewCard, mode, todosCount]);

  const memoNewCard = useMemo(() => (
    <Card
      todoId={NEW_TODO_ID}
      columnId={columnId}
      cardType={cardType}
      isEditable
      scrollToBottom={scrollToBottom}
    />
  ), [editableCardId]);

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
                  todoId={todo.id}
                  columnId={todo.columnId}
                  belowId={todo.belowId}
                  title={todo.title}
                  description={todo.description}
                  status={todo.status}
                  color={todo.color}
                  isArchived={todo.isArchived}
                  isRemoved={todo.isRemoved}
                  isNotificationsEnabled={todo.isNotificationsEnabled}
                  expirationDate={todo.expirationDate}
                  commentsCount={todo.commentsCount}
                  imagesCount={todo.imagesCount}
                  attachmentsCount={todo.attachmentsCount}
                  isActive={activeTodoId === todo.id}
                  isEditable={todo.id === editableCardId}
                  scrollToBottom={scrollToBottom}
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
          {isOpenNewCard ? memoNewCard : memoAddCard}
          {isDraggingCard && <div style={{ height: 78 }} />}
        </>
        )
      }
    </div>
  );
};
