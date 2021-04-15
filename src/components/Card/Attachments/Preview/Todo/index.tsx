import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { CardAttachmentsPreview } from '@comp/Card/Attachments/Preview';
import { CommentAttachmentsActions } from '@store/actions';
import {
  getCommentFileAttachmentsByTodoId,
  getCommentImageAttachmentsByTodoId,
  getCommentsByTodoId,
  getWidthByHeadingId,
} from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';

interface ITodoAttachmentsPreview {
  headingId: number;
  todoId: number;
  commentsCount?: number;
  imagesCount?: number;
  attachmentsCount?: number;
}

export const TodoAttachmentsPreview: FC<ITodoAttachmentsPreview> = ({
  headingId,
  todoId,
  ...props
}) => {
  const dispatch = useDispatch();

  const comments = useParamSelector(getCommentsByTodoId, todoId);
  const imageAttachments = useParamSelector(getCommentImageAttachmentsByTodoId, todoId);
  const fileAttachments = useParamSelector(getCommentFileAttachmentsByTodoId, todoId);
  const columnWidth = useParamSelector(getWidthByHeadingId, headingId);

  const handleFetch = () => {
    dispatch(CommentAttachmentsActions.effect.fetchByTodoId({ todoId }));
  };

  return (
    <CardAttachmentsPreview
      {...props}
      comments={comments}
      images={imageAttachments}
      files={fileAttachments}
      attachmentFetcher={handleFetch}
      columnWidth={columnWidth}
    />
  );
};
