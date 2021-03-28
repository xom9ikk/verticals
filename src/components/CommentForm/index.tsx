import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@comp/Avatar';
import { CommentAttachmentsActions, CommentsActions, SystemActions } from '@store/actions';
import { TextArea } from '@comp/TextArea';
import { useFocus } from '@use/focus';
import { useFileList } from '@use/fileList';
import {
  getCommentById, getDroppedFiles, getEditCommentId, getFullName, getReplyCommentId,
} from '@store/selectors';
import { useOpenFiles } from '@use/openFiles';
import { CommentFormAttachments } from '@comp/CommentFormAttachments';
import { EnumDroppedZoneType } from '@type/entities';
import { ControlButton } from '@comp/ControlButton';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import { useParamSelector } from '@use/paramSelector';
import { ICreateComment } from '@type/actions';

interface ICommentForm {
  onChangeTextAreaHeight: (height: number) => void;
  isScrolledToBottom: boolean;
  onScrollToBottom: () => void;
  onCreate: (data: ICreateComment) => void;
}

export const CommentForm: FC<ICommentForm> = ({
  onChangeTextAreaHeight,
  isScrolledToBottom,
  onScrollToBottom,
  onCreate,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { focus } = useFocus();
  const { openFiles } = useOpenFiles();
  const { merge, filter } = useFileList();
  const commentInputRef = useRef<any>();

  const fullName = useSelector(getFullName);
  const editCommentId = useSelector(getEditCommentId);
  const replyCommentId = useSelector(getReplyCommentId);
  const commentForReply = useParamSelector(getCommentById, replyCommentId);
  const commentForEdit = useParamSelector(getCommentById, editCommentId);
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

  const handleSendComment = () => {
    if (editCommentId) {
      dispatch(CommentsActions.effect.updateText({
        id: editCommentId,
        text: commentText,
      }));
      if (files) {
        dispatch(CommentAttachmentsActions.effect.uploadFiles({
          commentId: editCommentId,
          files,
        }));
      }
      dispatch(SystemActions.setEditCommentId(null));
    } else if (files?.length || commentText) {
      onCreate({
        text: commentText,
        replyCommentId: replyCommentId || undefined,
        files,
      });
      dispatch(SystemActions.setReplyCommentId(null));
    }
    setFiles(null);
    setCommentText('');
  };

  const handleChange = (event: React.BaseSyntheticEvent) => {
    if (!shiftPressed) {
      setCommentText(event.target.value);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    const { key, shiftKey } = event;
    if (key === 'Enter' && shiftKey) {
      setShiftPressed(false);
      handleSendComment();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key, shiftKey } = event;
    if (key === 'Enter' && shiftKey) {
      setShiftPressed(true);
    }
  };

  const handleRemoveReply = () => {
    dispatch(SystemActions.setReplyCommentId(null));
  };

  const handleUploadImages = async () => {
    const openedFiles = await openFiles('image/x-png,image/jpeg', true);
    setFiles((prev) => merge(prev, openedFiles));
  };

  const handleUploadFiles = async () => {
    const openedFiles = await openFiles('*', true);
    setFiles((prev) => merge(prev, openedFiles));
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => filter(prev, (file, i) => i !== index));
  };

  const handleOpenFormattingHelp = () => {
    dispatch(SystemActions.setIsOpenFormattingHelp(true));
  };

  const isAvailableSend = commentText?.length || files?.length;

  const handleOutsideClick = () => {
    dispatch(SystemActions.setEditCommentId(null));
  };

  const [commentFormRef] = useOutsideClickRef(handleOutsideClick);

  return (
    <div className="comment-form" ref={commentFormRef}>
      <div className="comment-form__wrapper">
        <Avatar />
        <div className="comment-form__input-wrapper">
          <div
            className={cn('comment-form__reply', {
              'comment-form__reply--open': replyCommentId,
            })}
          >
            <ControlButton
              imageSrc="/assets/svg/close.svg"
              alt="remove"
              imageSize={12}
              size={26}
              onClick={handleRemoveReply}
              style={{ marginRight: 6 }}
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
              placeholder={t('Add comment or note')}
              value={commentText}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              onKeyDown={handleKeyDown}
              minRows={1}
              maxRows={10}
              onChangeHeight={onChangeTextAreaHeight}
            />
            <div className="comment-form__controls">
              <ControlButton
                imageSrc="/assets/svg/gallery.svg"
                tooltip={t('Add an image')}
                alt="image"
                imageSize={24}
                size={26}
                isColored
                onClick={handleUploadImages}
              />
              <ControlButton
                imageSrc="/assets/svg/attach.svg"
                tooltip={t('Attach a file')}
                alt="file"
                imageSize={24}
                size={26}
                isColored
                onClick={handleUploadFiles}
              />
              <ControlButton
                imageSrc="/assets/svg/arrow-up.svg"
                tooltip={`${commentText?.length ? t('Add comment') : ''}`}
                alt="send"
                imageSize={isAvailableSend ? 24 : 0}
                size={30}
                isPrimary
                style={{
                  width: isAvailableSend ? 30 : 0,
                  opacity: isAvailableSend ? 1 : 0,
                  padding: isAvailableSend ? '8px 10px' : '8px 0',
                }}
                onClick={handleSendComment}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={cn('comment-form__helper', {
        'comment-form__helper--open': isAvailableSend,
      })}
      >
        <button onClick={handleOpenFormattingHelp}>
          {t('Formatting help')}
        </button>
        <span>
          {t('Shift+Enter to send')}
        </span>
      </div>

      <ControlButton
        imageSrc="/assets/svg/arrow-down.svg"
        alt="arrow-down"
        imageSize={24}
        size={26}
        isHide={isScrolledToBottom}
        style={{
          position: 'absolute',
          right: 0,
          top: -48,
          zIndex: 2,
          background: '#fff',
          boxShadow: '3px 3px 8px #eaeaea, 0px 0px 0px #f1f1f1',
        }}
        onClick={onScrollToBottom}
      />
    </div>
  );
};
