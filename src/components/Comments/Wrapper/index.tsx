import React, {
  FC,
} from 'react';

import { SubTodoComments } from '@comp/Comments/SubTodo';
import { TodoComments } from '@comp/Comments/Todo';

export const CommentsWrapper: FC = () => (
  <>
    <TodoComments />
    <SubTodoComments />
  </>
);
