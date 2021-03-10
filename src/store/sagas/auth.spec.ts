import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { useAlert } from '@use/alert';
import { redirectTo } from '@router/history';
import { storage } from '@plugins/storage';
import { watchAuth } from '@store/sagas/auth';
import { AuthActions } from '@store/actions';
import { AuthService } from '@services/auth';

// @ts-ignore
const authService = new AuthService();
const { show, ALERT_TYPES } = useAlert();
jest.mock('@/i18n', () => ({
  t: (v: string) => v,
}));

describe('Auth saga flow', () => {
  it('sign up', () => {
    const actionPayload = {
      name: 'John',
      surname: 'Doe',
      username: 'john.doe',
      email: 'email@test.com',
      password: 'password123',
    };

    const mockData = {
      token: 'token',
      refreshToken: 'refresh-token',
    };

    return expectSaga(watchAuth, authService)
      .provide([
        [matchers.apply.fn(authService.signUp), {
          data: mockData,
        }],
      ])
      .dispatch(AuthActions.signUp(actionPayload))
      .apply(authService, authService.signUp, [actionPayload])
      .put(AuthActions.setAuthInfo(mockData))
      .call(show, 'Success', 'Registration completed successfully', ALERT_TYPES.SUCCESS)
      .call(redirectTo, '/')
      .silentRun();
  });
  it('sign in', () => {
    const actionPayload = {
      email: 'email@test.com',
      password: 'password123',
    };

    const mockData = {
      token: 'token',
      refreshToken: 'refresh-token',
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
  it('set auth info', () => {
    const actionPayload = {
      token: 'token',
      refreshToken: 'refresh-token',
    };

    return expectSaga(watchAuth, authService)
      .dispatch(AuthActions.setAuthInfo(actionPayload))
      .call(storage.setToken, actionPayload.token)
      .call(storage.setRefreshToken, actionPayload.refreshToken)
      .silentRun();
  });
  it('logout', () => expectSaga(watchAuth, authService)
    .provide([
      [matchers.apply.fn(authService.logout), undefined],
    ])
    .dispatch(AuthActions.logout())
    .apply(authService, authService.logout, [])
    .call(show, 'Success', 'Successful logout', ALERT_TYPES.SUCCESS)
    .put(AuthActions.setAuthInfo({
      token: '',
      refreshToken: '',
    }))
    .call(redirectTo, '/')
    .silentRun());
  it('reset password', () => {
    const actionPayload = {
      email: 'email@test.com',
      password: 'password123',
    };

    return expectSaga(watchAuth, authService)
      .provide([
        [matchers.apply.fn(authService.reset), undefined],
      ])
      .dispatch(AuthActions.reset(actionPayload))
      .apply(authService, authService.reset, [actionPayload])
      .call(show, 'Success', 'Successful reset password', ALERT_TYPES.SUCCESS)
      .call(redirectTo, '/auth/login')
      .silentRun();
  });
  it('change password', () => {
    const actionPayload = {
      oldPassword: 'password123',
      newPassword: 'new-password123',
    };

    return expectSaga(watchAuth, authService)
      .provide([
        [matchers.apply.fn(authService.change), undefined],
      ])
      .dispatch(AuthActions.changePassword(actionPayload))
      .apply(authService, authService.change, [actionPayload])
      .call(show, 'Success', 'Successful change password', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
});
