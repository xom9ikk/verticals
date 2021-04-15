import cn from 'classnames';
import React, { FC, useMemo } from 'react';

import { ControlButton } from '@comp/ControlButton';

interface ICommentFormAttachments {
  files: FormData;
  isListView?: boolean;
  onRemove: (index: number) => void;
}

export const CommentFormAttachments: FC<ICommentFormAttachments> = ({
  files,
  isListView,
  onRemove,
}) => {
  console.log('1');
  const isNotEmpty = !files.entries().next().done;

  return useMemo(() => (isNotEmpty ? (
    <div
      className={cn('comment-form-attachments', {
        'comment-form-attachments--list-view': isListView,
      })}
    >
      {[...files.entries()].map(([key, value], index) => (
        <div
          key={`${key}-${index}`}
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
              style={{ backgroundImage: `url("${URL.createObjectURL(value)}")` }}
            />
            <div className="comment-form-attachments__text">
              {key}
            </div>
          </div>
          <ControlButton
            imageSrc="/assets/svg/close.svg"
            alt="remove"
            imageSize={10}
            size={16}
            style={{ padding: 8, borderRadius: 4 }}
            onClick={() => {
              onRemove(index);
            }}
          />
        </div>
      ))}
    </div>
  ) : null), [isListView, files]);
};
