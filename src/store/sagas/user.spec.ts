import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { useAlert } from '@use/alert';
import { watchUser } from '@store/sagas/user';
import { UserActions } from '@store/actions';
import { UserService } from '@services/user';

// @ts-ignore
const userService = new UserService();
const { show, ALERT_TYPES } = useAlert();
jest.mock('@/i18n', () => ({
  t: (v: string) => v,
}));

describe('User saga flow', () => {
  it('fetch me', () => {
    const mockData = {
      email: 'email@gmail.com',
      name: 'John',
      surname: 'Doe',
      username: 'john.doe',
      bio: 'Some words about me',
      avatar: '/path/to/avatar',
    };

    return expectSaga(watchUser, userService)
      .provide([
        [matchers.apply.fn(userService.getMe), {
          data: mockData,
        }],
      ])
      .dispatch(UserActions.fetchMe())
      .apply(userService, userService.getMe, [])
      .put(UserActions.setUserData(mockData))
      .silentRun();
  });
  it('update username', () => {
    const username = 'new.john.doe';
    const mockData = {
      username,
    };

    return expectSaga(watchUser, userService)
      .provide([
        [matchers.apply.fn(userService.update), undefined],
      ])
      .dispatch(UserActions.updateUsername(username))
      .apply(userService, userService.update, [mockData])
      .put(UserActions.setUsername(username))
      .call(show, 'User', 'Username updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('update email', () => {
    const email = 'new.john.doe';
    const mockData = {
      email,
    };

    return expectSaga(watchUser, userService)
      .provide([
        [matchers.apply.fn(userService.update), undefined],
      ])
      .dispatch(UserActions.updateEmail(email))
      .apply(userService, userService.update, [mockData])
      .put(UserActions.setEmail(email))
      .call(show, 'User', 'Email updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('update personal data', () => {
    const mockData = {
      name: 'John',
      surname: 'Doe',
      bio: 'Some words about me',
    };

    return expectSaga(watchUser, userService)
      .provide([
        [matchers.apply.fn(userService.update), undefined],
      ])
      .dispatch(UserActions.updatePersonalData(mockData))
      .apply(userService, userService.update, [mockData])
      .put(UserActions.setPersonalData(mockData))
      .call(show, 'User', 'Personal data updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('upload avatar', () => {
    const payload = 'payload-avatar-data';

    return expectSaga(watchUser, userService)
      .provide([
        [matchers.apply.fn(userService.uploadAvatar), {
          data: {
            avatar: payload,
          },
        }],
      ])
      .dispatch(UserActions.uploadAvatar(payload))
      // .apply(userService, userService.uploadAvatar, [{}])
      .put(UserActions.setAvatar(payload))
      .call(show, 'User', 'Avatar successfully uploaded', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('remove avatar', () => expectSaga(watchUser, userService)
    .provide([
      [matchers.apply.fn(userService.removeAvatar), undefined],
    ])
    .dispatch(UserActions.removeAvatar())
    .apply(userService, userService.removeAvatar, [])
    .put(UserActions.setAvatar(null))
    .call(show, 'User', 'Avatar removed successfully', ALERT_TYPES.SUCCESS)
    .silentRun());
});