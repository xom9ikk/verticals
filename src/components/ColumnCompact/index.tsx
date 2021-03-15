import React, { FC } from 'react';
import { IColor } from '@type/entities';
import cn from 'classnames';
import { useColorClass } from '@use/colorClass';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { getTodoPositionsByColumnId } from '@store/selectors';
import { useParamSelector } from '@use/paramSelector';

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
  const todoPositions = useParamSelector(getTodoPositionsByColumnId, columnId);

  const colorClass = useColorClass('column-compact__wrapper', color);

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
            { todoPositions.length }
          </div>
          <div className="column-compact__title">{title}</div>
        </div>
      </div>
    </div>
  );
};
