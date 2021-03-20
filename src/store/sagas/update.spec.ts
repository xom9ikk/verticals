import { testSaga } from 'redux-saga-test-plan';

import {
  BoardsActions, ColumnsActions, CommentsActions, TodosActions,
} from '@store/actions';
import { UpdateService } from '@services/update';
import { subscribeOnEntity } from '@store/sagas/update';
import { EnumColors, EnumTodoStatus, EnumTodoType } from '@type/entities';
import { EnumOperations } from '@type/api';
import { getIsSearchMode } from '@store/selectors';

// @ts-ignore
const updateService = new UpdateService();

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
  attachmentsCount: 0,
  commentsCount: 0,
  imagesCount: 0,
};

const mockComment = {
  id: 1,
  userId: 11,
  todoId: 13,
  text: 'Comment text',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  replyCommentId: 77,
  likedUsers: [{
    name: 'John',
    surname: 'Doe',
    username: 'john.doe',
    avatar: '/path/to/john/avatar',
  }],
};

const mockBoardPositions = {
  order: [1, 2, 3, 4, 5],
};
const mockColumnPositions = {
  boardId: 77,
  order: [1, 2, 3, 4, 5],
};
const mockTodoPositions = {
  headingId: 77,
  order: [1, 2, 3, 4, 5],
};

