import cn from 'classnames';
import React, {
  Dispatch,
  FC, SetStateAction, SyntheticEvent, useEffect, useRef, useState,
} from 'react';
import {
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

import { DropZone } from '@comp/DropZone';
import { IColor } from '@type/entities';
import { useColorClass } from '@use/colorClass';
import { useDebounce } from '@use/debounce';
import { useFileList } from '@use/fileList';
import { useFocus } from '@use/focus';
import { useHover } from '@use/hover';

interface ICard {
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  color?: IColor;
  invertColor?: boolean;
  isEditable: boolean;
  className?: string;
  isActive?: boolean;
  onSaveFiles?: (files: FileList | null) => void;
  subCardComponent?: any;
  children?: (
    files: FileList | null,
    setFiles: Dispatch<SetStateAction<FileList | null>>
  ) => React.ReactElement<HTMLElement>;
}

export const Card: FC<ICard> = ({
  provided,
  snapshot,
  color,
  invertColor,
  isEditable,
  className,
  isActive,
  onSaveFiles,
  subCardComponent,
  children,
}) => {
  const { merge } = useFileList();
  const colorClass = useColorClass('card__color', color);
  const { isHovering, hoveringProps } = useHover();

  const [isMouseDown, setIsMouseDown] = useState<boolean>();
  const [files, setFiles] = useState<FileList | null>(new DataTransfer().files);

  const titleInputRef = useRef<any>(null);

  useFocus(titleInputRef, [isEditable]);

  const debouncePress = useDebounce((value) => {
    if (!isEditable) {
      setIsMouseDown(value);
    }
  }, 300);

  const handleDropFiles = (droppedFiles: FileList) => {
    const mergedFiles = merge(files, droppedFiles);
    if (!isEditable) {
      onSaveFiles?.(mergedFiles);
    } else {
      setFiles(mergedFiles);
    }
  };

  const handleClick = (event: SyntheticEvent) => event.stopPropagation();

  const handleMouseUp = () => debouncePress(false);

  const handleMouseDown = (event: SyntheticEvent) => {
    if (!subCardComponent) {
      event.stopPropagation();
    }
    debouncePress(true);
  };

  const isTodoDragging = snapshot?.draggingOver?.includes('heading');

  useEffect(() => {
    if (!snapshot?.isDragging) {
      setIsMouseDown(false);
    }
  }, [snapshot?.isDragging]);

  useEffect(() => {
    console.log('CARD mount', color);
    return () => {
      console.log('CARD unmount', color);
    };
  }, []);

  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      className="card"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <div
        className={cn('card__color', !isEditable ? colorClass : '',
          className, {
            'card__color--hovered': isHovering && !!subCardComponent,
            'card__color--editable': isEditable,
            'card__color--invert': invertColor,
            'card__color--pressed': isMouseDown || isActive,
            'card__color--dragging': isTodoDragging,
          })}
      >
        <div
          className={cn('card__content', {
            'card__content--editable': isEditable,
            'card__content--hovered': isHovering,
          })}
          {...hoveringProps}
        >
          <DropZone
            onOpen={handleDropFiles}
            size="small"
          >
            <div className="card__wrapper">
              { children?.(files, setFiles) }
            </div>
          </DropZone>
        </div>
        {!isEditable && subCardComponent}
      </div>
    </div>
  );
};
