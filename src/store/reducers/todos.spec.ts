import { TEMP_ID } from '@/constants';
import { TodosActions } from '@store/actions';
import { TodosReducer, initialState } from '@store/reducers/todos';
import { EnumColors, EnumTodoStatus } from '@type/entities';

const mockTodos = [{
  id: 1,
  headingId: 11,
  title: 'Todo Title',
  description: 'Description for todo',
  status: EnumTodoStatus.Done,
  color: EnumColors.Green,
  isArchived: true,
  isRemoved: false,
  isNotificationsEnabled: true,
  expirationDate: new Date(),
  commentsCount: 3,
  attachmentsCount: 0,
  imagesCount: 4,
}, {
  id: 2,
  headingId: 11,
  title: 'Todo Title #2',
  description: 'Description for todo #2',
  status: EnumTodoStatus.Canceled,
  color: EnumColors.Red,
  isArchived: true,
  isRemoved: false,
  isNotificationsEnabled: true,
  expirationDate: new Date(),
  commentsCount: 1,
  attachmentsCount: 2,
  imagesCount: 0,
}, {
  id: 3,
  headingId: 11,
  title: 'Todo Title #3',
  description: 'Description for todo #3',
  status: EnumTodoStatus.Doing,
  color: EnumColors.Gray,
  isArchived: true,
  isRemoved: false,
  isNotificationsEnabled: true,
  expirationDate: new Date(),
  commentsCount: 0,
  attachmentsCount: 0,
  imagesCount: 3,
}, {
  id: 4,
  headingId: 22,
  title: 'Todo Title #4',
  description: 'Description for todo #4',
  status: EnumTodoStatus.Todo,
  color: EnumColors.Turquoise,
  isArchived: true,
  isRemoved: false,
  isNotificationsEnabled: true,
  expirationDate: new Date(),
  commentsCount: 41,
  attachmentsCount: 4,
  imagesCount: 2,
}, {
  id: 5,
  headingId: 22,
  title: 'Todo Title #5',
  description: 'Description for todo #5',
  status: EnumTodoStatus.Done,
  color: null,
  isArchived: true,
  isRemoved: false,
  isNotificationsEnabled: true,
  expirationDate: new Date(),
  commentsCount: 4,
  attachmentsCount: 7,
  imagesCount: 3,
}];

