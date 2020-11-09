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
  // attachedFiles,
  createdAt,
  updatedAt,
  replyCommentId,
}) => {
  const { formatDate } = useFormat();
  const dispatch = useDispatch();

  const fullName = useSelector(getFullName);
  const username = useSelector(getUsername);
  const replyComment = useSelector(getCommentById(replyCommentId));
  const editCommentId = useSelector(getEditCommentId);
  const attachments = useSelector(getCommentAttachmentsByCommentId(id));
  // const [images, setImages] = useState<Array<IFile>>([]);
  // const [files, setFiles] = useState<Array<IFile>>([]);
  // const [isLikeByMe, setIsLikeByMe] = useState<boolean>(false);
  const [isDoubleClick, setIsDoubleClick] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const isImage = (extension: string) => ['png', 'jpg', 'jpeg'].includes(extension);

  // useEffect(() => {
  //   setImages(attachedFiles?.filter((file) => isImage(file)) ?? []);
  //   setFiles(attachedFiles?.filter((file) => !isImage(file)) ?? []);
  // }, [attachedFiles]);

  // useEffect(() => {
  //   const newValue = comment.likes?.includes('user-id') ?? false;
  //   console.log('setIsLikeByMe', newValue);
  //   setIsLikeByMe(newValue);
  // }, [comment]);

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

  const menuButtonClickHandler = (action: EnumMenuActions, payload?: any) => {
    console.log('menuButtonClickHandler', action, payload);
    switch (action) {
      case EnumMenuActions.Like: {
        console.log('add like');
        dispatch(CommentsActions.switchLike({
          id,
          username: username!,
        }));
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

  // const drawList = (list: Array<IFile>) => (
  //   <div className="comment__attachments">
  //     {
  //       list && list?.length > 0 && list
  //         .map((file, index) => {
  //           let isCompact = list.length > 1;
  //           if (index === list.length - 1) {
  //             isCompact = index % 2 !== 0;
  //           }
  //           return (
  //             <CommentFile
  //               key={file.id}
  //               file={file}
  //               onRemove={removeHandler}
  //               isCompact={isCompact}
  //               isImage={isImage(file)}
  //             />
  //           );
  //         })
  //   }
  //   </div>
  // );

  const memoAttachments = useMemo(() => (
    <div className="comment__attachments">
      {
        attachments
          .sort((file) => (isImage(file.extension) ? -1 : 1))
          .map((file, index) => {
            let isCompact = attachments.length > 1;
            if (index === attachments.length - 1) {
              isCompact = index % 2 !== 0;
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
        text && (<div className="comment__text">{text}</div>)
      }
      { memoAttachments }
      {/* {drawList(files)} */}
      {/* {drawList(images)} */}
    </div>
  ), [
    replyCommentId,
    replyComment,
    fullName,
    attachments]);

  const isLikeByMe = false;

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
              imageSrc={`/assets/svg/like${isLikeByMe ? '-active' : ''}.svg`}
              tooltip={`${isLikeByMe ? 'Unlike' : 'Like'}`}
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
            <Menu
              imageSrc="/assets/svg/dots.svg"
              tooltip="More"
              alt="menu"
              imageSize={16}
              size={22}
              position="top"
            >
              <MenuItem
                text={`${isLikeByMe ? 'Unlike' : 'Like'}`}
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
