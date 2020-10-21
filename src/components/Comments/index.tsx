import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { CommentList } from '@comp/CommentList';
import { CommentForm } from '@comp/CommentForm';
import { useAutoScroll, ScrollDirection } from '@/use/autoScroll';
import { getCommentsByTodoId } from '@/store/selectors';

interface ICommentsWrapper {
  todoId: number;
}

export const Comments: FC<ICommentsWrapper> = ({
  todoId,
}) => {
  const comments = useSelector(getCommentsByTodoId(todoId));
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
  }, [todoId]);

  return (
    <div className="comments">
      <CommentList
        ref={listRef}
        data={comments}
      />
      <CommentForm
        todoId={todoId}
        onChangeTextAreaHeight={setTextAreaHeight}
      />
    </div>
  );
};
