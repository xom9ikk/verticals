import React, { FC } from 'react';

interface ICommentList {
  commentList?: any
}

export const CommentList: FC<ICommentList> = ({
  commentList,
}) => {
  const a = 1;
  return (
    <div
      className={`comment-list ${!commentList?.length ? 'comment-list--empty' : ''}`}
    >
      {
        commentList?.length > 0 ? (
          <div>full</div>
        ) : (
          <>
            <img src="/svg/comments-empty.svg" alt="empty" />
            <div>Drop files here</div>
          </>
        )
      }
    </div>
  );
};
