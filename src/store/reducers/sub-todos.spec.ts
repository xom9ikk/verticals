import { SubTodosActions } from '@store/actions';
import { EnumColors, EnumTodoStatus } from '@type/entities';
import { SUB_TODO_ON_TOP, TEMP_ID } from '@/constants';
import { SubTodosReducer, initialState } from '@store/reducers/sub-todos';

const mockSubTodos = [{
  id: 1,
  todoId: 11,
  title: 'SubTodo Title',
  description: 'Description for subTodo',
  status: EnumTodoStatus.Done,
  color: EnumColors.Green,
  isNotificationsEnabled: true,
  expirationDate: new Date(),
  commentsCount: 3,
  attachmentsCount: 0,
  imagesCount: 4,
}, {
  id: 2,
  todoId: 11,
  title: 'SubTodo Title #2',
  description: 'Description for subTodo #2',
  status: EnumTodoStatus.Canceled,
  color: EnumColors.Red,
  isNotificationsEnabled: true,
  expirationDate: new Date(),
  commentsCount: 1,
  attachmentsCount: 2,
  imagesCount: 0,
}, {
  id: 3,
  todoId: 11,
  title: 'SubTodo Title #3',
  description: 'Description for subTodo #3',
  status: EnumTodoStatus.Doing,
  color: EnumColors.Gray,
  isNotificationsEnabled: true,
  expirationDate: new Date(),
  commentsCount: 0,
  attachmentsCount: 0,
  imagesCount: 3,
}, {
  id: 3,
  todoId: 22,
  title: 'SubTodo Title #4',
  description: 'Description for subTodo #4',
  status: EnumTodoStatus.Todo,
  color: EnumColors.Turquoise,
  isNotificationsEnabled: true,
  expirationDate: new Date(),
  commentsCount: 41,
  attachmentsCount: 4,
  imagesCount: 2,
}, {
  id: 4,
  todoId: 22,
  title: 'SubTodo Title #5',
  description: 'Description for subTodo #5',
  status: EnumTodoStatus.Done,
  color: null,
  isNotificationsEnabled: true,
  expirationDate: new Date(),
  commentsCount: 4,
  attachmentsCount: 7,
  imagesCount: 3,
}];

