import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { CommentList } from '@comp/CommentList';
import { CommentForm } from '@comp/CommentForm';
import { FormattingHelp } from '@comp/FormattingHelp';
import { useAutoScroll, ScrollDirection } from '@use/autoScroll';
import { useSelector } from 'react-redux';
import { getActiveTodoId, getCommentsByTodoId } from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';

export const Comments: FC = () => {
  const activeTodoId = useSelector(getActiveTodoId);
  const comments = useParamSelector(getCommentsByTodoId, activeTodoId);

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
  }, [activeTodoId]);

  return (
    <div className="comments">
      <CommentList
        ref={listRef}
        comments={comments}
      />
      <CommentForm
        todoId={activeTodoId}
        onChangeTextAreaHeight={setTextAreaHeight}
        isScrolledToBottom={isLimit}
        onScrollToBottom={scrollToBottom}
      />
      <FormattingHelp />
    </div>
  );
};
