import React, { FC, useState } from 'react';
import { MiniGallery } from '@comp/MiniGallery';
import { CardAttachments } from '@comp/CardAttachments';
import { ControlButton } from '@comp/ControlButton';
import { CommentAttachmentsActions } from '@store/actions';
import { useDispatch } from 'react-redux';
import {
  getCommentFileAttachmentsByTodoId,
  getCommentImageAttachmentsByTodoId,
  getCommentsByTodoId,
  getWidthByHeadingId,
} from '@store/selectors';
import { useTranslation } from 'react-i18next';
import { useParamSelector } from '@use/paramSelector';
import { DEFAULT_COLUMN_WIDTH } from '@/constants';

enum EnumToggleType {
  Files,
  Gallery,
  Comments,
}

interface ICardAttachmentsPreview {
  headingId: number;
  todoId: number;
  isActive?: boolean;
  commentsCount?: number;
  imagesCount?: number;
  attachmentsCount?: number;
}

export const CardAttachmentsPreview: FC<ICardAttachmentsPreview> = ({
  headingId,
  todoId,
  isActive,
  commentsCount,
  imagesCount,
  attachmentsCount,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const comments = useParamSelector(getCommentsByTodoId, todoId);
  const imageAttachments = useParamSelector(getCommentImageAttachmentsByTodoId, todoId);
  const fileAttachments = useParamSelector(getCommentFileAttachmentsByTodoId, todoId);
  const columnWidth = useParamSelector(getWidthByHeadingId, headingId);

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
            dispatch(CommentAttachmentsActions.effect.fetchByTodoId({ todoId: todoId! }));
          }
          return !prev;
        }), 400);
        setIsShowGallery(false); break;
      }
      case EnumToggleType.Gallery: {
        event.stopPropagation();
        setTimeout(() => setIsShowGallery((prev) => {
          if (!prev) {
            dispatch(CommentAttachmentsActions.effect.fetchByTodoId({ todoId: todoId! }));
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
          commentsCountWithCache, 'bubble', t('{{count}} comment', { count: commentsCountWithCache }),
          (e) => handleToggle(e, EnumToggleType.Comments), false, String(commentsCountWithCache),
        )}
      </div>
      <MiniGallery
        todoId={todoId}
        isCollapse={!isShowGallery}
        width={columnWidth === null ? DEFAULT_COLUMN_WIDTH : columnWidth}
      />
      <CardAttachments
        todoId={todoId}
        isCollapse={!isShowFiles}
      />
    </>
  );
};
