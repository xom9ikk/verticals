import { IRootState } from '@/store/reducers/state';
import { createSelector } from 'reselect';
import { getActiveBoardId } from '@/store/selectors/system';
import { getTodos } from '@/store/selectors/todos';
import { ColumnsMap } from '@/types/entities';

export const getColumns = (state: IRootState) => state.columns;
export const getColumnsMap = createSelector(
  [getColumns, getTodos, getActiveBoardId],
  (columns, todos, activeBoardId) => {
    const columnsMap: ColumnsMap = {};
    const orderedId: Array<number> = [];
    columns
        ?.filter((column) => column.boardId === activeBoardId)
        ?.sort((a, b) => a.position - b.position)
        ?.forEach((column) => {
          columnsMap[`column-${column.id}`] = {
            ...column,
            todos: todos.filter((todo) => todo.columnId === column.id),
          };
          orderedId.push(column.id);
        });
    console.log('===columnsMap', columnsMap);
    console.log('===orderedId', orderedId);
    return { columnsMap, orderedId };
  },
);
