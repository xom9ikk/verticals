import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IComment, IFile } from '@/types';
import { MenuButton } from '@comp/MenuButton';
import { Menu } from '@comp/Menu';
import { Divider } from '@comp/Divider';
import { CommentFile } from '@comp/CommentFile';
import { useFormatDate } from '@/use/formatDate';
import { Avatar } from '@comp/Avatar';
import {
  CommentsActions, SystemActions,
} from '@/store/actions';
import { IRootState } from '@/store/reducers/state';

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
  const {
    text, attachedFiles, date, editDate, replyCommentId,
  } = comment;
  const { formatDate } = useFormatDate();
  const dispatch = useDispatch();
  const { system: { editCommentId }, comments } = useSelector((state: IRootState) => state);
  const [images, setImages] = useState<Array<IFile>>([]);
  const [files, setFiles] = useState<Array<IFile>>([]);
  const [isLikeByMe, setIsLikeByMe] = useState<boolean>(false);
  const [isDoubleClick, setIsDoubleClick] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [replyComment, setReplyComment] = useState<IComment>();

  const isImage = (file: IFile) => ['png', 'jpg', 'jpeg'].includes(file.type);

  useEffect(() => {
    const targetComment = comments.find((c: IComment) => c.id === replyCommentId);
    setReplyComment(targetComment);
  }, [replyCommentId]);

  useEffect(() => {
    setImages(attachedFiles?.filter((file) => isImage(file)) ?? []);
    setFiles(attachedFiles?.filter((file) => !isImage(file)) ?? []);
  }, [attachedFiles]);

  useEffect(() => {
    const newValue = comment.likes?.includes('user-id') ?? false;
    console.log('setIsLikeByMe', newValue);
    setIsLikeByMe(newValue);
  }, [comment]);

  useEffect(() => {
    if (editCommentId === comment.id) {
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
          id: comment.id,
          userId: 'user-id',
        }));
        break;
      }
      case EnumMenuActions.Reply: {
        dispatch(SystemActions.setReplyCommentId(comment.id));
        break;
      }
      case EnumMenuActions.Edit: {
        dispatch(SystemActions.setEditCommentId(comment.id));
        break;
      }
      case EnumMenuActions.Delete: {
        dispatch(CommentsActions.remove({ id: comment.id }));
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

  const removeHandler = (id: string) => {
    dispatch(CommentsActions.removeFile({
      id: comment.id,
      fileId: id,
    }));
    console.log('remove attached fileId', id);
  };

  const drawList = (list: Array<IFile>) => (
    <div className="comment__attachments">
      {
        list && list?.length > 0 && list
          .map((file, index) => {
            let isCompact = list.length > 1;
            if (index === list.length - 1) {
              isCompact = index % 2 !== 0;
            }
            return (
              <CommentFile
                key={file.id}
                file={file}
                onRemove={removeHandler}
                isCompact={isCompact}
                isImage={isImage(file)}
              />
            );
          })
    }
    </div>
  );

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
              Max Romanyuta
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
      {drawList(files)}
      {drawList(images)}
    </div>
  ), [comment, images, files]);

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
            <Menu
              imageSrc={`/assets/svg/like${isLikeByMe ? '-active' : ''}.svg`}
              tooltip={`${isLikeByMe ? 'Unlike' : 'Like'}`}
              alt="like"
              imageSize={16}
              size={22}
              isShowPopup={false}
              onClick={() => menuButtonClickHandler(EnumMenuActions.Like)}
            />
            <Menu
              imageSrc="/assets/svg/reply.svg"
              tooltip="Reply"
              alt="reply"
              imageSize={16}
              size={22}
              isShowPopup={false}
              onClick={() => menuButtonClickHandler(EnumMenuActions.Reply)}
            />
          </div>
          <div className="comment__controls--actions">
            {
              editDate && (
              <span>Edited</span>
              )
            }
            <div className="comment__date">{formatDate(new Date(date))}</div>
            <Menu
              imageSrc="/assets/svg/dots.svg"
              tooltip="More"
              alt="menu"
              imageSize={16}
              size={22}
              position="right"
            >
              <MenuButton
                text={`${isLikeByMe ? 'Unlike' : 'Like'}`}
                imageSrc="/assets/svg/like.svg"
                onClick={() => menuButtonClickHandler(EnumMenuActions.Like)}
              />
              <MenuButton
                text="Reply"
                imageSrc="/assets/svg/reply.svg"
                onClick={() => menuButtonClickHandler(EnumMenuActions.Reply)}
              />
              <MenuButton
                text="Edit"
                imageSrc="/assets/svg/menu/edit.svg"
                onClick={() => menuButtonClickHandler(EnumMenuActions.Edit)}
              />
              <Divider verticalSpacer={7} horizontalSpacer={10} />
              <MenuButton
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
