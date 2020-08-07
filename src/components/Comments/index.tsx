import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { CommentList } from '../CommentList';
import { CommentForm } from '../CommentForm';
import { IRootState } from '../../store/reducers/state';
import { useAutoScroll } from '../../use/autoScroll';
import { IComment, IComments } from '../../types';

interface ICommentsWrapper {
  todoId: string;
}

export const Comments: FC<ICommentsWrapper> = ({
  todoId,
}) => {
  const { comments } = useSelector((state: IRootState) => state);
  const [filteredComments, setFilteredComments] = useState<IComments>([]);
  const [textAreaHeight, setTextAreaHeight] = useState<number>(0);
  const listRef = useRef<any>(null);
  const { scrollToBottom } = useAutoScroll(listRef, [textAreaHeight, comments.length]);

  useEffect(() => {
    const data = comments.filter((comment: IComment) => comment.todoId === todoId);
    console.log('filtered comments', data);
    setFilteredComments(data);
  }, [todoId, comments]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [todoId]);

  useEffect(() => {
    console.log('change length');
  }, [comments.length]);

  return (
    <div className="comments">
      <CommentList
        ref={listRef}
        data={filteredComments}
      />
      <CommentForm
        todoId={todoId}
        onChangeTextAreaHeight={setTextAreaHeight}
      />
    </div>
  );
};