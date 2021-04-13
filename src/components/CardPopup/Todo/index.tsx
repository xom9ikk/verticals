import React, {
  FC, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CardPopup } from '@comp/CardPopup';
import { CardPopupHeader } from '@comp/CardPopup/Header';
import {
  CommentAttachmentsActions, CommentsActions, SystemActions, TodosActions,
} from '@store/actions';
import {
  getActiveTodoId, getHeadingById,
  getTodoById,
} from '@store/selectors';
import {
  EnumCardType, EnumTodoStatus, IColor, IHeading, ITodo,
} from '@type/entities';
import { useParamSelector } from '@use/paramSelector';
import { useValueRef } from '@use/valueRef';

interface ITodoCardPopup {
  columnId: number;
  cardType: EnumCardType;
}

export const TodoCardPopup: FC<ITodoCardPopup> = ({
  columnId,
  cardType,
}) => {
  const dispatch = useDispatch();

  const activeTodoId = useSelector(getActiveTodoId);
  const activeTodo = useParamSelector(getTodoById, activeTodoId) as ITodo;
  const activeHeading = useParamSelector(getHeadingById, activeTodo.headingId) as IHeading;

  const refActiveTodoId = useValueRef(activeTodoId);

  const isOpen = !!activeTodoId && !!activeTodo && activeHeading.columnId === columnId;

  const handleSave = (newTitle: string, newDescription: string = '') => {
    dispatch(TodosActions.effect.update({
      id: refActiveTodoId.current!,
      title: newTitle,
      description: newDescription,
    }));
  };

  const handleChangeStatus = (newStatus: EnumTodoStatus) => {
    dispatch(TodosActions.effect.update({
      id: activeTodo!.id,
      status: newStatus,
    }));
  };

  const handleSelectDate = (selectedDate: Date | null) => {
    dispatch(SystemActions.setActivePopupId(null));
    dispatch(TodosActions.effect.update({
      id: activeTodo!.id,
      expirationDate: selectedDate,
    }));
  };

  const handleChangeColor = (newColor: IColor) => {
    dispatch(TodosActions.effect.update({
      id: activeTodoId!,
      color: newColor,
    }));
  };

  const handleSwitchNotifications = () => {
    dispatch(TodosActions.effect.update({
      id: activeTodoId!,
      isNotificationsEnabled: !activeTodo.isNotificationsEnabled,
    }));
  };

  useEffect(() => {
    if (activeTodo && activeHeading.columnId === columnId) {
      dispatch(CommentsActions.effect.fetchByTodoId({ todoId: activeTodoId! }));
      dispatch(CommentAttachmentsActions.effect.fetchByTodoId({ todoId: activeTodoId! }));
    }
  }, [activeTodoId]);

  return (
    <CardPopup
      isOpen={isOpen}
      color={activeTodo.color!}
      cardType={cardType}
    >
      <CardPopupHeader
        cardId={activeTodoId!}
        parentId={activeTodo.headingId}
        title={activeTodo.title}
        description={activeTodo.description}
        cardType={cardType}
        status={activeTodo.status!}
        color={activeTodo.color!}
        expirationDate={activeTodo.expirationDate!}
        isNotificationsEnabled={activeTodo.isNotificationsEnabled!}
        onChangeStatus={handleChangeStatus}
        onSelectDate={handleSelectDate}
        onChangeColor={handleChangeColor}
        onSwitchNotifications={handleSwitchNotifications}
        onSave={handleSave}
      />
    </CardPopup>
  );
};
