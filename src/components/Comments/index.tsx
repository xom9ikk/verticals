import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { CommentList } from '@comp/Comments/List';
import { CommentForm } from '@comp/Comments/Form';
import { FormattingHelp } from '@comp/FormattingHelp';
import { useAutoScroll, ScrollDirection } from '@use/autoScroll';
import { ICreateComment } from '@type/actions';
import { IComments } from '@type/entities';

interface ICommentsComponent {
  cardId: number;
  comments: IComments,
  onCreate: (data: ICreateComment) => void,
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
