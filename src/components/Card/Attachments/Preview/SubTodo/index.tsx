import React, { FC } from 'react';
import { CommentAttachmentsActions } from '@store/actions';
import { useDispatch } from 'react-redux';
import {
  getCommentFileAttachmentsBySubTodoId,
  getCommentImageAttachmentsBySubTodoId,
  getCommentsBySubTodoId,
  getWidthByTodoId,
} from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';
import { CardAttachmentsPreview } from '@comp/Card/Attachments/Preview';

interface ISubTodoAttachmentsPreview {
  todoId: number;
  subTodoId: number;
  isActive?: boolean;
  commentsCount?: number;
  imagesCount?: number;
  attachmentsCount?: number;
}

const SUB_TODO_CARD_OFFSET = 26;

export const SubTodoAttachmentsPreview: FC<ISubTodoAttachmentsPreview> = ({
  todoId,
  subTodoId,
  ...props
}) => {
  const dispatch = useDispatch();

  const comments = useParamSelector(getCommentsBySubTodoId, subTodoId);
  const imageAttachments = useParamSelector(getCommentImageAttachmentsBySubTodoId, subTodoId);
  const fileAttachments = useParamSelector(getCommentFileAttachmentsBySubTodoId, subTodoId);
  const columnWidth = useParamSelector(getWidthByTodoId, todoId);

  const handleFetch = () => {
    dispatch(CommentAttachmentsActions.effect.fetchBySubTodoId({ subTodoId }));
  };

  const width = columnWidth ? columnWidth - SUB_TODO_CARD_OFFSET : null;

  return (
    <CardAttachmentsPreview
      {...props}
      comments={comments}
      images={imageAttachments}
      files={fileAttachments}
      attachmentFetcher={handleFetch}
      columnWidth={width}
    />
  );
};
