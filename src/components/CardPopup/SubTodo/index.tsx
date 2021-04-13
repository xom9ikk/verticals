import React, {
  FC, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CardPopup } from '@comp/CardPopup';
import { CardPopupHeader } from '@comp/CardPopup/Header';
import {
  CommentAttachmentsActions, CommentsActions, SubTodosActions, SystemActions,
} from '@store/actions';
import {
  getActiveSubTodoId,
  getHeadingByTodoId,
  getSubTodoById,
} from '@store/selectors';
import {
  EnumCardType, EnumTodoStatus, IColor, IHeading, ISubTodo,
} from '@type/entities';
import { useParamSelector } from '@use/paramSelector';
import { useValueRef } from '@use/valueRef';

interface ISubTodoCardPopup {
  columnId: number;
  cardType: EnumCardType;
}

export const SubTodoCardPopup: FC<ISubTodoCardPopup> = ({
  columnId,
  cardType,
}) => {
  const dispatch = useDispatch();

  const activeSubTodoId = useSelector(getActiveSubTodoId);
  const activeSubTodo = useParamSelector(getSubTodoById, activeSubTodoId) as ISubTodo;
  const activeHeading = useParamSelector(getHeadingByTodoId, activeSubTodo.todoId) as IHeading;

  const refActiveSubTodoId = useValueRef(activeSubTodoId);

  const isOpen = !!activeSubTodoId && !!activeSubTodo && activeHeading.columnId === columnId;

  const handleSave = (newTitle: string, newDescription: string = '') => {
    dispatch(SubTodosActions.effect.update({
      id: refActiveSubTodoId.current!,
      title: newTitle,
      description: newDescription,
    }));
  };

  const handleChangeStatus = (newStatus: EnumTodoStatus) => {
    dispatch(SubTodosActions.effect.update({
      id: activeSubTodo!.id,
      status: newStatus,
    }));
  };

  const handleSelectDate = (selectedDate: Date | null) => {
    dispatch(SystemActions.setActivePopupId(null));
    dispatch(SubTodosActions.effect.update({
      id: activeSubTodo!.id,
      expirationDate: selectedDate,
    }));
  };

  const handleChangeColor = (newColor: IColor) => {
    dispatch(SubTodosActions.effect.update({
      id: activeSubTodoId!,
      color: newColor,
    }));
  };

  const handleSwitchNotifications = () => {
    dispatch(SubTodosActions.effect.update({
      id: activeSubTodoId!,
      isNotificationsEnabled: !activeSubTodo.isNotificationsEnabled,
    }));
  };

  useEffect(() => {
    if (activeSubTodo && activeHeading.columnId === columnId) {
      dispatch(CommentsActions.effect.fetchBySubTodoId({ subTodoId: activeSubTodoId! }));
      dispatch(CommentAttachmentsActions.effect.fetchBySubTodoId({ subTodoId: activeSubTodoId! }));
    }
  }, [activeSubTodoId]);

  return (
    <CardPopup
      isOpen={isOpen}
      color={activeSubTodo.color!}
      cardType={cardType}
    >
      <CardPopupHeader
        cardId={activeSubTodoId!}
        parentId={activeSubTodo.todoId}
        title={activeSubTodo.title}
        description={activeSubTodo.description}
        cardType={cardType}
        status={activeSubTodo.status!}
        color={activeSubTodo.color!}
        expirationDate={activeSubTodo.expirationDate!}
        isNotificationsEnabled={activeSubTodo.isNotificationsEnabled!}
        onChangeStatus={handleChangeStatus}
        onSelectDate={handleSelectDate}
        onChangeColor={handleChangeColor}
        onSwitchNotifications={handleSwitchNotifications}
        onSave={handleSave}
      />
    </CardPopup>
  );
};
