import { UserActions } from '@store/actions';
import { UserReducer, initialState } from '@store/reducers/user';

const userData = {
  email: 'email@gmail.com',
  name: 'John',
  surname: 'Doe',
  username: 'john.doe',
  bio: 'Some strings about me',
  avatar: '/path/to/avatar',
};

describe('User reducer', () => {
  it('set all', () => {
    expect(UserReducer(initialState, UserActions.setUserData(userData))).toEqual(userData);
  });
  it('set username', () => {
    const initialStateWithUserData = {
      email: 'email@gmail.com',
      name: 'John',
      surname: 'Doe',
      username: 'john.doe',
      bio: 'Some strings about me',
      avatar: '/path/to/avatar',
    };
    expect(UserReducer(initialStateWithUserData, UserActions.setUsername('new.username'))).toEqual({
      ...userData,
      username: 'new.username',
    });
  });
  it('set email', () => {
    const initialStateWithUserData = userData;
    expect(UserReducer(initialStateWithUserData, UserActions.setEmail('new.email@gmail.com'))).toEqual({
      ...initialStateWithUserData,
      email: 'new.email@gmail.com',
    });
  });
  it('set personal data', () => {
    const initialStateWithUserData = userData;
    expect(UserReducer(initialStateWithUserData, UserActions.setPersonalData({
      name: 'Sam',
      surname: 'Smith',
      bio: 'I am Sam',
    }))).toEqual({
      ...initialStateWithUserData,
      name: 'Sam',
      surname: 'Smith',
      bio: 'I am Sam',
    });
  });
  it('set avatar', () => {
    const initialStateWithUserData = userData;
    expect(UserReducer(initialStateWithUserData, UserActions.setAvatar('/new/path/to/avatar'))).toEqual({
      ...initialStateWithUserData,
      avatar: '/new/path/to/avatar',
    });
  });
});
