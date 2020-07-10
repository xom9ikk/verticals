import React, {
  forwardRef, useEffect, useRef,
} from 'react';
import { CommentItem } from '../CommentItem';
import { IComment, IComments } from '../../types';

interface ICommentList {
  data?: IComments
}

const CL = ({
  data,
}: ICommentList, ref: any) => {
  const listRef = useRef<any>();

  useEffect(() => {
    if (ref) {
      // eslint-disable-next-line no-param-reassign
      ref.current = listRef.current;
    }
  }, [listRef]);

  return (
    <div
      ref={listRef}
      className={`comment-list ${!data?.length ? 'comment-list--empty' : ''}`}
    >
      {
        data && data.length > 0 ? (
          <>
            {
              data.map((comment: IComment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            }
          </>
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

export const CommentList = forwardRef(CL);
