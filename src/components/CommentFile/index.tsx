import React, { FC, useState } from 'react';
// @ts-ignore
import downloadjs from 'downloadjs';
import { Menu } from '@comp/Menu';
import { IFile } from '@/types/entities';

interface ICommentFile {
  file: IFile;
  onRemove: (id: string)=>void;
  isCompact: boolean;
  isImage: boolean;
}

export const CommentFile: FC<ICommentFile> = ({
  file,
  onRemove,
  isCompact,
  isImage,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const styleImage = isImage ? {
    backgroundImage: `url('${file.link}')`,
  } : {};

  const downloadHandler = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    console.log('download', file.link);
    downloadjs(file.link);
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
              {file.type.substring(0, 3)}
            </span>
            <div className="comment-file__info--text">
              {file.name}
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
          onClick={() => onRemove(file.id)}
        />
        <div className={`comment-file__size
         ${isImage
          ? 'comment-file__size--image'
          : 'comment-file__size--file'}`}
        >
          {file.size}
        </div>
      </div>

    </div>
  );
};
