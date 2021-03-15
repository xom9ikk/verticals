import React, { FC, useMemo } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import {
  EnumTodoType,
} from '@type/entities';
import { Card } from '@comp/Card';
import { FallbackLoader } from '@comp/FallbackLoader';
import {
  getActiveTodoId,
  getEditableCardId,
  getIsLoadedTodos,
  getIsSearchMode,
  getNonArchivedTodoPositionsByColumnId,
} from '@store/selectors';
import { EnumColumnMode } from '@comp/Column';
import { ControlButton } from '@comp/ControlButton';
import { useHover } from '@use/hover';
import { NEW_TODO_ID } from '@/constants';
import { useTranslation } from 'react-i18next';
import { useParamSelector } from '@use/paramSelector';

interface ICardsContainer {
  columnId: number;
  cardType: EnumTodoType;
  mode: EnumColumnMode;
  isOpenNewCard: boolean;
  isDraggingCard: boolean;
  onAddCard: () => void;
  scrollToBottom: () => void;
}

export const CardsContainer: FC<ICardsContainer> = ({
  columnId,
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
  const todoPositions = useParamSelector(getNonArchivedTodoPositionsByColumnId, columnId);

  const todosCount = todoPositions?.length;

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
  ), [t, isHovering, isDraggingCard, isOpenNewCard, mode, todosCount]);

  const memoNewCard = useMemo(() => (
    <Card
      todoId={NEW_TODO_ID}
      columnIdForNew={columnId}
      cardType={cardType}
      isEditable
      scrollToBottom={scrollToBottom}
    />
  ), [editableCardId]);

  return (
    <div {...hoveringProps}>
      {
        todoPositions?.map((id, index) => (
          <Draggable
            key={id}
            draggableId={`todo-${id}`}
            index={index}
            isDragDisabled={isSearchMode}
          >
            {(
              dragProvided: DraggableProvided,
              dragSnapshot: DraggableStateSnapshot,
            ) => (
              <Card
                cardType={cardType}
                provided={dragProvided}
                snapshot={dragSnapshot}
                key={id}
                todoId={id}
                isActive={activeTodoId === id}
                isEditable={id === editableCardId}
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
