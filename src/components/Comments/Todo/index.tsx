import React, {
  FC,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Comments } from '@comp/Comments';
import { ICreateCommentData } from '@comp/Comments/Wrapper';
import { CommentsActions } from '@store/actions';
import { getActiveTodoId, getCommentsByTodoId } from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';

export const TodoComments: FC = () => {
  const dispatch = useDispatch();

  const activeTodoId = useSelector(getActiveTodoId);
  const comments = useParamSelector(getCommentsByTodoId, activeTodoId);

  const handleCreate = (data: ICreateCommentData) => {
    dispatch(CommentsActions.effect.create({
      ...data,
      todoId: activeTodoId!,
    }));
  };

  return activeTodoId ? (
    <Comments
      cardId={activeTodoId!}
      comments={comments}
      onCreate={handleCreate}
    />
  ) : null;
};
