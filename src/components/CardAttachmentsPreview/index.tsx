import React, { FC, useState } from 'react';
import { MiniGallery } from '@comp/MiniGallery';
import { CardAttachments } from '@comp/CardAttachments';
import { ControlButton } from '@comp/ControlButton';
import { CommentAttachmentsActions } from '@store/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCommentFileAttachmentsByTodoId,
  getCommentImageAttachmentsByTodoId,
  getCommentsByTodoId,
} from '@store/selectors';
import { useTranslation } from 'react-i18next';

enum EnumToggleType {
  Files,
  Gallery,
  Comments,
}

interface ICardAttachmentsPreview {
  todoId: number;
  isActive?: boolean;
  commentsCount?: number;
  imagesCount?: number;
  attachmentsCount?: number;
}

export const CardAttachmentsPreview: FC<ICardAttachmentsPreview> = ({
  todoId,
  isActive,
  commentsCount,
  imagesCount,
  attachmentsCount,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const comments = useSelector(getCommentsByTodoId(todoId));
  const imageAttachments = useSelector(getCommentImageAttachmentsByTodoId(todoId));
  const fileAttachments = useSelector(getCommentFileAttachmentsByTodoId(todoId));

  const commentsCountWithCache = comments?.length || commentsCount;
  const imagesCountWithCache = imageAttachments?.length || imagesCount;
  const filesCountWithCache = fileAttachments?.length || attachmentsCount;

  const [isShowFiles, setIsShowFiles] = useState<boolean>(false);
  const [isShowGallery, setIsShowGallery] = useState<boolean>(false);

  const renderIcon = (
    count: number | undefined,
    name: string,
    tooltip: string,
    onClick: (e: React.SyntheticEvent) => void,
    isColored: boolean,
    text?: string,
  ) => count !== undefined && count > 0 && (
  <ControlButton
    imageSrc={`/assets/svg/${name}.svg`}
    tooltip={tooltip}
    alt={name}
    imageSize={16}
    size={20}
    isInvertColor={isActive}
    isTextable
    text={text}
    onClick={onClick}
    onDoubleClick={(e) => e.stopPropagation()}
    isColored={isColored}
    isStopPropagation={false}
    style={{
      borderRadius: 4,
    }}
  />
  );

  const handleToggle = (event: React.SyntheticEvent, type: EnumToggleType) => {
    switch (type) {
      case EnumToggleType.Files: {
        event.stopPropagation();
        setTimeout(() => setIsShowFiles((prev) => {
          if (!prev) {
            dispatch(CommentAttachmentsActions.fetchByTodoId({ todoId: todoId! }));
          }
          return !prev;
        }), 400);
        setIsShowGallery(false); break;
      }
      case EnumToggleType.Gallery: {
        event.stopPropagation();
        setTimeout(() => setIsShowGallery((prev) => {
          if (!prev) {
            dispatch(CommentAttachmentsActions.fetchByTodoId({ todoId: todoId! }));
          }
          return !prev;
        }), 300);
        setIsShowFiles(false); break;
      }
      default: break;
    }
  };

  return (
    <>
      <div className="card__toggle-container">
        {renderIcon(
          filesCountWithCache, 'files', t('Show Files'),
          (e) => handleToggle(e, EnumToggleType.Files), isShowFiles,
        )}
        {renderIcon(
          imagesCountWithCache, 'images', t('Show Gallery'),
          (e) => handleToggle(e, EnumToggleType.Gallery), isShowGallery,
        )}
        {renderIcon(
          commentsCountWithCache, 'bubble', `${commentsCountWithCache} comments`, // TODO: i18n
          (e) => handleToggle(e, EnumToggleType.Comments), false, String(commentsCountWithCache),
        )}
      </div>
      <MiniGallery
        todoId={todoId}
        isCollapse={!isShowGallery}
      />
      <CardAttachments
        todoId={todoId}
        isCollapse={!isShowFiles}
      />
    </>
  );
};
