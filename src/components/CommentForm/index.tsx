import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@comp/Menu';
import { Avatar } from '@comp/Avatar';
import { CommentsActions, SystemActions } from '@/store/actions';
import { TextArea } from '@comp/TextArea';
import { IComment } from '@/types/entities';
import { useFocus } from '@/use/focus';
import { getComments, getEditCommentId, getReplyCommentId } from '@/store/selectors';
import { useOpenFiles } from '@/use/openFiles';

interface ICommentForm {
  todoId: number;
  onChangeTextAreaHeight: (height: number) => void;
}

export const CommentForm: FC<ICommentForm> = ({
  todoId,
  onChangeTextAreaHeight,
}) => {
  const dispatch = useDispatch();
  const { focus } = useFocus();
  const { openFiles } = useOpenFiles('image/x-png,image/jpeg', true);
  const commentInputRef = useRef<any>();

  const editCommentId = useSelector(getEditCommentId);
  const replyCommentId = useSelector(getReplyCommentId);
  const comments = useSelector(getComments);

  const [commentText, setCommentText] = useState<string>();
  const [replyComment, setReplyComment] = useState<IComment>();
  const [shiftPressed, setShiftPressed] = useState<boolean>();

  const getComment = (id: number) => comments.find((comment: IComment) => comment.id === id);

  useEffect(() => {
    if (editCommentId) {
      const comment = getComment(editCommentId);
      setCommentText(comment?.text);
      focus(commentInputRef);
    }
  }, [editCommentId]);

  useEffect(() => {
    if (replyCommentId) {
      const comment = getComment(replyCommentId);
      setReplyComment(comment);
      focus(commentInputRef);
    }
  }, [replyCommentId]);

  const sendCommentHandler = () => {
    if (!commentText) return;
    if (editCommentId) {
      dispatch(CommentsActions.updateText({
        id: editCommentId,
        text: commentText,
      }));
      dispatch(SystemActions.setEditCommentId(null));
    } else {
      dispatch(CommentsActions.create({
        todoId,
        text: commentText,
        replyCommentId: replyCommentId || undefined,
      }));
      dispatch(SystemActions.setReplyCommentId(null));
    }
    setCommentText('');
  };

  const changeHandler = (event: React.BaseSyntheticEvent) => {
    if (!shiftPressed) {
      setCommentText(event.target.value);
    }
  };

  const keyUpHandler = (event: React.KeyboardEvent) => {
    const {
      key, shiftKey,
    } = event;
    if (key === 'Enter' && shiftKey) {
      setShiftPressed(false);
      sendCommentHandler();
    }
  };

  const keyDownHandler = (event: React.KeyboardEvent) => {
    const { key, shiftKey } = event;
    if (key === 'Enter' && shiftKey) {
      setShiftPressed(true);
    }
  };

  const removeReplyHandler = () => {
    dispatch(SystemActions.setReplyCommentId(null));
  };

  const handleUploadImage = async () => {
    const files = await openFiles();
    console.log('files', files);
  };

  return (
    <div className="comment-form">
      <div className="comment-form__wrapper">
        <Avatar />
        <div className="comment-form__input-wrapper">
          <div
            className={`comment-form__reply 
            ${replyCommentId ? 'comment-form__reply--opened' : ''}
            `}
          >
            <Menu
              imageSrc="/assets/svg/close.svg"
              alt="remove"
              imageSize={24}
              size={26}
              isShowPopup={false}
              onClick={removeReplyHandler}
              style={{ marginRight: 10 }}
            />
            <div className="comment-form__reply--divider" />
            <div className="comment-form__reply--name">
              Max Romanyuta
              <span className="comment-form__reply--text">
                {replyComment?.text}
              </span>
            </div>
          </div>
          <div className="comment-form__input-inner">
            <TextArea
              ref={commentInputRef}
              className="card__textarea comment-form__textarea"
              placeholder="Add comment or note"
              value={commentText}
              onChange={changeHandler}
              onKeyUp={keyUpHandler}
              onKeyDown={keyDownHandler}
              minRows={1}
              maxRows={10}
              onChangeHeight={onChangeTextAreaHeight}
            />
            <div className="comment-form__controls">
              <Menu
                imageSrc="/assets/svg/gallery.svg"
                tooltip="Add an image"
                alt="image"
                imageSize={24}
                size={26}
                isShowPopup={false}
                isColored
                onClick={handleUploadImage}
              />
              <Menu
                imageSrc="/assets/svg/attach.svg"
                tooltip="Attach a file"
                alt="file"
                imageSize={24}
                size={26}
                isShowPopup={false}
                isColored
                onClick={() => {
                }}
              />
              <Menu
                imageSrc="/assets/svg/arrow-up.svg"
                tooltip={`${commentText?.length ? 'Add comment' : ''}`}
                alt="send"
                imageSize={commentText?.length ? 24 : 0}
                size={30}
                isShowPopup={false}
                isPrimary
                style={{
                  width: commentText?.length ? 30 : 0,
                  opacity: commentText?.length ? 1 : 0,
                  padding: commentText?.length ? '8px 10px' : '8px 0',
                }}
                onClick={sendCommentHandler}
              />
            </div>
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
