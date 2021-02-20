import React, { FC, useState } from 'react';
import {
  EnumTodoType, ITodo,
} from '@type/entities';
import { Card } from '@comp/Card';
import { useSelector } from 'react-redux';
import { getActiveTodoId, getEditableCardId } from '@store/selectors';
import { Divider } from '@comp/Divider';

interface IArchiveContainer {
  archivedTodos?: Array<ITodo>;
  cardType: EnumTodoType;
}

export const ArchiveContainer: FC<IArchiveContainer> = ({
  archivedTodos,
  cardType,
}) => {
  const activeTodoId = useSelector(getActiveTodoId);
  const editableCardId = useSelector(getEditableCardId);

  const [isOpenArchived, setIsOpenArchived] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpenArchived((prev) => !prev);
  };

  return archivedTodos && archivedTodos?.length > 0 ? (
    <div className="archive-container">
      <div
        className="archive-container__title"
        onClick={handleClick}
      >
        <img src={`/assets/svg/menu/archive${isOpenArchived ? '' : '-close'}.svg`} alt="archive" />
        {archivedTodos.length}
        {' '}
        cards archived
      </div>
      {
      isOpenArchived && (
      <div className="archive-container__inner">
        <Divider verticalSpacer={0} horizontalSpacer={0} style={{ marginBottom: 10 }} />
        {
          archivedTodos?.map((todo) => (
            <Card
              key={todo.id}
              todoId={todo.id}
              columnId={todo.columnId}
              cardType={cardType}
              title={todo.title}
              description={todo.description}
              status={todo.status}
              color={todo.color}
              isArchived={todo.isArchived}
              isNotificationsEnabled={todo.isNotificationsEnabled}
              isRemoved={todo.isRemoved}
              expirationDate={todo.expirationDate}
              commentsCount={todo.commentsCount}
              imagesCount={todo.imagesCount}
              attachmentsCount={todo.attachmentsCount}
              isActive={todo.id === activeTodoId}
              isEditable={todo.id === editableCardId}
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
