import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { Action } from 'redux-actions';
import { useAlert } from '@/use/alert';
import { container } from '@/inversify/config';
import { TYPES } from '@/inversify/types';
import { IServices } from '@/inversify/interfaces';
import {
  BoardsActions, ColumnsActions, SearchActions, SystemActions, TodosActions,
} from '@/store/actions';
import { ISearchByTodoTitleRequest } from '@/types/api';

const { searchService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* searchByTodoTitleWorker(action: Action<ISearchByTodoTitleRequest>) {
  try {
    const response = yield* apply(searchService, searchService.searchByTodoTitle, [action.payload]);
    const { todos, columns, boards } = response.data;
    yield put(BoardsActions.setAll(boards));
    yield put(ColumnsActions.setAll(columns));
    yield put(TodosActions.setAll(todos));
    yield put(SystemActions.setIsSearchMode(true));
  } catch (error) {
    yield call(show, 'Search', error, ALERT_TYPES.DANGER);
  }
}

export function* watchSearch() {
  yield* all([
    takeLatest(SearchActions.Type.SEARCH_BY_TODO_TITLE, searchByTodoTitleWorker),
  ]);
}
