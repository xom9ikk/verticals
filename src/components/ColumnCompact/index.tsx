import React, { FC } from 'react';
import { IColor } from '@type/entities';
import cn from 'classnames';
import { useColorClass } from '@use/colorClass';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { getTodosCountByColumnId } from '@store/selectors';

interface IColumnContextMenu {
  snapshot: DraggableStateSnapshot;
  provided: DraggableProvided;
  columnId: number;
  color?: IColor;
  title: string;
  onClick: (event: React.SyntheticEvent) => void;
}

export const ColumnCompact: FC<IColumnContextMenu> = ({
  snapshot,
  provided,
  columnId,
  color,
  title,
  onClick,
}) => {
  const todosCount = useSelector(getTodosCountByColumnId(columnId));

  const colorClass = useColorClass('column-compact__wrapper', color);
  console.log('ColumnCompact', columnId);

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn('column-compact', {
        'column-compact--dragging': snapshot.isDragging,
      })}
      ref={provided.innerRef}
      onClick={onClick}
      {...provided.draggableProps}
    >
      <div
        className={cn('column-compact__wrapper', colorClass, {
          'column-compact__wrapper--dragging': snapshot.isDragging,
        })}
        {...provided.dragHandleProps}
      >
        <div className="column-compact__inner">
          <div className="column-compact__counter">
            { todosCount }
          </div>
          <div className="column-compact__title">{title}</div>
        </div>
      </div>
    </div>
  );
};
