import React, {
  forwardRef,
} from 'react';
import { CommentItem } from '@comp/CommentItem';
import { IComment, IComments } from '@/types/entities';

interface ICommentList {
  comments: IComments
}

const CommentListComponent = ({
  comments,
}: ICommentList, ref: any) => (
  <div
    ref={ref}
    className={`comment-list ${!comments?.length ? 'comment-list--empty' : ''}`}
  >
    {
      comments.length > 0 ? (
        <>
          {
            comments.map((comment: IComment) => (
              <CommentItem
                key={comment.id}
                {...comment}
              />
            ))
          }
        </>
      ) : (
        <>
          <img src="/assets/svg/comments-empty.svg" alt="empty" />
          <div>Drop files here</div>
        </>
      )
    }
  </div>
);
export const CommentList = forwardRef(CommentListComponent);
