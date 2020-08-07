import React, { FC, useState } from 'react';
import { EnumTodoStatus, EnumTodoType, ITodos } from '../../types';
import { Card } from '../Card';

interface IArchiveContainer {
  archivedTodos?: ITodos;
  cardType: EnumTodoType;
  isActiveQuery: boolean;
  onExitFromEditable: (
    id: string,
    title?: string,
    description?: string,
    status?: EnumTodoStatus,
    color?: number) => void;
}

export const ArchiveContainer: FC<IArchiveContainer> = ({
  archivedTodos,
  cardType,
  onExitFromEditable,
}) => {
  const [isOpenArchived, setIsOpenArchived] = useState<boolean>(false);
  return (
    <>
      {
          archivedTodos && archivedTodos?.length > 0 && (
            <div
              className="archive-container"
            >
              <div
                className="archive-container__title"
                onClick={() => setIsOpenArchived((prev) => !prev)}
              >
                <img src={`/svg/menu/${isOpenArchived ? 'archive' : 'archive-close'}.svg`} alt="archive" />
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
                              isArchive={todo.isArchive}
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
