import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { useAlert } from '@use/alert';
import { ColumnsActions, SystemActions } from '@store/actions';
import { ColumnService } from '@services/column';
import { EnumColors } from '@type/entities';
import { watchColumn } from '@store/sagas/column';

// @ts-ignore
const columnService = new ColumnService();
const { show, ALERT_TYPES } = useAlert();

const mockColumn = {
  id: 1,
  boardId: 11,
  title: 'Column Title',
  description: 'Description for column',
  color: EnumColors.Green,
  isCollapsed: true,
  width: 378,
};

describe('Column saga flow', () => {
  it('fetch by board id', () => {
    const mockData = {
      columns: {
        entities: [mockColumn],
        positions: {
          [mockColumn.boardId]: [mockColumn.id],
        },
      },
    };
    const payload = {
      boardId: mockColumn.boardId,
    };

    return expectSaga(watchColumn, columnService)
      .provide([
        [matchers.apply.fn(columnService.getByBoardId), {
          data: mockData,
        }],
      ])
      .dispatch(ColumnsActions.effect.fetchByBoardId(payload))
      .apply(columnService, columnService.getByBoardId, [payload])
      .put(ColumnsActions.setAll(mockData.columns))
      .put(SystemActions.setIsLoadedColumns(true))
      .silentRun();
  });
  it('create', () => {
    const mockData = {
      columnId: mockColumn.id,
      position: 7,
    };

    return expectSaga(watchColumn, columnService)
      .provide([
        [matchers.apply.fn(columnService.create), {
          data: mockData,
        }],
      ])
      .dispatch(ColumnsActions.effect.create(mockColumn))
      .apply(columnService, columnService.create, [mockColumn])
      .put(ColumnsActions.add({
        ...mockColumn,
        id: mockData.columnId,
      }))
      .call(show, 'Column', 'Column created successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('create with below id', () => {
    const mockData = {
      columnId: mockColumn.id,
      position: 7,
    };

    const payload = {
      ...mockColumn,
      belowId: 77,
    };

    return expectSaga(watchColumn, columnService)
      .provide([
        [matchers.apply.fn(columnService.create), {
          data: mockData,
        }],
      ])
      .dispatch(ColumnsActions.effect.create(payload))
      .apply(columnService, columnService.create, [payload])
      .put(ColumnsActions.removeTemp())
      .put(ColumnsActions.insertInPosition({
        entity: {
          ...mockColumn,
          id: mockData.columnId,
        },
        position: mockData.position,
      }))
      .call(show, 'Column', 'Column created successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('remove', () => {
    const payload = {
      id: 77,
    };

    return expectSaga(watchColumn, columnService)
      .provide([
        [matchers.apply.fn(columnService.remove), undefined],
      ])
      .dispatch(ColumnsActions.effect.remove(payload))
      .apply(columnService, columnService.remove, [payload])
      .put(ColumnsActions.remove(payload))
      .call(show, 'Column', 'Column removed successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('update', () => {
    const payload = {
      id: 77,
      title: 'New Title',
    };

    return expectSaga(watchColumn, columnService)
      .provide([
        [matchers.apply.fn(columnService.update), undefined],
      ])
      .dispatch(ColumnsActions.effect.update(payload))
      .apply(columnService, columnService.update, [payload])
      .put(ColumnsActions.updateEntity(payload))
      .call(show, 'Column', 'Column updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('move', () => {
    const payload = {
      boardId: 1,
      sourcePosition: 0,
      destinationPosition: 2,
    };

    return expectSaga(watchColumn, columnService)
      .provide([
        [matchers.apply.fn(columnService.updatePosition), undefined],
      ])
      .dispatch(ColumnsActions.effect.move(payload))
      .apply(columnService, columnService.updatePosition, [payload])
      .put(ColumnsActions.move(payload))
      .call(show, 'Column', 'Column position updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('duplicate', () => {
    const mockData = {
      data: {
        ...mockColumn,
        position: 2,
        columnId: 77,
        todos: {
          entities: [],
          positions: {},
        },
      },
    };
    const {
      columnId, todos, position, ...duplicatedColumn
    } = mockData.data;
    const payload = {
      columnId: mockColumn.id,
    };

    return expectSaga(watchColumn, columnService)
      .provide([
        [matchers.apply.fn(columnService.duplicate), mockData],
      ])
      .dispatch(ColumnsActions.effect.duplicate(payload))
      .apply(columnService, columnService.duplicate, [payload])
      .put(ColumnsActions.insertInPosition({
        entity: {
          ...duplicatedColumn,
          id: columnId,
        },
        position,
      }))
      .call(show, 'Column', 'Column duplicated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('reverse order', () => {
    const payload = {
      boardId: mockColumn.boardId,
    };

    return expectSaga(watchColumn, columnService)
      .provide([
        [matchers.apply.fn(columnService.reverseOrder), undefined],
      ])
      .dispatch(ColumnsActions.effect.reverseOrder(payload))
      .apply(columnService, columnService.reverseOrder, [payload])
      .put(ColumnsActions.reverseOrder(payload))
      .call(show, 'Column', 'Reverse successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
});
