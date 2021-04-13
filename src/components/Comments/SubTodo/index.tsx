import React, {
  FC,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Comments } from '@comp/Comments';
import { ICreateCommentData } from '@comp/Comments/Wrapper';
import { CommentsActions } from '@store/actions';
import { getActiveSubTodoId, getCommentsBySubTodoId } from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';

export const SubTodoComments: FC = () => {
  const dispatch = useDispatch();

  const activeSubTodoId = useSelector(getActiveSubTodoId);
  const comments = useParamSelector(getCommentsBySubTodoId, activeSubTodoId);

  const handleCreate = (data: ICreateCommentData) => {
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
