import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import {
  BoardsActions, ColumnsActions, SearchActions, SystemActions, TodosActions,
} from '@store/actions';
import { SearchService } from '@services/search';
import { watchSearch } from '@store/sagas/search';
import { EnumColors, EnumTodoStatus, EnumTodoType } from '@type/entities';

// @ts-ignore
const searchService = new SearchService();

const mockBoard = {
  id: 11,
  title: 'Title',
  icon: 'path/to/icon',
  cardType: EnumTodoType.Checkboxes,
  description: 'Description for board',
  color: EnumColors.Green,
};

const mockColumn = {
  id: 111,
  boardId: 11,
  title: 'Column Title',
  description: 'Description for column',
  color: EnumColors.Green,
  isCollapsed: true,
  width: 378,
};

const mockTodo = {
  id: 222,
  headingId: 111,
  title: 'Todo Title',
  description: 'Description for todo',
  status: EnumTodoStatus.Done,
  color: EnumColors.Green,
  isArchived: true,
  isRemoved: false,
  isNotificationsEnabled: true,
  expirationDate: new Date(),
};

describe('Search saga flow', () => {
  it('search by todo title', () => {
    const mockData = {
      boards: {
        entities: [mockBoard],
        positions: [mockBoard.id],
      },
      columns: {
        entities: [mockColumn],
        positions: {
          [mockColumn.boardId]: [mockColumn.id],
        },
      },
      todos: {
        entities: [{
          ...mockTodo,
          commentsCount: 3,
          attachmentsCount: 1,
          imagesCount: 0,
        }],
        positions: {
          [mockTodo.headingId]: [mockTodo.id],
        },
      },
    };

    const payload = {
      query: 'todo-title-to-find',
    };

    return expectSaga(watchSearch, searchService)
      .provide([
        [matchers.apply.fn(searchService.searchByTodoTitle), {
          data: mockData,
        }],
      ])
      .dispatch(SearchActions.effect.searchByTodoTitle(payload))
      .apply(searchService, searchService.searchByTodoTitle, [payload])
      .put(BoardsActions.setAll(mockData.boards))
      .put(ColumnsActions.setAll(mockData.columns))
      .put(TodosActions.setAll(mockData.todos))
      .put(SystemActions.setIsSearchMode(true))
      .silentRun();
  });
});
