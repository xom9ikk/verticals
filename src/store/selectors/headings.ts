import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '@store/reducers';
import { EnumHeadingType } from '@type/entities';
import { getTodosEntities } from '@store/selectors/todos';

export const getHeadings = (state: IRootState) => state.headings;
export const getHeadingPositionsByColumnId = (
  columnId: number | null,
) => (state: IRootState) => {
  if (columnId === null) return [];
  const positions = state.headings.positions[columnId];
  if (!positions) return [];
  return positions;
};
export const getDefaultHeadingIdByColumnId = (
  columnId: number | null,
) => createSelector(
  [getHeadings],
  (headings) => {
    const targetHeading = headings.entities
      .find((heading) => heading.columnId === columnId && heading.type === EnumHeadingType.Default);
    return targetHeading?.id;
  },
);
export const getArchivedHeadingIdByColumnId = (
  columnId: number | null,
) => createSelector(
  [getHeadings],
  (headings) => {
    const targetHeading = headings.entities
      .find((heading) => heading.columnId === columnId && heading.type === EnumHeadingType.Archived);
    return targetHeading?.id;
  },
);

export const getHeadingById = (headingId: number) => createSelector(
  [getHeadings],
  (headings) => headings.entities.find((heading) => heading.id === headingId) || {},
);

export const getHeadingByTodoId = (todoId: number) => createSelector(
  [getHeadings, getTodosEntities],
  (headings, todos) => {
    const targetTodo = todos.find((todo) => todo.id === todoId);
    return headings.entities.find((heading) => heading.id === targetTodo?.headingId) || {};
  },
);
