import React, {
  BaseSyntheticEvent,
  FC, useEffect, useState,
} from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableProvided, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd';
import { redirectTo } from '@router/history';
import {
  EnumTodoStatus, EnumCardType, IColor, ITodo,
} from '@type/entities';
import { NEW_SUB_TODO_ID, NEW_TODO_ID, TEMP_ID } from '@/constants';
import { CommentsActions, SystemActions, TodosActions } from '@store/actions';
import {
  getUsername,
  getActiveBoardReadableId,
  getTodoById,
  getSubTodoPositionsByTodoId,
} from '@store/selectors';
import { Card } from '@comp/Card';
import { Bullet } from '@comp/Bullet';
import { DateBadge } from '@comp/DateBadge';
import { SubCardContainer } from '@comp/SubCardContainer';
import { ControlButton } from '@comp/ControlButton';
import {
  CardEditable, ICreateCardEntity, IUpdateCardEntity,
} from '@comp/Card/Editable';
import { TodoContextMenu } from '@comp/Card/Todo/ContextMenu';
import { useReadableId } from '@use/readableId';
import { useParamSelector } from '@use/paramSelector';
import { useClickPreventionOnDoubleClick } from '@use/clickPreventionOnDoubleClick';
import { TodoAttachmentsPreview } from '@comp/Card/Attachments/Preview/Todo';

interface ITodoCard {
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  todoId: number;
  headingIdForNew?: number;
  cardType: EnumCardType;
  invertColor?: boolean;
  isEditable: boolean;
  isActive?: boolean;
}

