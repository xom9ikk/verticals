import React, {
  FC,
} from 'react';

import { SubTodoComments } from '@comp/Comments/SubTodo';
import { TodoComments } from '@comp/Comments/Todo';

export interface ICreateCommentData {
  readonly text: string;
  readonly replyCommentId?: number;
  readonly files?: FileList | null;
}

export const CommentsWrapper: FC = () => (
  <>
    <TodoComments />
    <SubTodoComments />
  </>
);
