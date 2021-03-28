import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { EnumCardType, IColor } from '@type/entities';
import { DEFAULT_COLUMN_WIDTH } from '@/constants';
import { EnumColumnMode } from '@comp/Column';
import { ColumnWide } from '@comp/Column/Wide';
import { ColumnsActions } from '@store/actions';
import { useDebounce } from '@use/debounce';
import { useResizable } from '@use/resizable';
import { EnumScrollPosition, useScrollToRef } from '@use/scrollToRef';

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
  cardType: EnumCardType;
  isEditable: boolean;
  onClick: (event: React.SyntheticEvent) => void;
}

export const ColumnResizable: FC<IColumnResizable> = ({
  snapshot,
  columnId,
  mode,
  isEditable,
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

  const [scrollToRef, refForScroll] = useScrollToRef<HTMLDivElement>();

  useEffect(() => {
    if (isEditable) {
      scrollToRef(EnumScrollPosition.Center);
    }
  }, [isEditable]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isEditable && mode === EnumColumnMode.New) {
        scrollToRef(EnumScrollPosition.Center);
      }
    }, 200);
    return () => clearTimeout(timeout);
  });

  return (
    <div
      ref={refForScroll}
      style={{
        minWidth: snapshot.isDragging ? undefined : size,
        maxWidth: snapshot.isDragging ? undefined : size,
      }}
    >
      <ColumnWide
        {...props}
        columnId={columnId}
        mode={mode}
        isEditable={isEditable}
        snapshot={snapshot}
        onResize={handler}
      />
    </div>
  );
};
