import React, { FC, useMemo } from 'react';
import { ControlButton } from '@comp/ControlButton';

interface ICommentFormAttachments {
  files: FileList | null;
  isListView?: boolean;
  onRemove: (index: number) => void;
}

export const CommentFormAttachments: FC<ICommentFormAttachments> = ({
  files,
  isListView,
  onRemove,
}) => useMemo(() => (files && files.length > 0 ? (
  <div className={
    `comment-form-attachments
    ${isListView ? 'comment-form-attachments--list-view' : ''}`
  }
  >
    {
        [...files].map((file, index) => (
          <div
            key={`${file.name}-${file.lastModified}`}
            className="comment-form-attachments__item"
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
            <ControlButton
              imageSrc="/assets/svg/close.svg"
              alt="remove"
              imageSize={10}
              size={16}
              style={{ padding: 8, borderRadius: 4 }}
              onClick={() => onRemove(index)}
            />
          </div>
        ))
      }
  </div>
) : null), [files]);