describe('Todo reducer', () => {
  it('set all', () => {
    const [todo, todo2] = mockTodos;
    expect(TodosReducer(initialState, TodosActions.setAll({
      entities: [todo, todo2],
      positions: {
        [todo.headingId]: [todo.id, todo2.id],
      },
    }))).toEqual({
      entities: [todo, todo2],
      positions: {
        [todo.headingId]: [todo.id, todo2.id],
      },
    });
  });
  it('set positions', () => {
    expect(TodosReducer(initialState, TodosActions.setPositionsByHeadingId({
      headingId: 1,
      positions: [1, 2, 3, 4, 5, 6, 7],
    }))).toEqual({
      entities: [],
      positions: {
        1: [1, 2, 3, 4, 5, 6, 7],
      },
    });
  });
  it('update entity', () => {
    const [todo, todo2] = mockTodos;
    const initialStateWithTwoTodos = {
      entities: [todo, todo2],
      positions: {
        [todo.headingId]: [todo.id, todo2.id],
      },
    };
    expect(TodosReducer(initialStateWithTwoTodos, TodosActions.updateEntity({
      id: 1,
      title: 'new Todo Title',
    }))).toEqual({
      entities: [{
        ...todo,
        title: 'new Todo Title',
      }, todo2],
      positions: {
        [todo.headingId]: [todo.id, todo2.id],
      },
    });
  });
  it('add todo', () => {
    const [todo] = mockTodos;
    expect(TodosReducer(initialState, TodosActions.add(todo))).toEqual({
      entities: [todo],
      positions: {
        [todo.headingId]: [todo.id],
      },
    });
  });
  it('move', () => {
    const [todo, todo2, todo3, todoFromOtherHeading] = mockTodos;
    const initialStateWithFourTodos = {
      entities: [todo, todo2, todo3, todoFromOtherHeading],
      positions: {
        [todo.headingId]: [todo.id, todo2.id, todo3.id],
        [todoFromOtherHeading.headingId]: [todoFromOtherHeading.id],
      },
    };
    expect(TodosReducer(initialStateWithFourTodos, TodosActions.move({
      headingId: todo.headingId,
      sourcePosition: 2,
      destinationPosition: 0,
    }))).toEqual({
      entities: [todo, todo2, todo3, todoFromOtherHeading],
      positions: {
        [todo.headingId]: [todo3.id, todo.id, todo2.id],
        [todoFromOtherHeading.headingId]: [todoFromOtherHeading.id],
      },
    });
  });
  it('move between headings', () => {
    const [todo, todo2, todo3, todoFromOtherHeading] = mockTodos;
    const initialStateWithFourTodos = {
      entities: [todo, todo2, todo3, todoFromOtherHeading],
      positions: {
        [todo.headingId]: [todo.id, todo2.id, todo3.id],
        [todoFromOtherHeading.headingId]: [todoFromOtherHeading.id],
      },
    };
    expect(TodosReducer(initialStateWithFourTodos, TodosActions.move({
      headingId: todoFromOtherHeading.headingId,
      targetHeadingId: todo.headingId,
      sourcePosition: 0,
      destinationPosition: 0,
    }))).toEqual({
      entities: [todo, todo2, todo3, {
        ...todoFromOtherHeading,
        headingId: todo.headingId,
      }],
      positions: {
        [todo.headingId]: [todoFromOtherHeading.id, todo.id, todo2.id, todo3.id],
        [todoFromOtherHeading.headingId]: [],
      },
    });
  });
  it('move between headings when target heading positions is empty', () => {
    const [todo, todo2, todo3, todoFromOtherHeading] = mockTodos;
    const initialStateWithFourTodos = {
      entities: [todo, todo2, todo3, todoFromOtherHeading],
      positions: {
        [todo.headingId]: [todo.id, todo2.id, todo3.id],
        [todoFromOtherHeading.headingId]: [todoFromOtherHeading.id],
      },
    };
    const targetHeadingId = 777;
    expect(TodosReducer(initialStateWithFourTodos, TodosActions.move({
      headingId: todoFromOtherHeading.headingId,
      targetHeadingId,
      sourcePosition: 0,
      destinationPosition: 0,
    }))).toEqual({
      entities: [todo, todo2, todo3, {
        ...todoFromOtherHeading,
        headingId: targetHeadingId,
      }],
      positions: {
        [targetHeadingId]: [todoFromOtherHeading.id],
        [todo.headingId]: [todo.id, todo2.id, todo3.id],
        [todoFromOtherHeading.headingId]: [],
      },
    });
  });
  it('insert in position', () => {
    const [todo, todo2, todo3, todoFromOtherHeading, todoFromOtherHeading2] = mockTodos;
    const initialStateWithFourTodos = {
      entities: [todo, todo2, todo3, todoFromOtherHeading],
      positions: {
        [todo.headingId]: [todo.id, todo2.id, todo3.id],
        [todoFromOtherHeading.headingId]: [todoFromOtherHeading.id],
      },
    };
    expect(TodosReducer(initialStateWithFourTodos, TodosActions.insertInPosition({
      position: 0,
      entity: todoFromOtherHeading2,
    }))).toEqual({
      entities: [todo, todo2, todo3, todoFromOtherHeading, todoFromOtherHeading2],
      positions: {
        [todo.headingId]: [todo.id, todo2.id, todo3.id],
        [todoFromOtherHeading.headingId]: [todoFromOtherHeading2.id, todoFromOtherHeading.id],
      },
    });
  });
  it('remove', () => {
    const [todo, todo2, todo3, todoFromOtherHeading] = mockTodos;
    const initialStateWithFourTodos = {
      entities: [todo, todo2, todo3, todoFromOtherHeading],
      positions: {
        [todo.headingId]: [todo.id, todo2.id, todo3.id],
        [todoFromOtherHeading.headingId]: [todoFromOtherHeading.id],
      },
    };
    expect(TodosReducer(initialStateWithFourTodos, TodosActions.remove({
      id: todo3.id,
    }))).toEqual({
      entities: [todo, todo2, todoFromOtherHeading],
      positions: {
        [todo.headingId]: [todo.id, todo2.id],
        [todoFromOtherHeading.headingId]: [todoFromOtherHeading.id],
      },
    });
  });
  it('draw below', () => {
    const [todo, todo2, todo3, todoFromOtherHeading] = mockTodos;
    const initialStateWithFourTodos = {
      entities: [todo, todo2, todo3, todoFromOtherHeading],
      positions: {
        [todo.headingId]: [todo.id, todo2.id, todo3.id],
        [todoFromOtherHeading.headingId]: [todoFromOtherHeading.id],
      },
    };
    expect(TodosReducer(initialStateWithFourTodos, TodosActions.drawBelow({
      headingId: todo2.headingId,
      belowId: todo2.id,
    }))).toEqual({
      entities: [todo, todo2, todo3, todoFromOtherHeading, {
        id: TEMP_ID,
        headingId: todo2.headingId,
        belowId: todo2.id,
        title: '',
        attachmentsCount: 0,
        commentsCount: 0,
        imagesCount: 0,
      }],
      positions: {
        [todo.headingId]: [todo.id, todo2.id, TEMP_ID, todo3.id],
        [todoFromOtherHeading.headingId]: [todoFromOtherHeading.id],
      },
    });
  });
  it('remove temporary todo', () => {
    const [todo, todo2, todo3, todoFromOtherHeading] = mockTodos;
    const initialStateWithFourTodos = {
      entities: [todo, todo2, todo3, todoFromOtherHeading, {
        id: TEMP_ID,
        headingId: todo2.headingId,
        belowId: todo2.id,
        title: '',
        attachmentsCount: 0,
        commentsCount: 0,
        imagesCount: 0,
      }],
      positions: {
        [todo.headingId]: [todo.id, todo2.id, TEMP_ID, todo3.id],
        [todoFromOtherHeading.headingId]: [todoFromOtherHeading.id],
      },
    };
    expect(TodosReducer(initialStateWithFourTodos, TodosActions.removeTemp())).toEqual({
      entities: [todo, todo2, todo3, todoFromOtherHeading],
      positions: {
        [todo.headingId]: [todo.id, todo2.id, todo3.id],
        [todoFromOtherHeading.headingId]: [todoFromOtherHeading.id],
      },
    });
  });
});
