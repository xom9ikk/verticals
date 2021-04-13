import React, { FC } from 'react';
import { DroppableProvided } from 'react-beautiful-dnd';

import { ArchiveContainer } from '@comp/ArchiveContainer';
import { EnumColumnMode } from '@comp/Column';
import { DeletedCardsContainer } from '@comp/DeletedCardsContainer';
import { Headings } from '@comp/Headings';
import { EnumCardType } from '@type/entities';

interface IColumnContent {
  columnId: number;
  mode: EnumColumnMode;
  cardType: EnumCardType;
  dropProvided: DroppableProvided;
}

export const ColumnContent: FC<IColumnContent> = ({
  columnId,
  cardType,
  mode,
  dropProvided,
}) => (
  <>
    {mode === EnumColumnMode.Deleted ? (
      <DeletedCardsContainer />
    ) : (
      <Headings
        dropProvided={dropProvided}
        columnId={columnId}
        cardType={cardType}
      />
    )}
    <ArchiveContainer
      columnId={columnId}
      cardType={cardType}
    />
  </>
);
