import cn from 'classnames';
import React, { FC, useMemo } from 'react';

import {
  getCountTodosByBoardId,
} from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';

interface IBoardCounter {
  boardId: number;
  isActive: boolean;
}

export const BoardCounter: FC<IBoardCounter> = ({
  boardId,
  isActive,
}) => {
  const countTodos = useParamSelector(getCountTodosByBoardId, boardId);

  return useMemo(() => (
    <div className={cn('board__counter', {
      'board__counter--active': isActive,
    })}
    >
      <img src="/assets/svg/board/search.svg" alt="search" />
      {countTodos}
    </div>
  ), [countTodos, isActive]);
};