describe('Update saga flow', () => {
  it('insert board', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onBoardsUpdate, {
      // @ts-ignore
      insert: BoardsActions.add,
    },
  )
    .next()
    .apply(updateService, updateService.onBoardsUpdate)
    .next({
      operation: EnumOperations.Insert,
      data: mockBoard,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(BoardsActions.add(mockBoard))
    .next()
    .apply(updateService, updateService.onBoardsUpdate)
    .next({
      operation: EnumOperations.Insert,
      data: mockBoard,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(BoardsActions.add(mockBoard))
    .finish()
    .next()
    .isDone());
  it('update board', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onBoardsUpdate, {
      // @ts-ignore
      update: BoardsActions.updateEntity,
    },
  )
    .next()
    .apply(updateService, updateService.onBoardsUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockBoard,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(BoardsActions.updateEntity(mockBoard))
    .next()
    .apply(updateService, updateService.onBoardsUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockBoard,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(BoardsActions.updateEntity(mockBoard))
    .finish()
    .next()
    .isDone());
  it('delete board', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onBoardsUpdate, {
      // @ts-ignore
      delete: BoardsActions.remove,
    },
  )
    .next()
    .apply(updateService, updateService.onBoardsUpdate)
    .next({
      operation: EnumOperations.Delete,
      data: mockBoard,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(BoardsActions.remove(mockBoard))
    .next()
    .apply(updateService, updateService.onBoardsUpdate)
    .next({
      operation: EnumOperations.Delete,
      data: mockBoard,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(BoardsActions.remove(mockBoard))
    .finish()
    .next()
    .isDone());
  it('insert column', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onColumnsUpdate, {
      // @ts-ignore
      insert: ColumnsActions.add,
    },
  )
    .next()
    .apply(updateService, updateService.onColumnsUpdate)
    .next({
      operation: EnumOperations.Insert,
      data: mockColumn,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(ColumnsActions.add(mockColumn))
    .next()
    .apply(updateService, updateService.onColumnsUpdate)
    .next({
      operation: EnumOperations.Insert,
      data: mockColumn,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(ColumnsActions.add(mockColumn))
    .finish()
    .next()
    .isDone());
  it('update column', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onColumnsUpdate, {
      // @ts-ignore
      update: ColumnsActions.updateEntity,
    },
  )
    .next()
    .apply(updateService, updateService.onColumnsUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockColumn,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(ColumnsActions.updateEntity(mockColumn))
    .next()
    .apply(updateService, updateService.onColumnsUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockColumn,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(ColumnsActions.updateEntity(mockColumn))
    .finish()
    .next()
    .isDone());
  it('delete column', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onColumnsUpdate, {
      // @ts-ignore
      delete: ColumnsActions.remove,
    },
  )
    .next()
    .apply(updateService, updateService.onColumnsUpdate)
    .next({
      operation: EnumOperations.Delete,
      data: mockColumn,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(ColumnsActions.remove(mockColumn))
    .next()
    .apply(updateService, updateService.onColumnsUpdate)
    .next({
      operation: EnumOperations.Delete,
      data: mockColumn,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(ColumnsActions.remove(mockColumn))
    .finish()
    .next()
    .isDone());
  it('insert todo', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onTodosUpdate, {
      // @ts-ignore
      insert: TodosActions.add,
    },
  )
    .next()
    .apply(updateService, updateService.onTodosUpdate)
    .next({
      operation: EnumOperations.Insert,
      data: mockTodo,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(TodosActions.add(mockTodo))
    .next()
    .apply(updateService, updateService.onTodosUpdate)
    .next({
      operation: EnumOperations.Insert,
      data: mockTodo,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(TodosActions.add(mockTodo))
    .finish()
    .next()
    .isDone());
  it('update todo', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onTodosUpdate, {
      // @ts-ignore
      update: TodosActions.updateEntity,
    },
  )
    .next()
    .apply(updateService, updateService.onTodosUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockTodo,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(TodosActions.updateEntity(mockTodo))
    .next()
    .apply(updateService, updateService.onTodosUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockTodo,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(TodosActions.updateEntity(mockTodo))
    .finish()
    .next()
    .isDone());
  it('delete todo', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onTodosUpdate, {
      // @ts-ignore
      delete: TodosActions.remove,
    },
  )
    .next()
    .apply(updateService, updateService.onTodosUpdate)
    .next({
      operation: EnumOperations.Delete,
      data: mockTodo,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(TodosActions.remove(mockTodo))
    .next()
    .apply(updateService, updateService.onTodosUpdate)
    .next({
      operation: EnumOperations.Delete,
      data: mockTodo,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(TodosActions.remove(mockTodo))
    .finish()
    .next()
    .isDone());
  it('update board positions', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onBoardPositionsUpdate, {
      // @ts-ignore
      update: (data) => BoardsActions.setPositions(data.order),
    },
  )
    .next()
    .apply(updateService, updateService.onBoardPositionsUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockBoardPositions,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(BoardsActions.setPositions(mockBoardPositions.order))
    .next()
    .apply(updateService, updateService.onBoardPositionsUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockBoardPositions,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(BoardsActions.setPositions(mockBoardPositions.order))
    .finish()
    .next()
    .isDone());
  it('insert column positions', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onColumnPositionsUpdate, {
      // @ts-ignore
      insert: (data) => ColumnsActions.setPositionsByBoardId({
        // @ts-ignore
        positions: data.order,
        // @ts-ignore
        boardId: data.boardId,
      }),
    },
  )
    .next()
    .apply(updateService, updateService.onColumnPositionsUpdate)
    .next({
      operation: EnumOperations.Insert,
      data: mockColumnPositions,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(ColumnsActions.setPositionsByBoardId({
      positions: mockColumnPositions.order,
      boardId: mockColumnPositions.boardId,
    }))
    .next()
    .apply(updateService, updateService.onColumnPositionsUpdate)
    .next({
      operation: EnumOperations.Insert,
      data: mockColumnPositions,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(ColumnsActions.setPositionsByBoardId({
      positions: mockColumnPositions.order,
      boardId: mockColumnPositions.boardId,
    }))
    .finish()
    .next()
    .isDone());
  it('update column positions', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onColumnPositionsUpdate, {
      // @ts-ignore
      update: (data) => ColumnsActions.setPositionsByBoardId({
        // @ts-ignore
        positions: data.order,
        // @ts-ignore
        boardId: data.boardId,
      }),
    },
  )
    .next()
    .apply(updateService, updateService.onColumnPositionsUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockColumnPositions,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(ColumnsActions.setPositionsByBoardId({
      positions: mockColumnPositions.order,
      boardId: mockColumnPositions.boardId,
    }))
    .next()
    .apply(updateService, updateService.onColumnPositionsUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockColumnPositions,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(ColumnsActions.setPositionsByBoardId({
      positions: mockColumnPositions.order,
      boardId: mockColumnPositions.boardId,
    }))
    .finish()
    .next()
    .isDone());
  it('insert todo positions', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onTodoPositionsUpdate, {
      // @ts-ignore
      insert: (data) => TodosActions.setPositionsByHeadingId({
        // @ts-ignore
        positions: data.order,
        // @ts-ignore
        headingId: data.headingId,
      }),
    },
  )
    .next()
    .apply(updateService, updateService.onTodoPositionsUpdate)
    .next({
      operation: EnumOperations.Insert,
      data: mockTodoPositions,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(TodosActions.setPositionsByHeadingId({
      positions: mockTodoPositions.order,
      headingId: mockTodoPositions.headingId,
    }))
    .next()
    .apply(updateService, updateService.onTodoPositionsUpdate)
    .next({
      operation: EnumOperations.Insert,
      data: mockTodoPositions,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(TodosActions.setPositionsByHeadingId({
      positions: mockTodoPositions.order,
      headingId: mockTodoPositions.headingId,
    }))
    .finish()
    .next()
    .isDone());
  it('update todo positions', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onTodoPositionsUpdate, {
      // @ts-ignore
      update: (data) => TodosActions.setPositionsByHeadingId({
        // @ts-ignore
        positions: data.order,
        // @ts-ignore
        headingId: data.headingId,
      }),
    },
  )
    .next()
    .apply(updateService, updateService.onTodoPositionsUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockTodoPositions,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(TodosActions.setPositionsByHeadingId({
      positions: mockTodoPositions.order,
      headingId: mockTodoPositions.headingId,
    }))
    .next()
    .apply(updateService, updateService.onTodoPositionsUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockTodoPositions,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(TodosActions.setPositionsByHeadingId({
      positions: mockTodoPositions.order,
      headingId: mockTodoPositions.headingId,
    }))
    .finish()
    .next()
    .isDone());
  //
  it('insert comment', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onCommentsUpdate, {
      // @ts-ignore
      insert: CommentsActions.add,
    },
  )
    .next()
    .apply(updateService, updateService.onCommentsUpdate)
    .next({
      operation: EnumOperations.Insert,
      data: mockComment,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(CommentsActions.add(mockComment))
    .next()
    .apply(updateService, updateService.onCommentsUpdate)
    .next({
      operation: EnumOperations.Insert,
      data: mockComment,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(CommentsActions.add(mockComment))
    .finish()
    .next()
    .isDone());
  it('update comment', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onCommentsUpdate, {
      // @ts-ignore
      update: CommentsActions.updateText,
    },
  )
    .next()
    .apply(updateService, updateService.onCommentsUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockComment,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(CommentsActions.updateText(mockComment))
    .next()
    .apply(updateService, updateService.onCommentsUpdate)
    .next({
      operation: EnumOperations.Update,
      data: mockComment,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(CommentsActions.updateText(mockComment))
    .finish()
    .next()
    .isDone());
  it('delete comment', async () => testSaga(
    subscribeOnEntity, updateService, updateService.onCommentsUpdate, {
      // @ts-ignore
      delete: CommentsActions.remove,
    },
  )
    .next()
    .apply(updateService, updateService.onCommentsUpdate)
    .next({
      operation: EnumOperations.Delete,
      data: mockComment,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(CommentsActions.remove(mockComment))
    .next()
    .apply(updateService, updateService.onCommentsUpdate)
    .next({
      operation: EnumOperations.Delete,
      data: mockComment,
    })
    .select(getIsSearchMode)
    .next(false)
    .put(CommentsActions.remove(mockComment))
    .finish()
    .next()
    .isDone());
});
