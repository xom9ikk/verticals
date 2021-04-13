import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { useAlert } from '@use/alert';
import { redirectTo } from '@router/history';
import { storage } from '@plugins/storage';
import { watchAuth } from '@store/sagas/auth';
import { AuthActions, SystemActions } from '@store/actions';
import { AuthService } from '@services/auth';

// @ts-ignore
const authService = new AuthService();
const { show, ALERT_TYPES } = useAlert();

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
      .dispatch(AuthActions.effect.signUp(actionPayload))
      .apply(authService, authService.signUp, [actionPayload])
      .put(AuthActions.effect.setAuthInfo(mockData))
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
      .dispatch(AuthActions.effect.signIn(actionPayload))
      .apply(authService, authService.signIn, [actionPayload])
      .put(AuthActions.effect.setAuthInfo(mockData))
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
      .provide([
        [matchers.apply.fn(storage.setToken), undefined],
        [matchers.apply.fn(storage.setRefreshToken), undefined],
      ])
      .dispatch(AuthActions.effect.setAuthInfo(actionPayload))
      .call(storage.setToken, actionPayload.token)
      .call(storage.setRefreshToken, actionPayload.refreshToken)
      .silentRun();
  });
  it('logout', () => expectSaga(watchAuth, authService)
    .provide([
      [matchers.apply.fn(authService.logout), undefined],
    ])
    .dispatch(AuthActions.effect.logout())
    .apply(authService, authService.logout, [])
    .call(show, 'Success', 'Successful logout', ALERT_TYPES.SUCCESS)
    .put(AuthActions.effect.setAuthInfo({
      token: '',
      refreshToken: '',
    }))
    .put(SystemActions.setActiveBoardId(null))
    .call(redirectTo, '/auth/login')
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
      .dispatch(AuthActions.effect.reset(actionPayload))
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
      .dispatch(AuthActions.effect.changePassword(actionPayload))
      .apply(authService, authService.change, [actionPayload])
      .call(show, 'Success', 'Successful change password', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
});
