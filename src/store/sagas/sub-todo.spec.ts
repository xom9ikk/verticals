import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { useAlert } from '@use/alert';
import { SubTodosActions, CommentsActions } from '@store/actions';
import { SubTodoService } from '@services/sub-todo';
import { EnumColors, EnumTodoStatus } from '@type/entities';
import { watchSubTodo } from '@store/sagas/sub-todo';

// @ts-ignore
const subTodoService = new SubTodoService();
const { show, ALERT_TYPES } = useAlert();

const mockSubTodo = {
  id: 1,
  todoId: 11,
  title: 'SubTodo Title',
  description: 'Description for subTodo',
  status: EnumTodoStatus.Done,
  color: EnumColors.Green,
  isNotificationsEnabled: true,
  expirationDate: new Date(),
};

describe('Sub todo saga flow', () => {
  it('fetch by board id', () => {
    const mockData = {
      subTodos: {
        entities: [{
          ...mockSubTodo,
          commentsCount: 3,
          attachmentsCount: 1,
          imagesCount: 0,
        }],
        positions: {
          [mockSubTodo.todoId]: [mockSubTodo.id],
        },
      },
    };
    const payload = {
      boardId: 77,
    };

    return expectSaga(watchSubTodo, subTodoService)
      .provide([
        [matchers.apply.fn(subTodoService.getByBoardId), {
          data: mockData,
        }],
      ])
      .dispatch(SubTodosActions.effect.fetchByBoardId(payload))
      .apply(subTodoService, subTodoService.getByBoardId, [payload])
      .put(SubTodosActions.setAll(mockData.subTodos))
      .silentRun();
  });
  it('create', () => {
    const mockData = {
      subTodoId: mockSubTodo.id,
      position: 7,
    };

    return expectSaga(watchSubTodo, subTodoService)
      .provide([
        [matchers.apply.fn(subTodoService.create), {
          data: mockData,
        }],
      ])
      .dispatch(SubTodosActions.effect.create(mockSubTodo))
      .apply(subTodoService, subTodoService.create, [mockSubTodo])
      .put(SubTodosActions.add({
        ...mockSubTodo,
        id: mockData.subTodoId,
        commentsCount: 0,
        attachmentsCount: 0,
        imagesCount: 0,
      }))
      .call(show, 'SubTodo', 'SubTodo created successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('create with below id', () => {
    const mockData = {
      subTodoId: mockSubTodo.id,
      position: 7,
    };

    const payload = {
      ...mockSubTodo,
      belowId: 77,
    };

    return expectSaga(watchSubTodo, subTodoService)
      .provide([
        [matchers.apply.fn(subTodoService.create), {
          data: mockData,
        }],
      ])
      .dispatch(SubTodosActions.effect.create(payload))
      .apply(subTodoService, subTodoService.create, [payload])
      .put(SubTodosActions.removeTemp())
      .put(SubTodosActions.insertInPosition({
        entity: {
          ...mockSubTodo,
          id: mockData.subTodoId,
          attachmentsCount: 0,
          commentsCount: 0,
          imagesCount: 0,
        },
        position: mockData.position,
      }))
      .call(show, 'SubTodo', 'SubTodo created successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('create with files', () => {
    const mockData = {
      subTodoId: mockSubTodo.id,
      position: 7,
    };

    const payload = {
      ...mockSubTodo,
    };
    const files = [1, 2, 3] as any;

    return expectSaga(watchSubTodo, subTodoService)
      .provide([
        [matchers.apply.fn(subTodoService.create), {
          data: mockData,
        }],
      ])
      .dispatch(SubTodosActions.effect.create({
        ...payload,
        files,
      }))
      .apply(subTodoService, subTodoService.create, [{
        ...payload,
        files,
      }])
      .put(CommentsActions.effect.create({
        subTodoId: mockData.subTodoId,
        text: '',
        files,
      }))
      .put(SubTodosActions.add({
        ...mockSubTodo,
        id: mockData.subTodoId,
        commentsCount: 0,
        attachmentsCount: 0,
        imagesCount: 0,
      }))
      .call(show, 'SubTodo', 'SubTodo created successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('remove', () => {
    const payload = {
      id: 77,
    };

    return expectSaga(watchSubTodo, subTodoService)
      .provide([
        [matchers.apply.fn(subTodoService.remove), undefined],
      ])
      .dispatch(SubTodosActions.effect.remove(payload))
      .apply(subTodoService, subTodoService.remove, [payload])
      .put(SubTodosActions.remove(payload))
      .call(show, 'SubTodo', 'SubTodo removed successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('update', () => {
    const payload = {
      id: 77,
      title: 'New Title',
    };

    return expectSaga(watchSubTodo, subTodoService)
      .provide([
        [matchers.apply.fn(subTodoService.update), undefined],
      ])
      .dispatch(SubTodosActions.effect.update(payload))
      .apply(subTodoService, subTodoService.update, [payload])
      .put(SubTodosActions.updateEntity(payload))
      .call(show, 'SubTodo', 'SubTodo updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('move', () => {
    const payload = {
      todoId: 1,
      sourcePosition: 0,
      destinationPosition: 2,
    };

    return expectSaga(watchSubTodo, subTodoService)
      .provide([
        [matchers.apply.fn(subTodoService.updatePosition), undefined],
      ])
      .dispatch(SubTodosActions.effect.move(payload))
      .apply(subTodoService, subTodoService.updatePosition, [payload])
      .put(SubTodosActions.move(payload))
      .call(show, 'SubTodo', 'SubTodo position updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('move between todos', () => {
    const payload = {
      todoId: 1,
      sourcePosition: 0,
      destinationPosition: 2,
      targetTodoId: 77,
    };

    return expectSaga(watchSubTodo, subTodoService)
      .provide([
        [matchers.apply.fn(subTodoService.updatePosition), undefined],
      ])
      .dispatch(SubTodosActions.effect.move(payload))
      .apply(subTodoService, subTodoService.updatePosition, [payload])
      .put(SubTodosActions.move(payload))
      .call(show, 'SubTodo', 'SubTodo position updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('duplicate', () => {
    const mockData = {
      data: {
        ...mockSubTodo,
        position: 2,
        subTodoId: 77,
      },
    };
    const {
      subTodoId, position, ...duplicatedSubTodo
    } = mockData.data;
    const payload = {
      subTodoId: mockSubTodo.id,
    };

    return expectSaga(watchSubTodo, subTodoService)
      .provide([
        [matchers.apply.fn(subTodoService.duplicate), mockData],
      ])
      .dispatch(SubTodosActions.effect.duplicate(payload))
      .apply(subTodoService, subTodoService.duplicate, [payload])
      .put(SubTodosActions.insertInPosition({
        entity: {
          ...duplicatedSubTodo,
          id: subTodoId,
          attachmentsCount: 0,
          commentsCount: 0,
          imagesCount: 0,
        },
        position,
      }))
      .call(show, 'SubTodo', 'SubTodo duplicated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
});
