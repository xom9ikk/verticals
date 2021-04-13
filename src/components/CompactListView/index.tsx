import cn from 'classnames';
import React, { FC } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import { IColor } from '@type/entities';
import { useColorClass } from '@use/colorClass';

interface IColumnContextMenu {
  snapshot: DraggableStateSnapshot;
  provided: DraggableProvided;
  color?: IColor;
  title: string;
  count: number;
  isRotated?: boolean;
  onClick: (event: React.SyntheticEvent) => void;
}

export const CompactListView: FC<IColumnContextMenu> = ({
  snapshot,
  provided,
  color,
  title,
  count,
  isRotated,
  onClick,
}) => {
  const colorClass = useColorClass('compact-list-view__wrapper', color);

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn('compact-list-view', {
        'compact-list-view--dragging': snapshot.isDragging,
        'compact-list-view--rotated': isRotated,
      })}
      ref={provided.innerRef}
      onClick={onClick}
      {...provided.draggableProps}
    >
      <div
        className={cn('compact-list-view__wrapper', colorClass, {
          'compact-list-view__wrapper--dragging': snapshot.isDragging,
        })}
        {...provided.dragHandleProps}
      >
        <div className="compact-list-view__inner">
          <div className="compact-list-view__title">{title}</div>
          <div className="compact-list-view__counter">
            <span>{ count }</span>
          </div>
        </div>
      </div>
    </div>
  );
};
