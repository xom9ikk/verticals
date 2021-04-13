import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { LANGUAGE_CODES, NEW_TODO_ID } from '@/constants';
import i18n from '@/i18n';
import { storage } from '@plugins/storage';
import { SystemActions } from '@store/actions';
import { watchSystem } from '@store/sagas/system';
import { EnumHeadingType, EnumLanguage } from '@type/entities';

describe('System saga flow', () => {
  it('set language', () => {
    const mockData = EnumLanguage.French;

    return expectSaga(watchSystem)
      .provide([
        [matchers.apply.fn(storage.setLanguage), {
          data: mockData,
        }],
      ])
      .dispatch(SystemActions.effect.setLanguage(mockData))
      .apply(i18n, i18n.changeLanguage, [LANGUAGE_CODES[mockData]])
      .apply(storage, storage.setLanguage, [mockData])
      .silentRun();
  });
  it('fetch language', () => {
    const mockData = EnumLanguage.French;

    return expectSaga(watchSystem)
      .provide([
        [matchers.apply.fn(storage.getLanguage), mockData],
      ])
      .dispatch(SystemActions.effect.fetchLanguage())
      .put(SystemActions.setLanguage(mockData))
      .silentRun();
  });
  it('set editable card id by column id', () => {
    const columnId = 13;
    const headingId = 7;

    return expectSaga(watchSystem)
      .withState({
        headings: {
          entities: [{
            id: headingId,
            type: EnumHeadingType.Default,
            columnId,
          }],
        },
      })
      .dispatch(SystemActions.effect.setEditableCardIdByColumnId(columnId))
      .put(SystemActions.setEditableCardId(`${headingId}-${NEW_TODO_ID}`))
      .silentRun();
  });
});
