import React, { FC } from 'react';
import { IColor } from '@type/entities';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { getCountTodosByColumnId } from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';
import { CompactListView } from '@comp/CompactListView';

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
