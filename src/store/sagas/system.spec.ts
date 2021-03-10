import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { watchSystem } from '@store/sagas/system';
import { SystemActions } from '@store/actions';
import { EnumLanguage } from '@type/entities';
import i18n from '@/i18n';
import { storage } from '@plugins/storage';
import { LANGUAGE_CODES } from '@/constants';

describe('System saga flow', () => {
  it('set language', () => {
    const mockData = EnumLanguage.French;

    return expectSaga(watchSystem)
      .provide([
        [matchers.apply.fn(storage.setLanguage), {
          data: mockData,
        }],
      ])
      .dispatch(SystemActions.setLanguage(mockData))
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
      .dispatch(SystemActions.fetchLanguage())
      .put(SystemActions.setLanguage(mockData))
      .silentRun();
  });
});
