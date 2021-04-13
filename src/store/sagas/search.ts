import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';

import i18n from '@/i18n';
import { ISearchService } from '@inversify/interfaces/services';
import {
  BoardsActions, ColumnsActions, HeadingsActions, SearchActions, SystemActions, TodosActions,
} from '@store/actions';
import { ISearchByTodoTitle } from '@type/actions';
import { useAlert } from '@use/alert';

const { show, ALERT_TYPES } = useAlert();

function* searchByTodoTitleWorker(searchService: ISearchService, action: PayloadAction<ISearchByTodoTitle>) {
  try {
    const response = yield* apply(searchService, searchService.searchByTodoTitle, [action.payload]);
    const {
      todos, headings, columns, boards,
    } = response.data;
    yield put(BoardsActions.setAll(boards));
    yield put(ColumnsActions.setAll(columns));
    yield put(HeadingsActions.setAll(headings));
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