export const TodoCard: FC<ITodoCard> = ({
  provided,
  snapshot,
  todoId,
  headingIdForNew,
  cardType,
  invertColor,
  isEditable,
  isActive,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { toReadableId } = useReadableId();

  const {
    headingId,
    belowId,
    title = '',
    description = '',
    status = EnumTodoStatus.Todo,
    color,
    isNotificationsEnabled,
    expirationDate,
    commentsCount,
    imagesCount,
    attachmentsCount,
  } = useParamSelector(getTodoById, todoId) as ITodo;

  const targetHeadingId = headingIdForNew === undefined ? headingId : headingIdForNew;
  const targetCardForHeadingId = `${targetHeadingId}-${todoId}`;
  const newCardForHeadingId = `${targetHeadingId}-${NEW_TODO_ID}`;

  const username = useSelector(getUsername);
  const activeBoardReadableId = useSelector(getActiveBoardReadableId);
  const subTodoPositions = useParamSelector(getSubTodoPositionsByTodoId, todoId);

  const [firstSubTodoId] = subTodoPositions;
  const isOpenNewSubCardOnTop = firstSubTodoId === TEMP_ID;

  const [isOpenSubCardList, setIsOpenSubCardList] = useState<boolean>(false);

  useEffect(() => {
    if (isOpenNewSubCardOnTop) {
      setIsOpenSubCardList(true);
    }
  }, [isOpenNewSubCardOnTop]);

  const handleColorPick = (newColor: IColor) => {
    dispatch(TodosActions.effect.update({ id: todoId, color: newColor }));
  };

  const handleChangeStatus = (newStatus: EnumTodoStatus) => {
    dispatch(TodosActions.effect.update({ id: todoId, status: newStatus }));
  };

  const handleClickUnwrapped = () => {
    redirectTo(`/${username}/${activeBoardReadableId}/card/${toReadableId(title, todoId)}`);
  };

  const handleDoubleClickUnwrapped = () => {
    dispatch(SystemActions.setEditableCardId(todoId));
  };

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(handleClickUnwrapped, handleDoubleClickUnwrapped, isEditable);

  const saveFiles = (attachedFiles: FileList | null) => {
    if (attachedFiles?.length) {
      dispatch(CommentsActions.effect.create({
        todoId,
        text: '',
        files: attachedFiles,
      }));
    }
  };

  useEffect(() => {
    if (belowId) {
      dispatch(SystemActions.setEditableCardId(todoId));
    }
  }, []);

  const handleSelectDateAndUpdate = (selectedDate: Date | null) => {
    dispatch(SystemActions.setActivePopupId(null));
    dispatch(TodosActions.effect.update({
      id: todoId,
      expirationDate: selectedDate,
    }));
  };

  const handleClickSubcardButton = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
    setIsOpenSubCardList((prev) => !prev);
  };

  const handleUpdateTodo = (data: IUpdateCardEntity) => {
    dispatch(TodosActions.effect.update({
      id: todoId,
      title: data.title,
      description: data.description,
      expirationDate: data.expirationDate,
    }));
  };

  const handleCreateTodo = (data: ICreateCardEntity) => {
    dispatch(TodosActions.effect.create({
      headingId: targetHeadingId!,
      title: data.title,
      description: data.description,
      expirationDate: data.expirationDate,
      files: data.files,
      belowId,
    }));
  };

  const handleAddSubCard = () => {
    dispatch(SystemActions.setEditableSubCardId(`${todoId}-${NEW_SUB_TODO_ID}`));
  };

  const card = () => (
    <Card
      provided={provided}
      snapshot={snapshot}
      color={color}
      invertColor={invertColor}
      isEditable={isEditable}
      isActive={isActive}
      onSaveFiles={saveFiles}
      subCardComponent={(
        <SubCardContainer
          todoId={todoId}
          subTodoPositions={subTodoPositions}
          cardType={cardType}
          isOpen={isOpenSubCardList && subTodoPositions.length > 0}
          onAddSubCard={handleAddSubCard}
        />
      )}
    >
      {(files, setFiles) => (
        <div
          className={cn('card__block-wrapper', {
            'card__block-wrapper--editable': isEditable,
          })}
          onClick={(e) => !isEditable && handleClick(e)}
        >
          {todoId !== NEW_TODO_ID && (
            <Bullet
              type={cardType}
              status={status}
              onChangeStatus={handleChangeStatus}
              style={{ marginTop: isEditable ? 11 : 12 }}
            />
          )}
          <div
            className="card__block"
            onDoubleClick={!isEditable ? handleDoubleClick : () => {}}
          >
            {isEditable ? (
              <CardEditable
                belowId={belowId}
                title={title}
                description={description}
                expirationDate={expirationDate}
                isNewCard={targetCardForHeadingId === newCardForHeadingId}
                datePopupId={`card-${todoId}`}
                files={files}
                onSetFiles={setFiles}
                onSaveFiles={saveFiles}
                onUpdateEntity={handleUpdateTodo}
                onCreateEntity={handleCreateTodo}
              />
            ) : (
              <div className="card__inner">
                <TodoContextMenu
                  menuId="card"
                  todoId={todoId}
                  title={title}
                  headingId={headingId}
                  isActive={isActive}
                  isNotificationsEnabled={isNotificationsEnabled}
                  expirationDate={expirationDate}
                  color={color}
                  status={status}
                  onStartEdit={handleDoubleClickUnwrapped}
                  onChangeColor={handleColorPick}
                />
                <div
                  className={cn('card__title', {
                    'card__title--cross-out': status === EnumTodoStatus.Canceled,
                  })}
                >
                  {title}
                </div>
                <DateBadge
                  popupId={`card-${todoId}`}
                  date={expirationDate}
                  onSelectDate={handleSelectDateAndUpdate}
                />
                <div className="card__toggle-container">
                  <ControlButton
                    isHide={!subTodoPositions.length}
                    imageSrc="/assets/svg/subcards.svg"
                    tooltip={isOpenSubCardList ? t('Hide subcards') : t('Show subcards')}
                    alt="sub-card"
                    imageSize={16}
                    size={20}
                    isInvertColor={isActive}
                    isTextable
                    onClick={handleClickSubcardButton}
                    onDoubleClick={(e) => e.stopPropagation()}
                    isColored={isOpenSubCardList}
                    isStopPropagation={false}
                    style={{
                      borderRadius: 4,
                    }}
                  />
                </div>
                <TodoAttachmentsPreview
                  headingId={headingId}
                  todoId={todoId}
                  isActive={isActive}
                  commentsCount={commentsCount}
                  imagesCount={imagesCount}
                  attachmentsCount={attachmentsCount}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );

  return isOpenSubCardList ? card() : (
    <Droppable
      droppableId={`todo-${todoId}`}
      type="SUBCARD"
    >
      {
        (dropProvided, dropSnapshot) => (
          <div
            ref={dropProvided.innerRef}
            style={{ borderRadius: 6 }}
            className={cn({
              'sub-card-container__inner--dragging-over': dropSnapshot.isDraggingOver,
            })}
          >
            {card()}
          </div>
        )
      }
    </Droppable>
  );
};
