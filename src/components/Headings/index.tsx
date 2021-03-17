import React, { FC, useMemo } from 'react';
import { EnumHeadingMode, Heading } from '@comp/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { getEditableCardId, getEditableHeadingId, getHeadingPositionsByColumnId } from '@store/selectors';
import { EnumTodoType } from '@type/entities';
import { NEW_HEADING_ID, NEW_TODO_ID } from '@/constants';
import { SystemActions } from '@store/actions';
import { useParamSelector } from '@use/paramSelector';
import { DroppableProvided } from 'react-beautiful-dnd';

interface IHeadings {
  columnId: number;
  cardType: EnumTodoType;
  dropProvided: DroppableProvided;
}

export const Headings: FC<IHeadings> = ({
  columnId,
  cardType,
  dropProvided,
}) => {
  const dispatch = useDispatch();

  const editableHeadingId = useSelector(getEditableHeadingId);
  const editableCardId = useSelector(getEditableCardId); // TODO: need here?
  const headingPositions = useParamSelector(getHeadingPositionsByColumnId, columnId);

  const handleAddHeading = () => {
    // setTimeout(scrollToBottom);
    dispatch(SystemActions.setEditableHeadingId(`${columnId}-${NEW_HEADING_ID}`));
  };

  const memoHeadings = useMemo(() => headingPositions
    .map((id, index) => (
      <Heading
        key={`heading-${id}`}
        index={index}
        headingId={id}
        isEditable={editableHeadingId === id}
        columnId={columnId}
        cardType={cardType}
        isOpenNewCard={editableCardId === `${id}-${NEW_TODO_ID}`}
        mode={EnumHeadingMode.Normal}
          // isDraggingCard={dropSnapshot.isDraggingOver}
        onAddHeading={handleAddHeading}
      />
    )), [headingPositions, editableHeadingId, cardType]);

  const isEditableNewHeading = editableHeadingId === `${columnId}-${NEW_HEADING_ID}`;

  const memoNewHeading = useMemo(() => (isEditableNewHeading
    ? (
      <Heading
        index={headingPositions.length}
        columnId={columnId}
        headingId={NEW_HEADING_ID}
        isEditable={isEditableNewHeading}
        cardType={cardType}
        mode={EnumHeadingMode.New}
      />
    )
    : null),
  [isEditableNewHeading, headingPositions, columnId, editableHeadingId]);

  return (
    <div className="headings">
      { memoHeadings }
      { memoNewHeading }
      {dropProvided.placeholder}
    </div>
  );
};
