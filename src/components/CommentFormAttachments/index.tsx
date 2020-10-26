import React, { FC, useMemo } from 'react';
import { Menu } from '@comp/Menu';

interface ICommentFormAttachments {
  files: FileList | null;
  onRemove: (index: number) => void;
}

export const CommentFormAttachments: FC<ICommentFormAttachments> = ({
  files,
  onRemove,
}) => useMemo(() => (
  <div className="comment-form-attachments__container">
    {
          files !== null && [...files].map((file, index) => (
            <div
              key={`${file.name}-${file.lastModified}`}
              className="comment-form-attachments__inner"
            >
              <div className="comment-form-attachments__wrapper">
                <img
                  className="comment-form-attachments__preview--empty"
                  src="/assets/svg/extension.svg"
                  alt="extension"
                />

                <div
                  className="comment-form-attachments__preview"
                  style={{ backgroundImage: `url("${URL.createObjectURL(file)}")` }}
                />
                <div className="comment-form-attachments__text">
                  {file.name}
                </div>
              </div>
              <Menu
                imageSrc="/assets/svg/close.svg"
                alt="remove"
                imageSize={10}
                size={16}
                isShowPopup={false}
                style={{ padding: 8, borderRadius: 4 }}
                onClick={() => onRemove(index)}
              />
            </div>
          ))
        }
  </div>
), [files]);
