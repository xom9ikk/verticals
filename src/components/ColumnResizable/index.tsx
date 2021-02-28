import React, { FC } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useResizable } from '@use/resizable';
import { EnumTodoType, IColor } from '@type/entities';
import { EnumColumnMode } from '@comp/Column';
import { ColumnWide } from '@comp/ColumnWide';

interface IColumnResizable {
  snapshot: DraggableStateSnapshot;
  provided: DraggableProvided;
  boardId: number;
  columnId: number;
  belowId?: number;
  color?: IColor;
  title?: string;
  description?: string;
  mode: EnumColumnMode;
  cardType: EnumTodoType;
  isEditable: boolean;
  scrollToRight?: () => void;
  onClick: (event: React.SyntheticEvent) => void;
}

export const ColumnResizable: FC<IColumnResizable> = ({
  snapshot,
  ...props
}) => {
  const { size, handler } = useResizable({
    size: 280,
    minSize: 280,
    maxSize: 700,
    direction: 'right',
  });

  console.log(size);

  return (
    <div style={{
      minWidth: snapshot.isDragging ? undefined : size,
      maxWidth: snapshot.isDragging ? undefined : size,
    }}
    >
      <ColumnWide
        snapshot={snapshot}
        {...props}
        onResize={handler}
      />
    </div>
  );
};
