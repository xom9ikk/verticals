import React, { FC, useState } from 'react';
import {
  EnumTodoType,
} from '@type/entities';
import { Card } from '@comp/Card';
import { useSelector } from 'react-redux';
import {
  getActiveTodoId,
  getArchivedTodoPositionsByColumnId,
  getEditableCardId,
} from '@store/selectors';
import { Divider } from '@comp/Divider';
import { useTranslation } from 'react-i18next';
import { useParamSelector } from '@use/paramSelector';

interface IArchiveContainer {
  columnId: number;
  cardType: EnumTodoType;
}

export const ArchiveContainer: FC<IArchiveContainer> = ({
  columnId,
  cardType,
}) => {
  const { t } = useTranslation();

  const activeTodoId = useSelector(getActiveTodoId);
  const editableCardId = useSelector(getEditableCardId);
  const archivedTodoPositions = useParamSelector(getArchivedTodoPositionsByColumnId, columnId);

  const [isOpenArchived, setIsOpenArchived] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpenArchived((prev) => !prev);
  };

  return archivedTodoPositions.length > 0 ? (
    <div className="archive-container">
      <div
        className="archive-container__title"
        onClick={handleClick}
      >
        <img src={`/assets/svg/menu/archive${isOpenArchived ? '' : '-close'}.svg`} alt="archive" />
        {t('{{count}} cards archived', { count: archivedTodoPositions.length })}
      </div>
      {
      isOpenArchived && (
      <div className="archive-container__inner">
        <Divider verticalSpacer={0} horizontalSpacer={0} style={{ marginBottom: 10 }} />
        {
          archivedTodoPositions?.map((id) => (
            <Card
              key={id}
              todoId={id}
              cardType={cardType}
              isActive={id === activeTodoId}
              isEditable={id === editableCardId}
              invertColor
            />
          ))
        }
      </div>
      )
    }
    </div>
  ) : null;
};
