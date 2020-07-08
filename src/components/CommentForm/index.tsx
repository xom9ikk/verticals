import React, { FC, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Menu } from '../Menu';
import { Avatar } from '../Avatar';

interface ICommentForm {
}

export const CommentForm: FC<ICommentForm> = ({
}) => {
  const [comment, setComment] = useState<string>();

  const commentChangeHandler = (event: any) => {
    setComment(event.target.value);
  };

  return (
    <div className="comment-form">
      <Avatar />
      <div className="comment-form__input-wrapper">
        <TextareaAutosize
          className="card__textarea comment-form__textarea"
          value={comment}
          placeholder="Add comment ot note"
          minRows={1}
          maxRows={25}
          onChange={commentChangeHandler}
        />

        <div className="comment-form__controls">
          <Menu
            imageSrc="/svg/gallery.svg"
            alt="image"
            imageSize={24}
            size={26}
            isShowPopup={false}
            onClick={() => {
            }}
          />
          <Menu
            imageSrc="/svg/attach.svg"
            alt="file"
            imageSize={24}
            size={26}
            isShowPopup={false}
            onClick={() => {
            }}
          />
          <Menu
            imageSrc="/svg/arrow-up.svg"
            alt="date"
            imageSize={24}
            size={30}
            isShowPopup={false}
            isPrimary
            style={{
              width: comment?.length ? 30 : 0,
              padding: comment?.length ? '8px 10px' : '8px 0',
            }}
            onClick={() => {
            }}
          />
        </div>
      </div>
    </div>
  );
};
