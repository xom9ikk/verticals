import React, {
  FC,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveTodoId, getCommentsByTodoId } from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';
import { ICreateComment } from '@type/actions';
import { CommentsActions } from '@store/actions';
import { Comments } from '@comp/Comments';

export const TodoComments: FC = () => {
  const dispatch = useDispatch();

  const activeTodoId = useSelector(getActiveTodoId);
  const comments = useParamSelector(getCommentsByTodoId, activeTodoId);

  const handleCreate = (data: ICreateComment) => {
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
