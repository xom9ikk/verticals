import { createSelector } from '@reduxjs/toolkit';

import { TRASH_COLUMN_ID } from '@/constants';
import i18n from '@/i18n';
import { IRootState } from '@store/reducers';
import { getHeadings } from '@store/selectors/headings';
import { getTodos } from '@store/selectors/todos';

export const getColumns = (state: IRootState) => state.columns;
export const getColumnPositionsByBoardId = (
  boardId: number | null,
) => (state: IRootState) => {
  if (boardId === null) return [];
  const positions = state.columns.positions[boardId];
  if (!positions) return [];
  return positions;
};
export const getColumnById = (columnId: number) => createSelector(
  [getColumns],
  (columns) => {
    const extraColumns = [{
      id: TRASH_COLUMN_ID,
      title: i18n.t('Deleted cards'),
      description: i18n.t('Restore deleted cards'),
    }];

    return [
      ...extraColumns,
      ...columns.entities,
    ].find((column) => column.id === columnId) || {};
  },
);
export const getWidthByHeadingId = (headingId: number) => createSelector(
  [getColumns, getHeadings],
  (columns, headings) => {
    const targetHeading = headings.entities.find((heading) => heading.id === headingId);
    const targetColumn = columns.entities.find((column) => column.id === targetHeading?.columnId);
    return targetColumn?.width ?? null;
  },
);
export const getWidthByTodoId = (todoId: number) => createSelector(
  [getColumns, getHeadings, getTodos],
  (columns, headings, todos) => {
    const targetTodo = todos.entities.find((todo) => todo.id === todoId);
    const targetHeading = headings.entities.find((heading) => heading.id === targetTodo?.headingId);
    const targetColumn = columns.entities.find((column) => column.id === targetHeading?.columnId);
    return targetColumn?.width ?? null;
  },
);
