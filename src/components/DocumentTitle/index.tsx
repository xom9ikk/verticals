import { useSelector } from 'react-redux';
import { getActiveBoardTitle, getActiveSubTodoTitle, getActiveTodoTitle } from '@store/selectors';
import { useTitle } from '@use/title';
import React, { FC } from 'react';

export const DocumentTitle: FC = () => {
  const activeBoardTitle = useSelector(getActiveBoardTitle);
  const activeTodoTitle = useSelector(getActiveTodoTitle);
  const activeSubTodoTitle = useSelector(getActiveSubTodoTitle);

  useTitle(activeTodoTitle || activeSubTodoTitle || activeBoardTitle);
  return <></>;
};
