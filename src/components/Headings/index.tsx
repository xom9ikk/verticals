import React, { FC, useMemo } from 'react';
import { DroppableProvided } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { NEW_HEADING_ID } from '@/constants';
import { EnumHeadingMode, Heading } from '@comp/Heading';
import { SystemActions } from '@store/actions';
import { getEditableHeadingId, getHeadingPositionsByColumnId } from '@store/selectors';
import { EnumCardType } from '@type/entities';
import { useParamSelector } from '@use/paramSelector';

interface IHeadings {
  columnId: number;
  cardType: EnumCardType;
  dropProvided: DroppableProvided;
}

export const Headings: FC<IHeadings> = ({
  columnId,
  cardType,
  dropProvided,
}) => {
  const dispatch = useDispatch();

  const editableHeadingId = useSelector(getEditableHeadingId);
  const headingPositions = useParamSelector(getHeadingPositionsByColumnId, columnId);

  const handleAddHeading = () => {
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
        mode={EnumHeadingMode.Normal}
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
