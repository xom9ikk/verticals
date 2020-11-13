import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify/config';
import { TYPES } from '@/inversify/types';
import { IServices } from '@/inversify/interfaces';
import { UserActions } from '@/store/actions';
import { Action } from 'redux-actions';
import { IUpdateUserRequest, IUploadUserAvatarRequest } from '@/types/api';

const { userService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* fetchMeWorker() {
  try {
    const response = yield* apply(userService, userService.getMe, []);
    const { data } = response;
    yield put(UserActions.setUserData(data));
  } catch (error) {
    yield call(show, 'User', error, ALERT_TYPES.DANGER);
  }
}

function* updateUsernameWorker(action: Action<IUpdateUserRequest>) {
  try {
    yield* apply(userService, userService.update, [action.payload]);
    yield put(UserActions.setUsername(action.payload.username!));
    yield call(show, 'User', 'Username updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'User', error, ALERT_TYPES.DANGER);
  }
}

function* updateEmailWorker(action: Action<IUpdateUserRequest>) {
  try {
    yield* apply(userService, userService.update, [action.payload]);
    yield put(UserActions.setEmail(action.payload.email!));
    yield call(show, 'User', 'Email updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'User', error, ALERT_TYPES.DANGER);
  }
}

function* updatePersonalDataWorker(action: Action<IUpdateUserRequest>) {
  try {
    yield* apply(userService, userService.update, [action.payload]);
    const { name, surname, bio } = action.payload;
    yield put(UserActions.setPersonalData({
      name: name!,
      surname: surname!,
      bio: bio!,
    }));
    yield call(
      show, 'User', 'Personal data updated successfully', ALERT_TYPES.SUCCESS,
    );
  } catch (error) {
    yield call(show, 'User', error, ALERT_TYPES.DANGER);
  }
}

function* uploadAvatarWorker(action: Action<IUploadUserAvatarRequest>) {
  try {
    const response = yield* apply(userService, userService.uploadAvatar, [action.payload]);
    const { avatar } = response.data;
    yield put(UserActions.setAvatar(avatar));
    yield call(
      show, 'User', 'Avatar successfully uploaded', ALERT_TYPES.SUCCESS,
    );
  } catch (error) {
    yield call(show, 'User', error, ALERT_TYPES.DANGER);
  }
}

function* removeAvatarWorker() {
  try {
    yield* apply(userService, userService.removeAvatar, []);
    yield call(
      show, 'User', 'Avatar removed successfully', ALERT_TYPES.SUCCESS,
    );
    yield put(UserActions.setAvatar(null));
  } catch (error) {
    yield call(show, 'User', error, ALERT_TYPES.DANGER);
  }
}

export function* watchUser() {
  yield* all([
    takeLatest(UserActions.Type.FETCH_ME, fetchMeWorker),
    takeLatest(UserActions.Type.UPDATE_USERNAME, updateUsernameWorker),
    takeLatest(UserActions.Type.UPDATE_EMAIL, updateEmailWorker),
    takeLatest(UserActions.Type.UPDATE_PERSONAL_DATA, updatePersonalDataWorker),
    takeLatest(UserActions.Type.UPLOAD_AVATAR, uploadAvatarWorker),
    takeLatest(UserActions.Type.REMOVE_AVATAR, removeAvatarWorker),
  ]);
}
