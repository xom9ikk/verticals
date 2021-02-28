import React, { FC, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { IColor } from '@type/entities';
import { ColumnsActions } from '@store/actions';
import { getBoardCardType, getIsSearchMode } from '@store/selectors';
import { CardPopup } from '@comp/CardPopup';
import { ColumnCompact } from '@comp/ColumnCompact';
import { ColumnResizable } from '@comp/ColumnResizable';
import { useParamSelector } from '@use/paramSelector';

export enum EnumColumnMode {
  Normal,
  New,
  Deleted,
}

interface IColumn {
  index: number;
  isEditable: boolean;
  boardId: number;
  columnId?: number;
  belowId?: number;
  color?: IColor;
  isCollapsed?: boolean;
  title?: string;
  description?: string;
  scrollToRight?: () => void;
  mode?: EnumColumnMode;
  width: number | null;
}

export const Column: FC<IColumn> = ({
  index,
  isEditable,
  boardId,
  columnId,
  belowId,
  color,
  isCollapsed,
  title,
  description,
  scrollToRight,
  mode = EnumColumnMode.Normal,
  width,
}) => {
  const dispatch = useDispatch();

  const cardType = useParamSelector(getBoardCardType, boardId);
  const isSearchMode = useSelector(getIsSearchMode);

  const handleClick = () => {
    if (mode === EnumColumnMode.Normal) {
      dispatch(ColumnsActions.update({
        id: columnId!,
        isCollapsed: !isCollapsed,
      }));
    }
  };

  const draggableId = `column-${columnId || 'undraggable'}`;
  const isDragDisabled = mode !== EnumColumnMode.Normal || isSearchMode;

  const memoColumn = useMemo(() => (
    <Draggable
      index={index}
      draggableId={draggableId}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        isCollapsed ? (
          <ColumnCompact
            snapshot={snapshot}
            provided={provided}
            columnId={columnId!}
            color={color}
            title={title!}
            onClick={handleClick}
          />
        ) : (
          <ColumnResizable
            snapshot={snapshot}
            provided={provided}
            boardId={boardId}
            columnId={columnId!}
            belowId={belowId}
            color={color}
            title={title}
            description={description}
            mode={mode}
            width={width}
            cardType={cardType}
            isEditable={isEditable}
            scrollToRight={scrollToRight}
            onClick={handleClick}
          />
        ))}
    </Draggable>
  ),
  [
    draggableId, index, isDragDisabled, cardType,
    color, boardId, columnId, belowId, title, description,
    isCollapsed, isEditable, mode, width, isSearchMode,
  ]);

  return (
    <>
      {memoColumn}
      <CardPopup
        columnId={columnId!}
        cardType={cardType}
      />
    </>
  );
};
