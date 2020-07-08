import React, {
  FC, useEffect, useRef, useState,
} from 'react';
// import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch } from 'react-redux';
import { Menu } from '../Menu';
import { Avatar } from '../Avatar';
import { CommentsActions } from '../../store/actions';
import { EnumCommentType } from '../../types';
import { TextArea } from '../TextArea';

interface ICommentForm {
  todoId: string;
}

export const CommentForm: FC<ICommentForm> = ({
  todoId,
}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState<string>('sdvdsvsd');

  const sendCommentHandler = () => {
    if (!comment) return;
    console.log('comment save', comment);
    dispatch(CommentsActions.add(todoId, EnumCommentType.Text, comment));
    setComment('');
  };

  const keydownHandler = (event: any) => {
    const {
      key, ctrlKey, shiftKey, metaKey,
    } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey && !metaKey) {
      sendCommentHandler();
    }
  };

  return (
    <div className="comment-form">
      <Avatar />
      <div className="comment-form__input-wrapper">
        <TextArea
          className="card__textarea comment-form__textarea"
          placeholder="Add comment or note"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          onKeyUp={keydownHandler}
          min={27}
          max={300}
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
            onClick={sendCommentHandler}
          />
        </div>
      </div>
    </div>
  );
};
