import React, { FC, useMemo, useState } from 'react';
import { IComment } from '../../types';
import { MenuButton } from '../MenuButton';
import { Menu } from '../Menu';
import { Divider } from '../Divider';
import { CommentFile } from '../CommentFile';
import { useFormatDate } from '../../use/formatDate';

interface ICommentItem {
  comment: IComment
}

enum EnumMenuActions {
  Like,
  Reply,
  Edit,
  Delete,
}

export const CommentItem: FC<ICommentItem> = ({
  comment,
}) => {
  const { text, attachedFiles, date } = comment;
  const { formatDate } = useFormatDate();

  const removeHandler = (id: string) => {
    console.log('remove attached fileId', id);
  };

  const memoComment = useMemo(() => (
    <div
      className="comment__content"
    >
      <div className="comment__header">
        {
          text && (<span className="comment__text">{text}</span>)
        }
        <span className="comment__date">{formatDate(new Date(date))}</span>
      </div>
      <div className="comment__attachments">
        {
          attachedFiles && attachedFiles?.length > 0 && (
          <>
            {
              attachedFiles.map((file, index) => {
                let isCompact = attachedFiles.length > 1;
                if (index === attachedFiles.length - 1) {
                  isCompact = index % 2 !== 0;
                }
                return (
                  <CommentFile
                    file={file}
                    onRemove={removeHandler}
                    isCompact={isCompact}
                  />
                );
              })
            }
          </>
          )
        }
      </div>
    </div>
  ), [comment]);

  return (
    <div
      className="comment"
    >
      { memoComment }
      <div className="comment__controls">
        <div className="comment__controls--buttons">
          <Menu
            imageSrc="/svg/like.svg"
            alt="like"
            imageSize={16}
            size={22}
            isShowPopup={false}
          />
          <Menu
            imageSrc="/svg/reply.svg"
            alt="reply"
            imageSize={16}
            size={22}
            isShowPopup={false}
          />
        </div>
        <Menu
          imageSrc="/svg/dots.svg"
          alt="menu"
          imageSize={16}
          size={22}
          position="right"
          isAbsolute={false}
        >
          <MenuButton
            text="Like"
            imageSrc="/svg/like.svg"
          />
          <MenuButton
            text="Reply"
            imageSrc="/svg/reply.svg"
          />
          <MenuButton
            text="Edit"
            imageSrc="/svg/menu/edit.svg"
          />
          <Divider verticalSpacer={7} horizontalSpacer={10} />
          <MenuButton
            text="Delete"
            imageSrc="/svg/menu/delete.svg"
          />
        </Menu>
      </div>
    </div>
  );
};
