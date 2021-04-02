import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import { ICommentLike } from '@type/entities';
import { MenuItem } from '@comp/Menu/Item';
import { Menu } from '@comp/Menu';
import { Divider } from '@comp/Divider';
import { CommentFile } from '@comp/Comments/File';
import { Avatar } from '@comp/Avatar';
import {
  CommentAttachmentsActions,
  CommentsActions, SystemActions,
} from '@store/actions';
import {
  getFullName,
  getCommentById,
  getEditCommentId,
  getUsername,
  getCommentAttachmentsByCommentId,
} from '@store/selectors';
import { ControlButton } from '@comp/ControlButton';
import { MAX_FILES_IN_COMMENT_PREVIEW } from '@/constants';
import { useMarkdown } from '@use/markdown';
import { useTranslation } from 'react-i18next';
import { useParamSelector } from '@use/paramSelector';

interface ICommentItem {
  id: number;
  text?: string;
  createdAt: number;
  updatedAt: number | null;
  replyCommentId?: number;
  likedUsers?: Array<ICommentLike>;
}

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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renderMarkdown } = useMarkdown();

  const fullName = useSelector(getFullName);
  const username = useSelector(getUsername);
  const replyComment = useParamSelector(getCommentById, replyCommentId);
  const editCommentId = useSelector(getEditCommentId);
  const attachments = useParamSelector(getCommentAttachmentsByCommentId, id);
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

  const handleMenuButtonClick = (action: EnumMenuActions) => {
    switch (action) {
      case EnumMenuActions.Like: {
        const like = { commentId: id };
        if (isLikedByMe) {
          dispatch(CommentsActions.effect.removeLike(like));
        } else {
          dispatch(CommentsActions.effect.addLike(like));
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
        dispatch(CommentsActions.effect.remove({ id }));
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (isDoubleClick) {
      handleMenuButtonClick(EnumMenuActions.Edit);
    }
    const timeout = setTimeout(() => {
      setIsDoubleClick(false);
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [isDoubleClick]);

  const handleRemove = (fileId: number) => {
    dispatch(CommentAttachmentsActions.effect.remove({
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
                onRemove={handleRemove}
                isCompact={isCompact}
                isImage={isImage(file.extension)}
              />
            );
          })
      }
      {
        attachments.length > MAX_FILES_IN_COMMENT_PREVIEW
        && !isShowMore && (
        <div
          className="comment-file comment-file--compact"
          onClick={() => { setIsShowMore(true); }}
        >
          <div className="comment-file__overlay" />
          <span className="comment-file__show-more">
            {attachments.length - MAX_FILES_IN_COMMENT_PREVIEW}
            {' '}
            {t('more items...')}
          </span>
        </div>
        )
      }
    </div>
  ), [t, attachments]);

  const memoComment = useMemo(() => (
    <div className="comment__content">
      <div
        className={cn('comment__header', {
          'comment__header--replied': replyCommentId,
        })}
      >
        {
          replyCommentId && (
          <>
            <div className="comment-form__reply--divider" />
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
        text && (
          <div
            className="comment__text markdown"
            onDoubleClick={(e) => e.stopPropagation()}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }}
          />
        )
      }
      { memoAttachments }
    </div>
  ), [
    t,
    replyCommentId,
    replyComment,
    fullName,
    attachments,
    text,
  ]);

  const handleClickOnLikedUser = () => {
    dispatch(SystemActions.setIsOpenProfile(true));
  };

  return (
    <div
      className="comment"
      onDoubleClickCapture={() => setIsDoubleClick(true)}
    >
      <Avatar />
      <div
        className={cn('comment__wrapper', {
          'comment__wrapper--pressed': isDoubleClick,
          'comment__wrapper--editable': isEditable,
        })}
      >
        {memoComment}
        <div className="comment__controls">
          <div className="comment__controls--buttons">
            <ControlButton
              imageSrc={`/assets/svg/like${isLikedByMe ? '-active' : ''}.svg`}
              tooltip={`${isLikedByMe ? t('Unlike') : t('Like')}`}
              isColored={isLikedByMe}
              alt="like"
              imageSize={16}
              size={22}
              onClick={() => handleMenuButtonClick(EnumMenuActions.Like)}
            />
            <ControlButton
              imageSrc="/assets/svg/reply.svg"
              tooltip={t('Reply')}
              alt="reply"
              imageSize={16}
              size={22}
              onClick={() => handleMenuButtonClick(EnumMenuActions.Reply)}
            />
          </div>
          <div className="comment__controls--actions">
            {
              updatedAt !== createdAt ? (
                <span>
                  {t('Edited')}
                  {' '}
                  (
                  {format(new Date(updatedAt!), 'dd MMM, hh:mm')}
                  )&nbsp;·&nbsp;
                </span>
              ) : null
            }
            <div className="comment__date">{format(new Date(createdAt), 'dd MMM, hh:mm')}</div>
            <div className="comment__like-bubbles">
              {
                likedUsers && likedUsers?.length > 0 && likedUsers.map((user) => (
                  <Avatar
                    key={user.username}
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
              id={`comment-${id}`}
              imageSrc="/assets/svg/dots.svg"
              tooltip={t('More')}
              alt="menu"
              imageSize={16}
              size={22}
              position="top"
              style={{
                marginTop: 3,
              }}
              onSelect={handleMenuButtonClick}
            >
              <MenuItem
                text={`${isLikedByMe ? t('Unlike') : t('Like')}`}
                imageSrc="/assets/svg/like.svg"
                action={EnumMenuActions.Like}
              />
              <MenuItem
                text={t('Reply')}
                imageSrc="/assets/svg/reply.svg"
                action={EnumMenuActions.Reply}
              />
              <MenuItem
                text={t('Edit')}
                imageSrc="/assets/svg/menu/edit.svg"
                action={EnumMenuActions.Edit}
              />
              <Divider verticalSpacer={7} horizontalSpacer={10} />
              <MenuItem
                text={t('Delete')}
                imageSrc="/assets/svg/menu/remove.svg"
                action={EnumMenuActions.Delete}
              />
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};
