import React, {
  FC,
} from 'react';
import { TodoComments } from '@comp/Comments/Todo';
import { SubTodoComments } from '@comp/Comments/SubTodo';

export const CommentsWrapper: FC = () => (
  <>
    <TodoComments />
    <SubTodoComments />
  </>
);
