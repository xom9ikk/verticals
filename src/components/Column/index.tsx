import React, { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CardPopupWrapper } from '@comp/CardPopup/Wrapper';
import { ColumnCompact } from '@comp/Column/Compact';
import { ColumnResizable } from '@comp/Column/Resizable';
import { DraggableOrDiv } from '@comp/DraggableWrapper';
import { ColumnsActions } from '@store/actions';
import { getBoardCardType, getColumnById, getIsSearchMode } from '@store/selectors';
import { IColumn } from '@type/entities';
import { useParamSelector } from '@use/paramSelector';

export enum EnumColumnMode {
  Normal,
  New,
  Deleted,
}

interface IColumnComponent {
  index: number;
  isEditable: boolean;
  boardId: number;
  columnId: number;
  mode?: EnumColumnMode;
}

export const Column: FC<IColumnComponent> = ({
  index,
  isEditable,
  boardId,
  columnId,
  mode = EnumColumnMode.Normal,
}) => {
  const dispatch = useDispatch();

  const cardType = useParamSelector(getBoardCardType, boardId);
  const isSearchMode = useSelector(getIsSearchMode);

  const {
    belowId,
    color,
    isCollapsed,
    title,
    description,
    width,
  } = useParamSelector(getColumnById, columnId) as IColumn;

  const handleClick = () => {
    if (mode === EnumColumnMode.Normal) {
      dispatch(ColumnsActions.effect.update({
        id: columnId!,
        isCollapsed: !isCollapsed,
      }));
    }
  };

  const draggableId = `column-${columnId || 'undraggable'}`;
  const isDragDisabled = mode !== EnumColumnMode.Normal || isSearchMode;

  const memoColumn = useMemo(() => (
    <DraggableOrDiv
      index={index}
      draggableId={draggableId}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        isCollapsed ? (
          <ColumnCompact
            snapshot={snapshot}
            provided={provided}
            columnId={columnId}
            color={color}
            title={title}
            onClick={handleClick}
          />
        ) : (
          <ColumnResizable
            snapshot={snapshot}
            provided={provided}
            boardId={boardId}
            columnId={columnId}
            belowId={belowId}
            color={color}
            title={title}
            description={description}
            mode={mode}
            width={width}
            cardType={cardType}
            isEditable={isEditable}
            onClick={handleClick}
          />
        ))}
    </DraggableOrDiv>
  ),
  [
    draggableId, index, isDragDisabled, cardType,
    color, boardId, columnId, belowId, title, description,
    isCollapsed, isEditable, mode, width, isSearchMode,
  ]);

  return (
    <>
      {memoColumn}
      <CardPopupWrapper
        columnId={columnId}
        cardType={cardType}
      />
    </>
  );
};
