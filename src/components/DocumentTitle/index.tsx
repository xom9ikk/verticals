import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { getActiveBoardTitle, getActiveSubTodoTitle, getActiveTodoTitle } from '@store/selectors';
import { useTitle } from '@use/title';

export const DocumentTitle: FC = () => {
  const activeBoardTitle = useSelector(getActiveBoardTitle);
  const activeTodoTitle = useSelector(getActiveTodoTitle);
  const activeSubTodoTitle = useSelector(getActiveSubTodoTitle);

  useTitle(activeTodoTitle || activeSubTodoTitle || activeBoardTitle);
  return <></>;
};
