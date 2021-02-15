import React, { FC, useState } from 'react';
import {
  EnumTodoStatus, EnumTodoType, IColor, ITodo,
} from '@type/entities';
import { Card } from '@comp/Card';

interface IArchiveContainer {
  archivedTodos?: Array<ITodo>;
  cardType: EnumTodoType;
  onExitFromEditable: (
    id: number,
    title?: string,
    description?: string,
    status?: EnumTodoStatus,
    color?: IColor,
  ) => void;
}

export const ArchiveContainer: FC<IArchiveContainer> = ({
  archivedTodos,
  cardType,
  onExitFromEditable,
}) => {
  const [isOpenArchived, setIsOpenArchived] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpenArchived((prev) => !prev);
  };

  return (
    <>
      {
        archivedTodos && archivedTodos?.length > 0 && (
          <div
            className="archive-container"
          >
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
                <hr />
                {
                  archivedTodos
                    ?.map((todo) => (
                      <Card
                        cardType={cardType}
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                        status={todo.status}
                        color={todo.color}
                        isArchived={todo.isArchived}
                        commentsCount={todo.commentsCount}
                        imagesCount={todo.imagesCount}
                        attachmentsCount={todo.attachmentsCount}
                        invertColor
                        onExitFromEditable={
                          (newTitle, newDescription,
                            newStatus, newColor) => onExitFromEditable(
                            todo.id, newTitle, newDescription, newStatus, newColor,
                          )
                        }
                      />
                    ))
                }
              </div>
              )
            }
          </div>
        )
      }
    </>
  );
};
