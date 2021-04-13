import cn from 'classnames';
import React, {
  FC, SyntheticEvent, useEffect,
} from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { NEW_SUB_TODO_ID } from '@/constants';
import { Bullet } from '@comp/Bullet';
import { Card } from '@comp/Card';
import { SubTodoAttachmentsPreview } from '@comp/Card/Attachments/Preview/SubTodo';
import {
  CardEditable, ICreateCardEntity, IUpdateCardEntity,
} from '@comp/Card/Editable';
import { SubTodoContextMenu } from '@comp/Card/SubTodo/ContextMenu';
import { DateBadge } from '@comp/DateBadge';
import { redirectTo } from '@router/history';
import { CommentsActions, SubTodosActions, SystemActions } from '@store/actions';
import { getActiveBoardReadableId, getSubTodoById, getUsername } from '@store/selectors';
import {
  EnumCardType, EnumTodoStatus, IColor, ISubTodo,
} from '@type/entities';
import { useClickPreventionOnDoubleClick } from '@use/clickPreventionOnDoubleClick';
import { useParamSelector } from '@use/paramSelector';
import { useReadableId } from '@use/readableId';

interface ISubTodoCard {
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  subTodoId: number;
  todoIdForNew?: number;
  cardType: EnumCardType;
  invertColor?: boolean;
  isEditable: boolean;
  isActive?: boolean;
}

export const SubTodoCard: FC<ISubTodoCard> = ({
  provided,
  snapshot,
  subTodoId,
  todoIdForNew,
  cardType,
  invertColor,
  isEditable,
  isActive,
}) => {
  const dispatch = useDispatch();
  const { toReadableId } = useReadableId();

  const {
    todoId,
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
  } = useParamSelector(getSubTodoById, subTodoId) as ISubTodo;

  const targetTodoId = todoIdForNew === undefined ? todoId : todoIdForNew;
  const targetCardForTodoId = `${targetTodoId}-${subTodoId}`;
  const newCardForTodoId = `${targetTodoId}-${NEW_SUB_TODO_ID}`;

  const username = useSelector(getUsername);
  const activeBoardReadableId = useSelector(getActiveBoardReadableId);

  const handleColorPick = (newColor: IColor) => {
    dispatch(SubTodosActions.effect.update({ id: subTodoId, color: newColor }));
  };

  const handleChangeStatus = (newStatus: EnumTodoStatus) => {
    dispatch(SubTodosActions.effect.update({ id: subTodoId, status: newStatus }));
  };

  const handleClickUnwrapped = () => {
    redirectTo(`/${username}/${activeBoardReadableId}/subcard/${toReadableId(title, subTodoId)}`);
  };

  const handleDoubleClickUnwrapped = () => {
    dispatch(SystemActions.setEditableSubCardId(subTodoId));
  };

  const {
    handleClick,
    handleDoubleClick,
  } = useClickPreventionOnDoubleClick(handleClickUnwrapped, handleDoubleClickUnwrapped, isEditable);

  const saveFiles = (attachedFiles: FileList | null) => {
    if (attachedFiles?.length) {
      dispatch(CommentsActions.effect.create({
        subTodoId,
        text: '',
        files: attachedFiles,
      }));
    }
  };

  useEffect(() => {
    if (belowId) {
      dispatch(SystemActions.setEditableSubCardId(subTodoId));
    }
  }, []);

  const handleSelectDateAndUpdate = (selectedDate: Date | null) => {
    dispatch(SystemActions.setActivePopupId(null));
    dispatch(SubTodosActions.effect.update({
      id: subTodoId,
      expirationDate: selectedDate,
    }));
  };

  const handleUpdateSubTodo = (data: IUpdateCardEntity) => {
    dispatch(SubTodosActions.effect.update({
      id: subTodoId,
      title: data.title,
      description: data.description,
      expirationDate: data.expirationDate,
    }));
  };

  const handleCreateSubTodo = (data: ICreateCardEntity) => {
    dispatch(SubTodosActions.effect.create({
      todoId: targetTodoId!,
      title: data.title,
      description: data.description,
      expirationDate: data.expirationDate,
      files: data.files,
      belowId,
    }));
  };

  const handleBlockClick = (event: SyntheticEvent) => !isEditable && handleClick(event);

  const handleBlockDoubleClick = (event: SyntheticEvent) => {
    if (!isEditable) {
      handleDoubleClick(event);
    }
  };

  return (
    <Card
      provided={provided}
      snapshot={snapshot}
      color={color}
      className="sub-card"
      invertColor={invertColor}
      isEditable={isEditable}
      isActive={isActive}
      onSaveFiles={saveFiles}
    >
      {(files, setFiles) => (
        <div
          className={cn('card__block-wrapper', {
            'card__block-wrapper--editable': isEditable,
          })}
          onClick={handleBlockClick}
        >
          {subTodoId !== NEW_SUB_TODO_ID && (
            <Bullet
              type={cardType}
              status={status}
              onChangeStatus={handleChangeStatus}
              style={{ marginTop: isEditable ? 9 : 10 }}
            />
          )}
          <div
            className="card__block"
            onDoubleClick={handleBlockDoubleClick}
          >
            {isEditable ? (
              <CardEditable
                belowId={belowId}
                title={title}
                description={description}
                expirationDate={expirationDate}
                isNewCard={targetCardForTodoId === newCardForTodoId}
                datePopupId={`sub-card-${subTodoId}`}
                files={files}
                onSetFiles={setFiles}
                onSaveFiles={saveFiles}
                onUpdateEntity={handleUpdateSubTodo}
                onCreateEntity={handleCreateSubTodo}
              />
            ) : (
              <div className="card__inner">
                <SubTodoContextMenu
                  menuId="sub-card"
                  subTodoId={subTodoId}
                  title={title}
                  todoId={todoId}
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
                  popupId={`sub-card-${subTodoId}`}
                  date={expirationDate}
                  onSelectDate={handleSelectDateAndUpdate}
                />
                <SubTodoAttachmentsPreview
                  todoId={todoId}
                  subTodoId={subTodoId}
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
};