describe('SubTodo reducer', () => {
  it('set all', () => {
    const [subTodo, subTodo2] = mockSubTodos;
    expect(SubTodosReducer(initialState, SubTodosActions.setAll({
      entities: [subTodo, subTodo2],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id],
      },
    }))).toEqual({
      entities: [subTodo, subTodo2],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id],
      },
    });
  });
  it('set positions', () => {
    expect(SubTodosReducer(initialState, SubTodosActions.setPositionsByTodoId({
      todoId: 1,
      positions: [1, 2, 3, 4, 5, 6, 7],
    }))).toEqual({
      entities: [],
      positions: {
        1: [1, 2, 3, 4, 5, 6, 7],
      },
    });
  });
  it('update entity', () => {
    const [subTodo, subTodo2] = mockSubTodos;
    const initialStateWithTwoSubTodos = {
      entities: [subTodo, subTodo2],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id],
      },
    };
    expect(SubTodosReducer(initialStateWithTwoSubTodos, SubTodosActions.updateEntity({
      id: 1,
      title: 'new SubTodo Title',
    }))).toEqual({
      entities: [{
        ...subTodo,
        title: 'new SubTodo Title',
      }, subTodo2],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id],
      },
    });
  });
  it('add subTodo', () => {
    const [subTodo] = mockSubTodos;
    expect(SubTodosReducer(initialState, SubTodosActions.add(subTodo))).toEqual({
      entities: [subTodo],
      positions: {
        [subTodo.todoId]: [subTodo.id],
      },
    });
  });
  it('move', () => {
    const [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo] = mockSubTodos;
    const initialStateWithFourSubTodos = {
      entities: [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id, subTodo3.id],
        [subTodoFromOtherTodo.todoId]: [subTodoFromOtherTodo.id],
      },
    };
    expect(SubTodosReducer(initialStateWithFourSubTodos, SubTodosActions.move({
      todoId: subTodo.todoId,
      sourcePosition: 2,
      destinationPosition: 0,
    }))).toEqual({
      entities: [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo],
      positions: {
        [subTodo.todoId]: [subTodo3.id, subTodo.id, subTodo2.id],
        [subTodoFromOtherTodo.todoId]: [subTodoFromOtherTodo.id],
      },
    });
  });
  it('move between todos', () => {
    const [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo] = mockSubTodos;
    const initialStateWithFourSubTodos = {
      entities: [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id, subTodo3.id],
        [subTodoFromOtherTodo.todoId]: [subTodoFromOtherTodo.id],
      },
    };
    expect(SubTodosReducer(initialStateWithFourSubTodos, SubTodosActions.move({
      todoId: subTodoFromOtherTodo.todoId,
      targetTodoId: subTodo.todoId,
      sourcePosition: 0,
      destinationPosition: 0,
    }))).toEqual({
      entities: [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo],
      positions: {
        [subTodo.todoId]: [subTodoFromOtherTodo.id, subTodo.id, subTodo2.id, subTodo3.id],
        [subTodoFromOtherTodo.todoId]: [],
      },
    });
  });
  it('insert in position', () => {
    const [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo, subTodoFromOtherTodo2] = mockSubTodos;
    const initialStateWithFourSubTodos = {
      entities: [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id, subTodo3.id],
        [subTodoFromOtherTodo.todoId]: [subTodoFromOtherTodo.id],
      },
    };
    expect(SubTodosReducer(initialStateWithFourSubTodos, SubTodosActions.insertInPosition({
      position: 0,
      entity: subTodoFromOtherTodo2,
    }))).toEqual({
      entities: [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo, subTodoFromOtherTodo2],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id, subTodo3.id],
        [subTodoFromOtherTodo.todoId]: [subTodoFromOtherTodo2.id, subTodoFromOtherTodo.id],
      },
    });
  });
  it('remove', () => {
    const [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo] = mockSubTodos;
    const initialStateWithFourSubTodos = {
      entities: [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id, subTodo3.id],
        [subTodoFromOtherTodo.todoId]: [subTodoFromOtherTodo.id],
      },
    };
    expect(SubTodosReducer(initialStateWithFourSubTodos, SubTodosActions.remove({
      id: subTodo3.id,
    }))).toEqual({
      entities: [subTodo, subTodo2, subTodoFromOtherTodo],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id],
        [subTodoFromOtherTodo.todoId]: [subTodoFromOtherTodo.id],
      },
    });
  });
  it('draw below', () => {
    const [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo] = mockSubTodos;
    const initialStateWithFourSubTodos = {
      entities: [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id, subTodo3.id],
        [subTodoFromOtherTodo.todoId]: [subTodoFromOtherTodo.id],
      },
    };
    expect(SubTodosReducer(initialStateWithFourSubTodos, SubTodosActions.drawBelow({
      todoId: subTodo2.todoId,
      belowId: subTodo2.id,
    }))).toEqual({
      entities: [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo, {
        id: TEMP_ID,
        todoId: subTodo2.todoId,
        belowId: subTodo2.id,
        title: '',
        attachmentsCount: 0,
        commentsCount: 0,
        imagesCount: 0,
      }],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id, TEMP_ID, subTodo3.id],
        [subTodoFromOtherTodo.todoId]: [subTodoFromOtherTodo.id],
      },
    });
  });
  it('draw on top', () => {
    const [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo] = mockSubTodos;
    const initialStateWithFourSubTodos = {
      entities: [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id, subTodo3.id],
        [subTodoFromOtherTodo.todoId]: [subTodoFromOtherTodo.id],
      },
    };
    expect(SubTodosReducer(initialStateWithFourSubTodos, SubTodosActions.drawOnTop({
      todoId: subTodo2.todoId,
    }))).toEqual({
      entities: [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo, {
        id: TEMP_ID,
        todoId: subTodo2.todoId,
        belowId: SUB_TODO_ON_TOP,
        title: '',
        attachmentsCount: 0,
        commentsCount: 0,
        imagesCount: 0,
      }],
      positions: {
        [subTodo.todoId]: [TEMP_ID, subTodo.id, subTodo2.id, subTodo3.id],
        [subTodoFromOtherTodo.todoId]: [subTodoFromOtherTodo.id],
      },
    });
  });
  it('remove temporary subTodo', () => {
    const [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo] = mockSubTodos;
    const initialStateWithFourSubTodos = {
      entities: [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo, {
        id: TEMP_ID,
        todoId: subTodo2.todoId,
        belowId: subTodo2.id,
        title: '',
        attachmentsCount: 0,
        commentsCount: 0,
        imagesCount: 0,
      }],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id, TEMP_ID, subTodo3.id],
        [subTodoFromOtherTodo.todoId]: [subTodoFromOtherTodo.id],
      },
    };
    expect(SubTodosReducer(initialStateWithFourSubTodos, SubTodosActions.removeTemp())).toEqual({
      entities: [subTodo, subTodo2, subTodo3, subTodoFromOtherTodo],
      positions: {
        [subTodo.todoId]: [subTodo.id, subTodo2.id, subTodo3.id],
        [subTodoFromOtherTodo.todoId]: [subTodoFromOtherTodo.id],
      },
    });
  });
});
