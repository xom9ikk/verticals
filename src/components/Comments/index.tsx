import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { CommentList } from '@comp/CommentList';
import { CommentForm } from '@comp/CommentForm';
import { useAutoScroll, ScrollDirection } from '@/use/autoScroll';
import { useSelector } from 'react-redux';
import { getActiveTodoId, getCommentsByTodoId } from '@/store/selectors';

interface ICommentsWrapper {
}

export const Comments: FC<ICommentsWrapper> = () => {
  const activeTodoId = useSelector(getActiveTodoId);
  const comments = useSelector(getCommentsByTodoId(activeTodoId));

  const [textAreaHeight, setTextAreaHeight] = useState<number>(0);
  const listRef = useRef<any>(null);
  const { scrollToBottom } = useAutoScroll(
    listRef, ScrollDirection.Bottom, [textAreaHeight, comments.length],
  );

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
      />
    </div>
  );
};
