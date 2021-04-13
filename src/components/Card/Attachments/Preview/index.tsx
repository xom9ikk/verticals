import React, { FC, SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_COLUMN_WIDTH } from '@/constants';
import { CardAttachments } from '@comp/Card/Attachments';
import { ControlButton } from '@comp/ControlButton';
import { MiniGallery } from '@comp/MiniGallery';
import { ICommentAttachments, IComments } from '@type/entities';

enum EnumToggleType {
  Files,
  Gallery,
  Comments,
}

interface ICardAttachmentsPreview {
  comments: IComments;
  images: ICommentAttachments;
  files: ICommentAttachments;
  columnWidth: number | null;
  attachmentFetcher: () => void;
  isActive?: boolean;
  commentsCount?: number;
  imagesCount?: number;
  attachmentsCount?: number;
}

export const CardAttachmentsPreview: FC<ICardAttachmentsPreview> = ({
  comments,
  images,
  files,
  columnWidth,
  attachmentFetcher,
  isActive,
  commentsCount,
  imagesCount,
  attachmentsCount,
}) => {
  const { t } = useTranslation();

  const commentsCountWithCache = comments?.length || commentsCount;
  const imagesCountWithCache = images?.length || imagesCount;
  const filesCountWithCache = files?.length || attachmentsCount;

  const [isShowFiles, setIsShowFiles] = useState<boolean>(false);
  const [isShowGallery, setIsShowGallery] = useState<boolean>(false);

  const handleDoubleClick = (event: SyntheticEvent) => event.stopPropagation();

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
    onDoubleClick={handleDoubleClick}
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
            attachmentFetcher();
          }
          return !prev;
        }), 400);
        setIsShowGallery(false); break;
      }
      case EnumToggleType.Gallery: {
        event.stopPropagation();
        setTimeout(() => setIsShowGallery((prev) => {
          if (!prev) {
            attachmentFetcher();
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
          filesCountWithCache, 'files', isShowFiles ? t('Hide Files') : t('Show Files'),
          (e) => handleToggle(e, EnumToggleType.Files), isShowFiles,
        )}
        {renderIcon(
          imagesCountWithCache, 'images', isShowGallery ? t('Hide Gallery') : t('Show Gallery'),
          (e) => handleToggle(e, EnumToggleType.Gallery), isShowGallery,
        )}
        {renderIcon(
          commentsCountWithCache, 'bubble', t('{{count}} comment', { count: commentsCountWithCache }),
          (e) => handleToggle(e, EnumToggleType.Comments), false, String(commentsCountWithCache),
        )}
      </div>
      <MiniGallery
        images={images}
        isCollapse={!isShowGallery}
        width={columnWidth === null ? DEFAULT_COLUMN_WIDTH : columnWidth}
      />
      <CardAttachments
        files={files}
        isCollapse={!isShowFiles}
      />
    </>
  );
};
