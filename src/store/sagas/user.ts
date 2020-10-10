import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { IServices } from '@/inversify.interfaces';
import { UserActions } from '@/store/actions';

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

export function* watchUser() {
  yield* all([
    takeLatest(UserActions.Type.FETCH_ME, fetchMeWorker),
  ]);
}
