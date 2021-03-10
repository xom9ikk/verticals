import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { watchAuth } from '@store/sagas/auth';
import { AuthActions } from '@store/actions';
import { useAlert } from '@use/alert';
import { AuthService } from '@services/auth';
import { redirectTo } from '@router/history';

// @ts-ignore
const authService = new AuthService();
const { show, ALERT_TYPES } = useAlert();
jest.mock('@/i18n', () => ({
  t: (v: string) => v,
}));

describe('Auth saga', () => {
  it('sign in', () => {
    const actionPayload = {
      email: 'email@test.com',
      password: 'password123',
    };

    const mockData = {
      token: 'Token',
      refreshToken: 'refresh',
    };

    return expectSaga(watchAuth, authService)
      .provide([
        [matchers.apply.fn(authService.signIn), {
          data: mockData,
        }],
      ])
      .dispatch(AuthActions.signIn(actionPayload))
      .apply(authService, authService.signIn, [actionPayload])
      .put(AuthActions.setAuthInfo(mockData))
      .call(show, 'Success', 'Successful login', ALERT_TYPES.SUCCESS)
      .call(redirectTo, '/')
      .silentRun();
  });
});
