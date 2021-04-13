/* eslint-disable no-nested-ternary */
import React, { FC, useMemo } from 'react';
import {
  Draggable, DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { NEW_TODO_ID } from '@/constants';
import { TodoCard } from '@comp/Card/Todo';
import { ControlButton } from '@comp/ControlButton';
import { FallbackLoader } from '@comp/FallbackLoader';
import { EnumHeadingMode } from '@comp/Heading';
import {
  getActiveTodoId,
  getEditableCardId,
  getIsLoadedTodos,
  getIsSearchMode,
  getTodoPositionsByHeadingId,
} from '@store/selectors';
import { EnumCardType, EnumHeadingType } from '@type/entities';
import { useHover } from '@use/hover';
import { useParamSelector } from '@use/paramSelector';

interface ICardsContainer {
  headingId: number;
  cardType: EnumCardType;
  mode: EnumHeadingMode;
  type: EnumHeadingType;
  isOpenNewCard: boolean;
  isShowAddCardButton?: boolean;
  dropSnapshot: DroppableStateSnapshot;
  onAddCard?: () => void;
}

export const CardsContainer: FC<ICardsContainer> = ({
  headingId,
  cardType,
  mode,
  type,
  isOpenNewCard,
  isShowAddCardButton,
  dropSnapshot,
  onAddCard,
}) => {
  const { t } = useTranslation();
  const { isHovering, hoveringProps } = useHover();

  const activeTodoId = useSelector(getActiveTodoId);
  const isLoadedTodos = useSelector(getIsLoadedTodos);
  const isSearchMode = useSelector(getIsSearchMode);
  const editableCardId = useSelector(getEditableCardId);
  const todoPositions = useParamSelector(getTodoPositionsByHeadingId, headingId);

  const todosCount = todoPositions?.length;

  const memoAddCard = useMemo(() => (
    (mode !== EnumHeadingMode.New) && (
    <ControlButton
      imageSrc="/assets/svg/add.svg"
      alt="add"
      className="add-card"
      text={t('Add card')}
      isInvisible
      style={{ margin: '1px 0' }}
      isMaxWidth
      isHoverBlock={!dropSnapshot.isDraggingOver
        && (isHovering || isShowAddCardButton || (type === EnumHeadingType.Default && todosCount === 0))}
      onClick={onAddCard}
    />
    )
  ), [t, isHovering, isShowAddCardButton, dropSnapshot, isOpenNewCard, mode, type, todosCount]);

  const memoNewCard = useMemo(() => (
    <TodoCard
      todoId={NEW_TODO_ID}
      headingIdForNew={headingId}
      cardType={cardType}
      isEditable
    />
  ), [headingId]);

  const memoTodoList = useMemo(() => todoPositions?.map((id, index) => (
    <Draggable
      key={id}
      draggableId={`todo-${id}`}
      index={index}
      isDragDisabled={isSearchMode}
    >
      {(dragProvided, dragSnapshot) => (
        <TodoCard
          cardType={cardType}
          provided={dragProvided}
          snapshot={dragSnapshot}
          key={id}
          todoId={id}
          isActive={activeTodoId === id}
          isEditable={id === editableCardId}
          invertColor={type === EnumHeadingType.Archived}
        />
      )}
    </Draggable>
  )),
  [todoPositions, isSearchMode, cardType, activeTodoId, editableCardId]);

  return (
    <div {...hoveringProps}>
      {memoTodoList}
      <FallbackLoader
        isAbsolute
        size="small"
        delay={1000}
        backgroundColor="#ffffff"
        isLoading={!isLoadedTodos}
      />
      <>
        {type === EnumHeadingType.Default || type === EnumHeadingType.Custom
          ? (isOpenNewCard ? memoNewCard : memoAddCard)
          : null}
        {/* {type !== EnumHeadingType.Archived && dropSnapshot.isDraggingOver && <div style={{ height: 36 }} />} */}
        {/* {type !== EnumHeadingType.Archived && dropProvided.placeholder} */}
      </>
    </div>
  );
};
