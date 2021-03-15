import React, { FC } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useResizable } from '@use/resizable';
import { EnumTodoType, IColor } from '@type/entities';
import { EnumColumnMode } from '@comp/Column';
import { ColumnWide } from '@comp/ColumnWide';
import { useDebounce } from '@use/debounce';
import { ColumnsActions } from '@store/actions';
import { useDispatch } from 'react-redux';
import { DEFAULT_COLUMN_WIDTH } from '@/constants';

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
  width?: number | null;
  cardType: EnumTodoType;
  isEditable: boolean;
  scrollToRight?: () => void;
  onClick: (event: React.SyntheticEvent) => void;
}

export const ColumnResizable: FC<IColumnResizable> = ({
  snapshot,
  columnId,
  width = DEFAULT_COLUMN_WIDTH,
  ...props
}) => {
  const dispatch = useDispatch();

  const debounceEffectUpdateWidth = useDebounce((newWidth: number) => {
    dispatch(ColumnsActions.effect.update({ id: columnId, width: newWidth }));
  }, 1000);

  const debounceUpdateWidth = useDebounce((newWidth: number) => {
    dispatch(ColumnsActions.updateEntity({ id: columnId, width: newWidth }));
  }, 50);

  const handleResize = (newWidth: number) => {
    debounceEffectUpdateWidth(newWidth);
    debounceUpdateWidth(newWidth);
  };

  const { size, handler } = useResizable({
    size: width === null ? DEFAULT_COLUMN_WIDTH : width,
    minSize: 280,
    maxSize: 700,
    direction: 'right',
    onResize: handleResize,
  });

  return (
    <div style={{
      minWidth: snapshot.isDragging ? undefined : size,
      maxWidth: snapshot.isDragging ? undefined : size,
    }}
    >
      <ColumnWide
        {...props}
        columnId={columnId}
        snapshot={snapshot}
        onResize={handler}
      />
    </div>
  );
};
