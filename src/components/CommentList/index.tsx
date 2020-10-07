import React, {
  forwardRef,
} from 'react';
import { CommentItem } from '@comp/CommentItem';
import { IComment, IComments } from '@/types';

interface ICommentList {
  data?: IComments
}

const CommentListComponent = ({
  data,
}: ICommentList, ref: any) => (
  <div
    ref={ref}
    className={`comment-list ${!data?.length ? 'comment-list--empty' : ''}`}
  >
    {
        data && data.length > 0 ? (
          <>
            {
              data.map((comment: IComment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
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
