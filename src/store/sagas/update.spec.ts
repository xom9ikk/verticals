import { testSaga } from 'redux-saga-test-plan';

import { UpdateService } from '@services/update';
import {
  BoardsActions, ColumnsActions, CommentsActions, SubTodosActions, TodosActions,
} from '@store/actions';
import { subscribeOnEntity } from '@store/sagas/update';
import { getIsSearchMode } from '@store/selectors';
import { EnumOperations } from '@type/api';
import { EnumCardType, EnumColors, EnumTodoStatus } from '@type/entities';

// @ts-ignore
const updateService = new UpdateService();

const mockBoard = {
  id: 11,
  title: 'Title',
  icon: 'path/to/icon',
  cardType: EnumCardType.Checkboxes,
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

const mockSubTodo = {
  id: 222,
  todoId: 111,
  title: 'Sub todo Title',
  description: 'Description for sub todo',
  status: EnumTodoStatus.Done,
  color: EnumColors.Green,
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
const mockSubTodoPositions = {
  todoId: 77,
  order: [1, 2, 3, 4, 5],
};

describe('Update saga flow', () => {
  describe('Board', () => {
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
  });
  describe('Column', () => {
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
  });
  describe('Todo', () => {
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
  });
  describe('Sub todo', () => {
    it('insert subSubTodo', async () => testSaga(
      subscribeOnEntity, updateService, updateService.onSubTodosUpdate, {
        // @ts-ignore
        insert: SubTodosActions.add,
      },
    )
      .next()
      .apply(updateService, updateService.onSubTodosUpdate)
      .next({
        operation: EnumOperations.Insert,
        data: mockSubTodo,
      })
      .select(getIsSearchMode)
      .next(false)
      .put(SubTodosActions.add(mockSubTodo))
      .next()
      .apply(updateService, updateService.onSubTodosUpdate)
      .next({
        operation: EnumOperations.Insert,
        data: mockSubTodo,
      })
      .select(getIsSearchMode)
      .next(false)
      .put(SubTodosActions.add(mockSubTodo))
      .finish()
      .next()
      .isDone());
    it('update subSubTodo', async () => testSaga(
      subscribeOnEntity, updateService, updateService.onSubTodosUpdate, {
        // @ts-ignore
        update: SubTodosActions.updateEntity,
      },
    )
      .next()
      .apply(updateService, updateService.onSubTodosUpdate)
      .next({
        operation: EnumOperations.Update,
        data: mockSubTodo,
      })
      .select(getIsSearchMode)
      .next(false)
      .put(SubTodosActions.updateEntity(mockSubTodo))
      .next()
      .apply(updateService, updateService.onSubTodosUpdate)
      .next({
        operation: EnumOperations.Update,
        data: mockSubTodo,
      })
      .select(getIsSearchMode)
      .next(false)
      .put(SubTodosActions.updateEntity(mockSubTodo))
      .finish()
      .next()
      .isDone());
    it('delete subSubTodo', async () => testSaga(
      subscribeOnEntity, updateService, updateService.onSubTodosUpdate, {
        // @ts-ignore
        delete: SubTodosActions.remove,
      },
    )
      .next()
      .apply(updateService, updateService.onSubTodosUpdate)
      .next({
        operation: EnumOperations.Delete,
        data: mockSubTodo,
      })
      .select(getIsSearchMode)
      .next(false)
      .put(SubTodosActions.remove(mockSubTodo))
      .next()
      .apply(updateService, updateService.onSubTodosUpdate)
      .next({
        operation: EnumOperations.Delete,
        data: mockSubTodo,
      })
      .select(getIsSearchMode)
      .next(false)
      .put(SubTodosActions.remove(mockSubTodo))
      .finish()
      .next()
      .isDone());
  });
  describe('Comment', () => {
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
  describe('Board positions', () => {
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
  });
  describe('Column positions', () => {
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
  });
  describe('Todo positions', () => {
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
  });
  describe('Sub todo positions', () => {
    it('insert subTodo positions', async () => testSaga(
      subscribeOnEntity, updateService, updateService.onSubTodoPositionsUpdate, {
        // @ts-ignore
        insert: (data) => SubTodosActions.setPositionsByTodoId({
          // @ts-ignore
          positions: data.order,
          // @ts-ignore
          todoId: data.todoId,
        }),
      },
    )
      .next()
      .apply(updateService, updateService.onSubTodoPositionsUpdate)
      .next({
        operation: EnumOperations.Insert,
        data: mockSubTodoPositions,
      })
      .select(getIsSearchMode)
      .next(false)
      .put(SubTodosActions.setPositionsByTodoId({
        positions: mockSubTodoPositions.order,
        todoId: mockSubTodoPositions.todoId,
      }))
      .next()
      .apply(updateService, updateService.onSubTodoPositionsUpdate)
      .next({
        operation: EnumOperations.Insert,
        data: mockSubTodoPositions,
      })
      .select(getIsSearchMode)
      .next(false)
      .put(SubTodosActions.setPositionsByTodoId({
        positions: mockSubTodoPositions.order,
        todoId: mockSubTodoPositions.todoId,
      }))
      .finish()
      .next()
      .isDone());
    it('update subTodo positions', async () => testSaga(
      subscribeOnEntity, updateService, updateService.onSubTodoPositionsUpdate, {
        // @ts-ignore
        update: (data) => SubTodosActions.setPositionsByTodoId({
          // @ts-ignore
          positions: data.order,
          // @ts-ignore
          todoId: data.todoId,
        }),
      },
    )
      .next()
      .apply(updateService, updateService.onSubTodoPositionsUpdate)
      .next({
        operation: EnumOperations.Update,
        data: mockSubTodoPositions,
      })
      .select(getIsSearchMode)
      .next(false)
      .put(SubTodosActions.setPositionsByTodoId({
        positions: mockSubTodoPositions.order,
        todoId: mockSubTodoPositions.todoId,
      }))
      .next()
      .apply(updateService, updateService.onSubTodoPositionsUpdate)
      .next({
        operation: EnumOperations.Update,
        data: mockSubTodoPositions,
      })
      .select(getIsSearchMode)
      .next(false)
      .put(SubTodosActions.setPositionsByTodoId({
        positions: mockSubTodoPositions.order,
        todoId: mockSubTodoPositions.todoId,
      }))
      .finish()
      .next()
      .isDone());
  });
});
