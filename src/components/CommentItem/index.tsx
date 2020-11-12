import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IComment } from '@/types/entities';
import { MenuItem } from '@comp/MenuItem';
import { Menu } from '@comp/Menu';
import { Divider } from '@comp/Divider';
import { CommentFile } from '@comp/CommentFile';
import { useFormat } from '@/use/format';
import { Avatar } from '@comp/Avatar';
import {
  CommentAttachmentsActions,
  CommentsActions, SystemActions,
} from '@/store/actions';
import {
  getFullName,
  getCommentById,
  getEditCommentId,
  getUsername,
  getCommentAttachmentsByCommentId,
} from '@/store/selectors';
import { ControlButton } from '@comp/ControlButton';
import { MAX_FILES_IN_COMMENT_PREVIEW } from '@/constants';
import { useMarkdown } from '@/use/markdown';

type ICommentItem = IComment;

enum EnumMenuActions {
  Like,
  Reply,
  Edit,
  Delete,
}

export const CommentItem: FC<ICommentItem> = ({
  id,
  text,
  createdAt,
  updatedAt,
  replyCommentId,
  likedUsers,
}) => {
  const { formatDate } = useFormat();
  const { renderMarkdown } = useMarkdown();
  const dispatch = useDispatch();

  const fullName = useSelector(getFullName);
  const username = useSelector(getUsername);
  const replyComment = useSelector(getCommentById(replyCommentId));
  const editCommentId = useSelector(getEditCommentId);
  const attachments = useSelector(getCommentAttachmentsByCommentId(id));
  const [isDoubleClick, setIsDoubleClick] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  const isImage = (extension: string) => ['png', 'jpg', 'jpeg'].includes(extension);
  const isLikedByMe = likedUsers?.some((user) => user.username === username);

  useEffect(() => {
    if (editCommentId === id) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  }, [editCommentId]);

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
  };

  const menuButtonClickHandler = (action: EnumMenuActions) => {
    switch (action) {
      case EnumMenuActions.Like: {
        const like = { commentId: id };
        if (isLikedByMe) {
          dispatch(CommentsActions.removeLike(like));
        } else {
          dispatch(CommentsActions.addLike(like));
        }
        break;
      }
      case EnumMenuActions.Reply: {
        dispatch(SystemActions.setReplyCommentId(id));
        dispatch(SystemActions.setEditCommentId(null));
        break;
      }
      case EnumMenuActions.Edit: {
        dispatch(SystemActions.setEditCommentId(id));
        dispatch(SystemActions.setReplyCommentId(null));
        break;
      }
      case EnumMenuActions.Delete: {
        dispatch(CommentsActions.remove({ id }));
        break;
      }
      default:
        break;
    }
    hidePopup();
  };

  useEffect(() => {
    if (isDoubleClick) {
      menuButtonClickHandler(EnumMenuActions.Edit);
    }
    const timeout = setTimeout(() => {
      setIsDoubleClick(false);
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [isDoubleClick]);

  const removeHandler = (fileId: number) => {
    dispatch(CommentAttachmentsActions.remove({
      id: fileId,
    }));
  };

  const memoAttachments = useMemo(() => (
    <div className="comment__attachments">
      {
        attachments
          .slice(0, isShowMore ? attachments.length : MAX_FILES_IN_COMMENT_PREVIEW)
          .sort((file) => (isImage(file.extension) ? -1 : 1))
          .map((file, index) => {
            let isCompact = attachments.length > 1;
            if (index === attachments.length - 1) {
              isCompact = index % 2 !== 0 || attachments.length === index - 1;
            }
            return (
              <CommentFile
                key={file.id}
                id={file.id}
                size={file.size}
                name={file.name}
                path={file.path}
                extension={file.extension}
                onRemove={removeHandler}
                isCompact={isCompact}
                isImage={isImage(file.extension)}
              />
            );
          })
      }
      {
        attachments.length > MAX_FILES_IN_COMMENT_PREVIEW
        && !isShowMore
        && (
        <div
          className="comment-file comment-file--compact"
          onClick={() => { setIsShowMore(true); }}
        >
          <div
            className="comment-file__overlay"
          />
          <span className="comment-file__show-more">
            {attachments.length - MAX_FILES_IN_COMMENT_PREVIEW}
            {' '}
            more items...
          </span>
        </div>
        )
      }
    </div>
  ), [attachments]);

  const memoComment = useMemo(() => (
    <div
      className="comment__content"
    >
      <div
        className={`comment__header ${replyCommentId ? 'comment__header--replied' : ''}`}
      >
        {
          replyCommentId && (
          <>
            <div
              className="comment-form__reply--divider"
            />
            <div className="comment-form__reply--name">
              {fullName}
              <span className="comment-form__reply--text">
                {replyComment?.text}
              </span>
            </div>
          </>
          )
        }
      </div>
      {
        text && (<div className="comment__text" dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }} />)
      }
      { memoAttachments }
    </div>
  ), [
    replyCommentId,
    replyComment,
    fullName,
    attachments]);

  const handleClickOnLikedUser = () => {
    dispatch(SystemActions.setIsOpenProfile(true));
  };

  return (
    <div
      className="comment"
      onDoubleClick={() => setIsDoubleClick(true)}
    >
      <Avatar />
      <div
        className={`comment__wrapper
        ${isDoubleClick ? 'comment__wrapper--pressed' : ''}
        ${isEditable ? 'comment__wrapper--editable' : ''}
        `}
      >
        {memoComment}
        <div className="comment__controls">
          <div className="comment__controls--buttons">
            <ControlButton
              imageSrc={`/assets/svg/like${isLikedByMe ? '-active' : ''}.svg`}
              tooltip={`${isLikedByMe ? 'Unlike' : 'Like'}`}
              isColored={isLikedByMe}
              alt="like"
              imageSize={16}
              size={22}
              onClick={() => menuButtonClickHandler(EnumMenuActions.Like)}
            />
            <ControlButton
              imageSrc="/assets/svg/reply.svg"
              tooltip="Reply"
              alt="reply"
              imageSize={16}
              size={22}
              onClick={() => menuButtonClickHandler(EnumMenuActions.Reply)}
            />
          </div>
          <div className="comment__controls--actions">
            {
              updatedAt !== createdAt ? (
                <span>
                  Edited (
                  {formatDate(new Date(updatedAt!))}
                  )&nbsp;·&nbsp;
                </span>
              ) : null
            }
            <div className="comment__date">{formatDate(new Date(createdAt))}</div>
            <div className="comment__like-bubbles">
              {
                likedUsers && likedUsers?.length > 0 && likedUsers.map((user) => (
                  <Avatar
                    size={16}
                    onClick={handleClickOnLikedUser}
                    borderSize="small"
                    style={{ marginLeft: -8, background: '#f7f7f7' }}
                    userAvatarUrl={user.avatar}
                    userFullName={`${user.name} ${user.surname}`}
                  />
                ))
              }
            </div>
            <Menu
              imageSrc="/assets/svg/dots.svg"
              tooltip="More"
              alt="menu"
              imageSize={16}
              size={22}
              position="top"
            >
              <MenuItem
                text={`${isLikedByMe ? 'Unlike' : 'Like'}`}
                imageSrc="/assets/svg/like.svg"
                onClick={() => menuButtonClickHandler(EnumMenuActions.Like)}
              />
              <MenuItem
                text="Reply"
                imageSrc="/assets/svg/reply.svg"
                onClick={() => menuButtonClickHandler(EnumMenuActions.Reply)}
              />
              <MenuItem
                text="Edit"
                imageSrc="/assets/svg/menu/edit.svg"
                onClick={() => menuButtonClickHandler(EnumMenuActions.Edit)}
              />
              <Divider verticalSpacer={7} horizontalSpacer={10} />
              <MenuItem
                text="Delete"
                imageSrc="/assets/svg/menu/remove.svg"
                onClick={() => menuButtonClickHandler(EnumMenuActions.Delete)}
              />
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};
