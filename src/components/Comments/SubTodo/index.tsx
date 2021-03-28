import React, {
  FC,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveSubTodoId, getCommentsBySubTodoId } from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';
import { ICreateComment } from '@type/actions';
import { CommentsActions } from '@store/actions';
import { Comments } from '@comp/Comments';

export const SubTodoComments: FC = () => {
  const dispatch = useDispatch();

  const activeSubTodoId = useSelector(getActiveSubTodoId);
  const comments = useParamSelector(getCommentsBySubTodoId, activeSubTodoId);

  const handleCreate = (data: ICreateComment) => {
    dispatch(CommentsActions.effect.create({
      ...data,
      subTodoId: activeSubTodoId!,
    }));
  };

  return activeSubTodoId ? (
    <Comments
      cardId={activeSubTodoId!}
      comments={comments}
      onCreate={handleCreate}
    />
  ) : null;
};
