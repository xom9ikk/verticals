import React, {
  FC, useEffect, useRef, useState,
} from 'react';

import { CommentForm } from '@comp/Comments/Form';
import { CommentList } from '@comp/Comments/List';
import { ICreateCommentData } from '@comp/Comments/Wrapper';
import { FormattingHelp } from '@comp/FormattingHelp';
import { IComments } from '@type/entities';
import { ScrollDirection, useAutoScroll } from '@use/autoScroll';

interface ICommentsComponent {
  cardId: number;
  comments: IComments,
  onCreate: (data: ICreateCommentData) => void,
}

export const Comments: FC<ICommentsComponent> = ({
  cardId,
  comments,
  onCreate,
}) => {
  const [textAreaHeight, setTextAreaHeight] = useState<number>(0);
  const [commentsMaxCounter, setCommentsMaxCounter] = useState<number>(0);

  const listRef = useRef<any>(null);

  const { scrollToBottom, isLimit } = useAutoScroll(
    listRef,
    ScrollDirection.Bottom,
    [textAreaHeight, commentsMaxCounter],
    ScrollDirection.Bottom,
  );

  useEffect(() => {
    if (comments.length > commentsMaxCounter) {
      setCommentsMaxCounter(comments.length);
    }
  }, [comments.length]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [cardId]);

  return (
    <div className="comments">
      <CommentList
        ref={listRef}
        comments={comments}
      />
      <CommentForm
        onChangeTextAreaHeight={setTextAreaHeight}
        isScrolledToBottom={isLimit}
        onScrollToBottom={scrollToBottom}
        onCreate={onCreate}
      />
      <FormattingHelp />
    </div>
  );
};
