import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@use/alert';
import {
  BoardsActions, ColumnsActions, SearchActions, SystemActions, TodosActions,
} from '@store/actions';
import { ISearchByTodoTitle } from '@type/actions';
import i18n from '@/i18n';
import { ISearchService } from '@inversify/interfaces/services';

const { show, ALERT_TYPES } = useAlert();

function* searchByTodoTitleWorker(searchService: ISearchService, action: PayloadAction<ISearchByTodoTitle>) {
  try {
    const response = yield* apply(searchService, searchService.searchByTodoTitle, [action.payload]);
    const { todos, columns, boards } = response.data;
    yield put(BoardsActions.setAll(boards));
    yield put(ColumnsActions.setAll(columns));
    yield put(TodosActions.setAll(todos));
    yield put(SystemActions.setIsSearchMode(true));
  } catch (error) {
    yield call(show, i18n.t('Search'), error, ALERT_TYPES.DANGER);
  }
}

export function* watchSearch(searchService: ISearchService) {
  yield all([
    takeLatest(SearchActions.effect.searchByTodoTitle, searchByTodoTitleWorker, searchService),
  ]);
}
