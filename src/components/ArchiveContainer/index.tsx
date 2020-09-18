import React, { FC, useState } from 'react';
import {
  EnumColors, EnumTodoStatus, EnumTodoType, ITodos,
} from '@/types';
import { Card } from '@comp/Card';

interface IArchiveContainer {
  archivedTodos?: ITodos;
  cardType: EnumTodoType;
  isActiveQuery: boolean;
  onExitFromEditable: (
    id: number,
    title?: string,
    description?: string,
    status?: EnumTodoStatus,
    color?: EnumColors) => void;
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
                        isArchive={todo.isArchive}
                        invertColor
                        onExitFromEditable={
                          (newTitle, newDescription,
                            newStatus, newColor) => onExitFromEditable(
                            todo.id, newTitle, newDescription, newStatus, newColor,
                          )
                        }
                      />
                    )
                  )
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
