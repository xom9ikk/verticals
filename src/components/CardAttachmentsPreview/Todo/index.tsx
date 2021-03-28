import React, { FC } from 'react';
import { CommentAttachmentsActions } from '@store/actions';
import { useDispatch } from 'react-redux';
import {
  getCommentFileAttachmentsByTodoId,
  getCommentImageAttachmentsByTodoId,
  getCommentsByTodoId,
  getWidthByHeadingId,
} from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';
import { CardAttachmentsPreview } from '@comp/CardAttachmentsPreview';

interface ITodoAttachmentsPreview {
  headingId: number;
  todoId: number;
  isActive?: boolean;
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