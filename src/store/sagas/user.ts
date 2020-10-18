import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { IServices } from '@/inversify.interfaces';
import { UserActions } from '@/store/actions';
import { Action } from 'redux-actions';
import { IUpdateUserRequest } from '@/types/api';

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
    yield call(show, 'Column', 'Username updated successfully', ALERT_TYPES.SUCCESS);
  } catch (error) {
    yield call(show, 'User', error, ALERT_TYPES.DANGER);
  }
}

function* updateEmailWorker(action: Action<IUpdateUserRequest>) {
  try {
    yield* apply(userService, userService.update, [action.payload]);
    yield put(UserActions.setEmail(action.payload.email!));
    yield call(show, 'Column', 'Email updated successfully', ALERT_TYPES.SUCCESS);
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
      show, 'Column', 'Personal data updated successfully', ALERT_TYPES.SUCCESS,
    );
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
  ]);
}
