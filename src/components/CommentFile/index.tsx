import React, { FC, useState } from 'react';
import { useFormat } from '@/use/format';
import { useDownload } from '@/use/download';
import { ControlButton } from '@comp/ControlButton';
// import { SystemActions } from '@/store/actions';
// import { useDispatch } from 'react-redux';

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
  const [isHover, setIsHover] = useState<boolean>(false);

  const styleImage = isImage ? {
    backgroundImage: `url('${path}')`,
  } : {};

  const handleDownload = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    console.log('download', path);
    download(path);
  };

  // const dispatch = useDispatch();

  const handleOpenGallery = () => {
    if (isImage) {
      // dispatch(SystemActions.setActiveGalleryId(id)); // calculate images for id by
      console.log(id);
    }
  };

  return (
    <div
      className={`comment-file 
      ${isImage ? 'comment-file--image' : ''}
      ${isCompact ? 'comment-file--compact' : ''}
      `}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
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
          isHoverBlock={isHover}
          onClick={() => onRemove(id)}
          style={{ position: 'absolute', right: 5, top: 5 }}
        />
        <div className={`comment-file__size
         ${isImage
          ? 'comment-file__size--image'
          : 'comment-file__size--file'}`}
        >
          {formatSize(size)}
        </div>
      </div>
      <div className="comment-file__inner">
        {
          !isImage && (
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
          )
        }
      </div>
    </div>
  );
};
