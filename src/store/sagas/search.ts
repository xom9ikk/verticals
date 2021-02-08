import {
  all, apply, call, put, takeLatest,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAlert } from '@use/alert';
import { container } from '@inversify/config';
import { TYPES } from '@inversify/types';
import { IServices } from '@inversify/interfaces';
import {
  BoardsActions, ColumnsActions, SearchActions, SystemActions, TodosActions,
} from '@store/actions';
import { ISearchByTodoTitle } from '@type/actions';

const { searchService } = container.get<IServices>(TYPES.Services);
const { show, ALERT_TYPES } = useAlert();

function* searchByTodoTitleWorker(action: PayloadAction<ISearchByTodoTitle>) {
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
    takeLatest(SearchActions.searchByTodoTitle, searchByTodoTitleWorker),
  ]);
}
