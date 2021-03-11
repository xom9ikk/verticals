import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { useAlert } from '@use/alert';
import { TodosActions, SystemActions, CommentsActions } from '@store/actions';
import { TodoService } from '@services/todo';
import { EnumColors, EnumTodoStatus } from '@type/entities';
import { watchTodo } from '@store/sagas/todo';

// @ts-ignore
const todoService = new TodoService();
const { show, ALERT_TYPES } = useAlert();

const mockTodo = {
  id: 1,
  columnId: 11,
  title: 'Todo Title',
  description: 'Description for todo',
  status: EnumTodoStatus.Done,
  color: EnumColors.Green,
  isArchived: true,
  isRemoved: false,
  isNotificationsEnabled: true,
  expirationDate: new Date(),
};

describe('Todo saga flow', () => {
  it('fetch by column id', () => {
    const mockData = {
      todos: {
        entities: [{
          ...mockTodo,
          commentsCount: 3,
          attachmentsCount: 1,
          imagesCount: 0,
        }],
        positions: {
          [mockTodo.columnId]: [mockTodo.id],
        },
      },
    };
    const payload = {
      boardId: 77,
    };

    return expectSaga(watchTodo, todoService)
      .provide([
        [matchers.apply.fn(todoService.getByBoardId), {
          data: mockData,
        }],
      ])
      .dispatch(TodosActions.effect.fetchByBoardId(payload))
      .apply(todoService, todoService.getByBoardId, [payload])
      .put(TodosActions.setAll(mockData.todos))
      .put(SystemActions.setIsLoadedTodos(true))
      .silentRun();
  });
  it('create', () => {
    const mockData = {
      todoId: mockTodo.id,
      position: 7,
    };

    return expectSaga(watchTodo, todoService)
      .provide([
        [matchers.apply.fn(todoService.create), {
          data: mockData,
        }],
      ])
      .dispatch(TodosActions.effect.create(mockTodo))
      .apply(todoService, todoService.create, [mockTodo])
      .put(TodosActions.add({
        ...mockTodo,
        id: mockData.todoId,
        commentsCount: 0,
        attachmentsCount: 0,
        imagesCount: 0,
      }))
      .call(show, 'Todo', 'Todo created successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('create with below id', () => {
    const mockData = {
      todoId: mockTodo.id,
      position: 7,
    };

    const payload = {
      ...mockTodo,
      belowId: 77,
    };

    return expectSaga(watchTodo, todoService)
      .provide([
        [matchers.apply.fn(todoService.create), {
          data: mockData,
        }],
      ])
      .dispatch(TodosActions.effect.create(payload))
      .apply(todoService, todoService.create, [payload])
      .put(TodosActions.removeTemp())
      .put(TodosActions.insertInPosition({
        entity: {
          ...mockTodo,
          id: mockData.todoId,
          attachmentsCount: 0,
          commentsCount: 0,
          imagesCount: 0,
        },
        position: mockData.position,
      }))
      .call(show, 'Todo', 'Todo created successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('create with files', () => {
    const mockData = {
      todoId: mockTodo.id,
      position: 7,
    };

    const payload = {
      ...mockTodo,
    };
    const files = [1, 2, 3] as any;

    return expectSaga(watchTodo, todoService)
      .provide([
        [matchers.apply.fn(todoService.create), {
          data: mockData,
        }],
      ])
      .dispatch(TodosActions.effect.create({
        ...payload,
        files,
      }))
      .apply(todoService, todoService.create, [{
        ...payload,
        files,
      }])
      .put(CommentsActions.effect.create({
        todoId: mockData.todoId,
        text: '',
        files,
      }))
      .put(TodosActions.add({
        ...mockTodo,
        id: mockData.todoId,
        commentsCount: 0,
        attachmentsCount: 0,
        imagesCount: 0,
      }))
      .call(show, 'Todo', 'Todo created successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('remove', () => {
    const payload = {
      id: 77,
    };

    return expectSaga(watchTodo, todoService)
      .provide([
        [matchers.apply.fn(todoService.remove), undefined],
      ])
      .dispatch(TodosActions.effect.remove(payload))
      .apply(todoService, todoService.remove, [payload])
      .put(TodosActions.remove(payload))
      .call(show, 'Todo', 'Todo removed successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('update', () => {
    const payload = {
      id: 77,
      title: 'New Title',
    };

    return expectSaga(watchTodo, todoService)
      .provide([
        [matchers.apply.fn(todoService.update), undefined],
      ])
      .dispatch(TodosActions.effect.update(payload))
      .apply(todoService, todoService.update, [payload])
      .put(TodosActions.updateEntity(payload))
      .call(show, 'Todo', 'Todo updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('move', () => {
    const payload = {
      columnId: 1,
      sourcePosition: 0,
      destinationPosition: 2,
    };

    return expectSaga(watchTodo, todoService)
      .provide([
        [matchers.apply.fn(todoService.updatePosition), undefined],
      ])
      .dispatch(TodosActions.effect.move(payload))
      .apply(todoService, todoService.updatePosition, [payload])
      .put(TodosActions.move(payload))
      .call(show, 'Todo', 'Todo position updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('move between columns', () => {
    const payload = {
      columnId: 1,
      sourcePosition: 0,
      destinationPosition: 2,
      targetColumnId: 77,
    };

    return expectSaga(watchTodo, todoService)
      .provide([
        [matchers.apply.fn(todoService.updatePosition), undefined],
      ])
      .dispatch(TodosActions.effect.move(payload))
      .apply(todoService, todoService.updatePosition, [payload])
      .put(TodosActions.move(payload))
      .call(show, 'Todo', 'Todo position updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('duplicate', () => {
    const mockData = {
      data: {
        ...mockTodo,
        position: 2,
        todoId: 77,
      },
    };
    const {
      todoId, position, ...duplicatedTodo
    } = mockData.data;
    const payload = {
      todoId: mockTodo.id,
    };

    return expectSaga(watchTodo, todoService)
      .provide([
        [matchers.apply.fn(todoService.duplicate), mockData],
      ])
      .dispatch(TodosActions.effect.duplicate(payload))
      .apply(todoService, todoService.duplicate, [payload])
      .put(TodosActions.insertInPosition({
        entity: {
          ...duplicatedTodo,
          id: todoId,
          attachmentsCount: 0,
          commentsCount: 0,
          imagesCount: 0,
        },
        position,
      }))
      .call(show, 'Todo', 'Todo duplicated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
});
