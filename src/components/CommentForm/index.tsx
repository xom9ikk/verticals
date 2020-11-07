import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@comp/Avatar';
import { CommentAttachmentsActions, CommentsActions, SystemActions } from '@/store/actions';
import { TextArea } from '@comp/TextArea';
import { useFocus } from '@/use/focus';
import { useFileList } from '@/use/fileList';
import {
  getCommentById, getDroppedFiles, getEditCommentId, getFullName, getReplyCommentId,
} from '@/store/selectors';
import { useOpenFiles } from '@/use/openFiles';
import { CommentFormAttachments } from '@comp/CommentFormAttachments';
import { EnumDroppedZoneType } from '@/types/entities';
import { ControlButton } from '@comp/ControlButton';

interface ICommentForm {
  todoId: number | null;
  onChangeTextAreaHeight: (height: number) => void;
}

export const CommentForm: FC<ICommentForm> = ({
  todoId,
  onChangeTextAreaHeight,
}) => {
  const dispatch = useDispatch();
  const { focus } = useFocus();
  const { openFiles } = useOpenFiles();
  const { merge, filter } = useFileList();
  const commentInputRef = useRef<any>();

  const fullName = useSelector(getFullName);
  const editCommentId = useSelector(getEditCommentId);
  const replyCommentId = useSelector(getReplyCommentId);
  const commentForReply = useSelector(getCommentById(replyCommentId));
  const commentForEdit = useSelector(getCommentById(editCommentId));
  const droppedFiles = useSelector(getDroppedFiles);

  const [commentText, setCommentText] = useState<string>('');
  const [shiftPressed, setShiftPressed] = useState<boolean>();
  const [files, setFiles] = useState<FileList | null>(new DataTransfer().files);

  useEffect(() => {
    setCommentText(commentForEdit?.text || '');
  }, [commentForEdit]);

  useEffect(() => {
    if (droppedFiles && droppedFiles.type === EnumDroppedZoneType.CardPopup) {
      const mergedFiles = merge(files, droppedFiles.files);
      setFiles(mergedFiles);
    }
  }, [droppedFiles]);

  useEffect(() => {
    if (commentForReply || commentForEdit) {
      focus(commentInputRef);
    }
  }, [commentForReply, commentForEdit]);

  const sendCommentHandler = () => {
    if (editCommentId) {
      console.log('1111');
      dispatch(CommentsActions.updateText({
        id: editCommentId,
        text: commentText,
      }));
      if (files) {
        dispatch(CommentAttachmentsActions.uploadFiles({
          commentId: editCommentId,
          files,
        }));
      }
      dispatch(SystemActions.setEditCommentId(null));
    } else {
      console.log('222', files);
      dispatch(CommentsActions.create({
        todoId: todoId!,
        text: commentText,
        replyCommentId: replyCommentId || undefined,
        files,
      }));
      dispatch(SystemActions.setReplyCommentId(null));
    }
    setFiles(null);
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

  const handleUploadImages = async () => {
    const openedFiles = await openFiles('image/x-png,image/jpeg', true);
    console.log('openedFiles', openedFiles);
    setFiles((prev) => merge(prev, openedFiles));
  };

  const handleUploadFiles = async () => {
    const openedFiles = await openFiles('*', true);
    console.log('openedFiles', openedFiles);
    setFiles((prev) => merge(prev, openedFiles));
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => filter(prev, (file, i) => i !== index));
  };

  const isAvailableSend = commentText?.length || files?.length;

  return (
    <div className="comment-form">
      <div className="comment-form__wrapper">
        <Avatar />
        <div className="comment-form__input-wrapper">
          <div
            className={`comment-form__reply 
            ${replyCommentId ? 'comment-form__reply--open' : ''}
            `}
          >
            <ControlButton
              imageSrc="/assets/svg/close.svg"
              alt="remove"
              imageSize={24}
              size={26}
              onClick={removeReplyHandler}
              style={{ marginRight: 2 }}
            />
            <div className="comment-form__reply--divider" />
            <div className="comment-form__reply--name">
              {fullName}
              <span className="comment-form__reply--text">
                {commentForReply?.text}
              </span>
            </div>
          </div>
          <CommentFormAttachments
            files={files}
            onRemove={handleRemoveFile}
          />
          <div className="comment-form__input-inner">
            <TextArea
              ref={commentInputRef}
              className="card__textarea comment-form__textarea"
              style={{ paddingLeft: 10 }}
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
              <ControlButton
                imageSrc="/assets/svg/gallery.svg"
                tooltip="Add an image"
                alt="image"
                imageSize={24}
                size={26}
                isColored
                onClick={handleUploadImages}
              />
              <ControlButton
                imageSrc="/assets/svg/attach.svg"
                tooltip="Attach a file"
                alt="file"
                imageSize={24}
                size={26}
                isColored
                onClick={handleUploadFiles}
              />
              <ControlButton
                imageSrc="/assets/svg/arrow-up.svg"
                tooltip={`${commentText?.length ? 'Add comment' : ''}`}
                alt="send"
                imageSize={isAvailableSend ? 24 : 0}
                size={30}
                isPrimary
                style={{
                  width: isAvailableSend ? 30 : 0,
                  opacity: isAvailableSend ? 1 : 0,
                  padding: isAvailableSend ? '8px 10px' : '8px 0',
                }}
                onClick={sendCommentHandler}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`comment-form__helper
        ${isAvailableSend ? 'comment-form__helper--open' : ''}
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
