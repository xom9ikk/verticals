import React, { FC, useState } from 'react';
import { EnumHeadingType, EnumCardType } from '@type/entities';
import { getArchivedHeadingIdByColumnId, getTodoPositionsByHeadingId } from '@store/selectors';
import { Divider } from '@comp/Divider';
import { useTranslation } from 'react-i18next';
import { useParamSelector } from '@use/paramSelector';
import { CardsContainer } from '@comp/CardsContainer';
import { EnumHeadingMode } from '@comp/Heading';
import { Droppable } from 'react-beautiful-dnd';
import cn from 'classnames';

interface IArchiveContainer {
  columnId: number;
  cardType: EnumCardType;
}

export const ArchiveContainer: FC<IArchiveContainer> = ({
  columnId,
  cardType,
}) => {
  const { t } = useTranslation();

  const headingId = useParamSelector(getArchivedHeadingIdByColumnId, columnId);
  const todoPositions = useParamSelector(getTodoPositionsByHeadingId, headingId);

  const [isOpenArchived, setIsOpenArchived] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpenArchived((prev) => !prev);
  };

  return todoPositions.length > 0 ? (
    <Droppable
      droppableId={`heading-${headingId}`}
      type="CARD"
    >
      {
        (dropProvided, dropSnapshot) => (
          <div ref={dropProvided.innerRef}>
            <div
              className={cn('archive-container', {
                'archive-container--dragging-over': dropSnapshot.isDraggingOver,
              })}
            >
              <div
                className="archive-container__title"
                onClick={handleClick}
              >
                <img src={`/assets/svg/menu/archive${isOpenArchived ? '' : '-close'}.svg`} alt="archive" />
                {t('{{count}} cards archived', { count: todoPositions.length })}
              </div>
              {
                  isOpenArchived && (
                  <div className="archive-container__inner">
                    <Divider verticalSpacer={0} horizontalSpacer={0} style={{ marginBottom: 10 }} />
                    <CardsContainer
                      headingId={headingId!}
                      cardType={cardType}
                      mode={EnumHeadingMode.Normal}
                      type={EnumHeadingType.Archived}
                      isOpenNewCard={false}
                      dropSnapshot={dropSnapshot}
                    />
                    {dropSnapshot.isDraggingOver && <div style={{ height: 38 }} />}
                  </div>
                  )
                }
            </div>
          </div>
        )
      }
    </Droppable>

  ) : null;
};
