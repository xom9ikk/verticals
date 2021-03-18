import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { useAlert } from '@use/alert';
import { HeadingsActions } from '@store/actions';
import { HeadingService } from '@services/heading';
import { EnumColors, EnumHeadingType } from '@type/entities';
import { watchHeading } from '@store/sagas/heading';

// @ts-ignore
const headingService = new HeadingService();
const { show, ALERT_TYPES } = useAlert();

const mockHeading = {
  id: 1,
  columnId: 11,
  title: 'Heading Title',
  description: 'Description for heading',
  type: EnumHeadingType.Custom,
  color: EnumColors.Green,
  isCollapsed: true,
};

describe('Heading saga flow', () => {
  it('fetch by board id', () => {
    const mockData = {
      headings: {
        entities: [mockHeading],
        positions: {
          [mockHeading.columnId]: [mockHeading.id],
        },
      },
    };
    const payload = {
      boardId: 77,
    };

    return expectSaga(watchHeading, headingService)
      .provide([
        [matchers.apply.fn(headingService.getByBoardId), {
          data: mockData,
        }],
      ])
      .dispatch(HeadingsActions.effect.fetchByBoardId(payload))
      .apply(headingService, headingService.getByBoardId, [payload])
      .put(HeadingsActions.setAll(mockData.headings))
      .silentRun();
  });
  it('create', () => {
    const mockData = {
      headingId: mockHeading.id,
      position: 7,
    };

    return expectSaga(watchHeading, headingService)
      .provide([
        [matchers.apply.fn(headingService.create), {
          data: mockData,
        }],
      ])
      .dispatch(HeadingsActions.effect.create(mockHeading))
      .apply(headingService, headingService.create, [mockHeading])
      .put(HeadingsActions.add({
        ...mockHeading,
        id: mockData.headingId,
      }))
      .call(show, 'Heading', 'Heading created successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('remove', () => {
    const payload = {
      id: 77,
    };

    return expectSaga(watchHeading, headingService)
      .provide([
        [matchers.apply.fn(headingService.remove), undefined],
      ])
      .dispatch(HeadingsActions.effect.remove(payload))
      .apply(headingService, headingService.remove, [payload])
      .put(HeadingsActions.remove(payload))
      .call(show, 'Heading', 'Heading removed successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('update', () => {
    const payload = {
      id: 77,
      title: 'New Title',
    };

    return expectSaga(watchHeading, headingService)
      .provide([
        [matchers.apply.fn(headingService.update), undefined],
      ])
      .dispatch(HeadingsActions.effect.update(payload))
      .apply(headingService, headingService.update, [payload])
      .put(HeadingsActions.updateEntity(payload))
      .call(show, 'Heading', 'Heading updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('move', () => {
    const payload = {
      columnId: 1,
      sourcePosition: 0,
      destinationPosition: 2,
    };

    return expectSaga(watchHeading, headingService)
      .provide([
        [matchers.apply.fn(headingService.updatePosition), undefined],
      ])
      .dispatch(HeadingsActions.effect.move(payload))
      .apply(headingService, headingService.updatePosition, [payload])
      .put(HeadingsActions.move(payload))
      .call(show, 'Heading', 'Heading position updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('duplicate', () => {
    const mockData = {
      data: {
        ...mockHeading,
        position: 2,
        headingId: 77,
      },
    };
    const {
      headingId, position, ...duplicatedHeading
    } = mockData.data;
    const payload = {
      headingId: mockHeading.id,
    };

    return expectSaga(watchHeading, headingService)
      .provide([
        [matchers.apply.fn(headingService.duplicate), mockData],
      ])
      .dispatch(HeadingsActions.effect.duplicate(payload))
      .apply(headingService, headingService.duplicate, [payload])
      .put(HeadingsActions.insertInPosition({
        entity: {
          ...duplicatedHeading,
          id: headingId,
        },
        position,
      }))
      .call(show, 'Heading', 'Heading duplicated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
});
