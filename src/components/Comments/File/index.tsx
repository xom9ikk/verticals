import cn from 'classnames';
import React, { FC } from 'react';

import { ControlButton } from '@comp/ControlButton';
import { useDownload } from '@use/download';
import { useFormat } from '@use/format';

interface ICommentFile {
  id: number;
  size: number;
  name: string;
  path: string;
  extension: string;
  onRemove: (id: number) => void;
  isCompact: boolean;
  isImage: boolean;
}

export const CommentFile: FC<ICommentFile> = ({
  id,
  size,
  name,
  path,
  extension,
  onRemove,
  isCompact,
  isImage,
}) => {
  const { formatSize } = useFormat();
  const { download } = useDownload();

  const styleImage = isImage ? {
    backgroundImage: `url('${path}')`,
  } : {};

  const handleDownload = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    console.log('download', path);
    download(path);
  };

  const handleOpenGallery = () => {
    if (isImage) {
      console.log(id);
    }
  };

  const handleClick = () => onRemove(id);

  return (
    <div
      className={cn('comment-file', {
        'comment-file--image': isImage,
        'comment-file--compact': isCompact,
      })}
      onClick={handleOpenGallery}
    >
      <div
        className="comment-file__image"
        style={styleImage}
      />
      <div
        className="comment-file__overlay"
      >
        <ControlButton
          imageSrc="/assets/svg/download.svg"
          alt="download"
          imageSize={isCompact || !isImage ? 20 : 40}
          size={isCompact || !isImage ? 30 : 60}
          isPrimary
          onClick={handleDownload}
          style={{ zIndex: 2, borderRadius: '50%', opacity: '0.6' }}
        />
        <ControlButton
          imageSrc="/assets/svg/menu/remove.svg"
          alt="delete"
          imageSize={22}
          size={24}
          isInvisible
          onClick={handleClick}
          style={{ position: 'absolute', right: 5, top: 5 }}
        />
        <div className={cn('comment-file__size', {
          'comment-file__size--image': isImage,
          'comment-file__size--file': !isImage,
        })}
        >
          {formatSize(size)}
        </div>
      </div>
      <div className="comment-file__inner">
        {!isImage && (
          <div className="comment-file__info">
            <div className="comment-file__extension">
              <img src="/assets/svg/extension.svg" alt="extension" />
              <span>
                {extension.substring(0, 4)}
              </span>
            </div>
            <div className="comment-file__info--text">
              {name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
