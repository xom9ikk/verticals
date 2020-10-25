import React, { FC, useState } from 'react';
// @ts-ignore
import downloadjs from 'downloadjs';
import { Menu } from '@comp/Menu';
import { useFormat } from '@/use/format';

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
  const [isHover, setIsHover] = useState<boolean>(false);

  const styleImage = isImage ? {
    backgroundImage: `url('${path}')`,
  } : {};

  const downloadHandler = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    console.log('download', path);
    downloadjs(path);
  };

  return (
    <div
      className={`comment-file 
      ${isImage ? 'comment-file--image' : ''}
      ${isCompact ? 'comment-file--compact' : ''}
      `}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={downloadHandler}
    >
      <div
        className="comment-file__image"
        style={styleImage}
      />
      <div
        className="comment-file__overlay"
      >
        <Menu
          imageSrc="/assets/svg/download.svg"
          alt="download"
          imageSize={isImage ? 40 : 20}
          size={isImage ? 60 : 30}
          isShowPopup={false}
          isPrimary
          onClick={downloadHandler}
          style={{ zIndex: 2, borderRadius: '50%', opacity: '0.6' }}
        />
      </div>
      <div className="comment-file__inner">
        {
          !isImage && (
          <div className="comment-file__info">
            <img src="/assets/svg/extension.svg" alt="extension" />
            <span>
              {extension.substring(0, 3)}
            </span>
            <div className="comment-file__info--text">
              {name}
            </div>
          </div>
          )
        }
      </div>

      <div className="comment-file__overlay-info">
        <Menu
          imageSrc="/assets/svg/menu/remove.svg"
          alt="delete"
          imageSize={22}
          size={24}
          isHide
          isShowPopup={false}
          isHoverBlock={isHover}
          onClick={() => onRemove(id)}
        />
        <div className={`comment-file__size
         ${isImage
          ? 'comment-file__size--image'
          : 'comment-file__size--file'}`}
        >
          {formatSize(size)}
        </div>
      </div>

    </div>
  );
};
