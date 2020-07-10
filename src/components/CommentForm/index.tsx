import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '../Menu';
import { Avatar } from '../Avatar';
import { CommentsActions, SystemActions } from '../../store/actions';
import { TextArea } from '../TextArea';
import { IRootState } from '../../store/reducers/state';
import { IComment } from '../../types';
import { useFocus } from '../../use/focus';

interface ICommentForm {
  todoId: string;
  onChangeTextAreaHeight: (height: number)=>void;
}

export const CommentForm: FC<ICommentForm> = ({
  todoId,
  onChangeTextAreaHeight,
}) => {
  const dispatch = useDispatch();
  const { focus } = useFocus();
  const { system: { currentCommentId }, comments } = useSelector((state: IRootState) => state);
  const [commentText, setCommentText] = useState<string>();
  const [shiftPressed, setShiftPressed] = useState<boolean>();
  const commentInputRef = useRef<any>();

  useEffect(() => {
    const targetComment = comments.find((comment: IComment) => comment.id === currentCommentId);
    setCommentText(targetComment?.text ?? '');
    focus(commentInputRef);
  }, [currentCommentId]);

  const sendCommentHandler = () => {
    if (!commentText) return;
    console.log('comment save', commentText);
    if (currentCommentId) {
      dispatch(CommentsActions.updateText(currentCommentId, commentText));
      dispatch(SystemActions.setCurrentCommentId(''));
    } else {
      dispatch(CommentsActions.add(todoId, commentText, undefined, undefined));
    }
    setCommentText('');
  };

  const changeHandler = (event: any) => {
    if (!shiftPressed) {
      setCommentText(event.target.value);
    }
  };

  const keyupHandler = (event: any) => {
    const {
      key, shiftKey,
    } = event;
    setShiftPressed(shiftKey);
    if (key === 'Enter' && shiftKey) {
      sendCommentHandler();
    }
  };

  const keydownHandler = (event: any) => {
    const { shiftKey } = event;
    setShiftPressed(shiftKey);
  };

  return (
    <div className="comment-form">
      <div className="comment-form__wrapper">
        <Avatar />
        <div className="comment-form__input-wrapper">
          <TextArea
            ref={commentInputRef}
            className="card__textarea comment-form__textarea"
            placeholder="Add comment or note"
            value={commentText}
            onChange={changeHandler}
            onKeyUp={keyupHandler}
            onKeyDown={keydownHandler}
            minRows={1}
            maxRows={10}
            onChangeHeight={onChangeTextAreaHeight}
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
                width: commentText?.length ? 30 : 0,
                padding: commentText?.length ? '8px 10px' : '8px 0',
              }}
              onClick={sendCommentHandler}
            />
          </div>
        </div>
      </div>
      <div className={`comment-form__helper 
        ${commentText?.length ? 'comment-form__helper--opened' : ''}
        `}
      >
        <button>
          Formatting help
        </button>
        <span>
          Shift+Enter to send
        </span>
      </div>
    </div>
  );
};
