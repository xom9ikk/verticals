import React, { FC } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import { CompactListView } from '@comp/CompactListView';
import { getCountTodosByColumnId } from '@store/selectors';
import { IColor } from '@type/entities';
import { useParamSelector } from '@use/paramSelector';

interface IColumnContextMenu {
  snapshot: DraggableStateSnapshot;
  provided: DraggableProvided;
  columnId?: number;
  color?: IColor;
  title: string;
  onClick: (event: React.SyntheticEvent) => void;
}

export const ColumnCompact: FC<IColumnContextMenu> = ({
  columnId,
  ...props
}) => {
  const count = useParamSelector(getCountTodosByColumnId, columnId);

  return (
    <CompactListView
      {...props}
      isRotated
      count={count}
    />
  );
};
