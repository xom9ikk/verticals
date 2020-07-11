import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IComment, IFile } from '../../types';
import { MenuButton } from '../MenuButton';
import { Menu } from '../Menu';
import { Divider } from '../Divider';
import { CommentFile } from '../CommentFile';
import { useFormatDate } from '../../use/formatDate';
import { Avatar } from '../Avatar';
import {
  CommentsActions, SystemActions,
} from '../../store/actions';
import { IRootState } from '../../store/reducers/state';

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
    text, attachedFiles, date, isEdited, replyCommentId,
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

  const menuButtonClickHandler = (action: EnumMenuActions, payload?: any) => {
    console.log('menuButtonClickHandler', action);
    switch (action) {
      case EnumMenuActions.Like: {
        console.log('add like');
        dispatch(CommentsActions.switchLike(comment.id, 'user-id'));
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
        dispatch(CommentsActions.remove(comment.id));
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
    dispatch(CommentsActions.removeFile(comment.id, id));
    console.log('remove attached fileId', id);
  };

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
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
        <div className="comment__date">{formatDate(new Date(date))}</div>
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
      className={`comment 
      ${isDoubleClick ? 'comment--pressed' : ''}
      ${isEditable ? 'comment--editable' : ''}
      `}
      onDoubleClick={() => setIsDoubleClick(true)}
    >
      {memoComment}
      <div className="comment__controls">
        <div className="comment__controls--buttons">
          <Menu
            imageSrc={`/svg/like${isLikeByMe ? '-active' : ''}.svg`}
            alt="like"
            imageSize={16}
            size={22}
            isShowPopup={false}
            onClick={() => menuButtonClickHandler(EnumMenuActions.Like)}
          />
          <Menu
            imageSrc="/svg/reply.svg"
            alt="reply"
            imageSize={16}
            size={22}
            isShowPopup={false}
            onClick={() => menuButtonClickHandler(EnumMenuActions.Reply)}
          />
        </div>
        <div className="comment__controls--actions">
          {
            isEdited && (
            <span>Edited</span>
            )
          }
          <Avatar size={20} />
          <Menu
            imageSrc="/svg/dots.svg"
            alt="menu"
            imageSize={16}
            size={22}
            position="right"
          >
            <MenuButton
              text="Like"
              imageSrc="/svg/like.svg"
              onClick={() => menuButtonClickHandler(EnumMenuActions.Like)}
            />
            <MenuButton
              text="Reply"
              imageSrc="/svg/reply.svg"
              onClick={() => menuButtonClickHandler(EnumMenuActions.Reply)}
            />
            <MenuButton
              text="Edit"
              imageSrc="/svg/menu/edit.svg"
              onClick={() => menuButtonClickHandler(EnumMenuActions.Edit)}
            />
            <Divider verticalSpacer={7} horizontalSpacer={10} />
            <MenuButton
              text="Delete"
              imageSrc="/svg/menu/delete.svg"
              onClick={() => menuButtonClickHandler(EnumMenuActions.Delete)}
            />
          </Menu>
        </div>
      </div>
    </div>
  );
};
