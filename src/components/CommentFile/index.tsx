import React, { FC, useState } from 'react';
// @ts-ignore
import downloadjs from 'downloadjs';
import { Menu } from '../Menu';
import { IFile } from '../../types';

interface ICommentFile {
  file: IFile;
  onRemove: (id: string)=>void;
  isCompact: boolean;
}

export const CommentFile: FC<ICommentFile> = ({
  file,
  onRemove,
  isCompact,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const isImage = ['png', 'jpg', 'jpeg'].includes(file.type);

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
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
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
          imageSrc="/svg/download.svg"
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
            <img src="/svg/extension.svg" alt="extension" />
            <span>
              {file.type.substring(0, 3)}
            </span>
            <div className="comment-file__info--text">
              {file.name}
            </div>
          </div>
          )
        }
        <Menu
          imageSrc="/svg/menu/delete.svg"
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
