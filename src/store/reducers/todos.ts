/* eslint-disable no-return-assign,no-plusplus,max-len */
import {
  ITodo, ITodos,
} from '@type/entities';
import { createReducer } from '@reduxjs/toolkit';
import { TodosActions } from '../actions';

const initialState: ITodos = [];
// const initialState: ITodos = [
//   {
//     id: '',
//     title: 'Javascript',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 0,
//   },
//   {
//     id: '',
//     title: 'ES6+',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 1,
//   },
//   {
//     id: '',
//     title: 'Typescript',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 2,
//   },
//   {
//     id: '',
//     title: 'NodeJS',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 3,
//   },
//   {
//     id: '',
//     title: 'Semver',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 4,
//   },
//   {
//     id: '',
//     title: 'WebSocket',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 5,
//   },
//   {
//     id: '',
//     title: 'Rest API',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 6,
//   },
//   {
//     id: '',
//     title: 'JSON',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 7,
//   },
//   {
//     id: '',
//     title: 'Microservices architecture',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 8,
//   },
//   {
//     id: '',
//     title: 'gRPC',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 9,
//   },
//   {
//     id: '',
//     title: 'Protobuf',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 10,
//   },
//   {
//     id: '',
//     title: 'Git',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 11,
//   },
//   {
//     id: '',
//     title: 'BunnyCDN',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 12,
//   },
//   {
//     id: '',
//     title: 'Google Cloud',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 13,
//   },
//   {
//     id: '',
//     title: 'FFmpeg',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 14,
//   },
//   {
//     id: '',
//     title: 'Cuda',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 15,
//   },
//   {
//     id: '',
//     title: 'WebRTC',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 16,
//   },
//   {
//     id: '',
//     title: 'RTMP',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 17,
//   },
//   {
//     id: '',
//     title: 'HLS',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 18,
//   },
//   {
//     id: '',
//     title: 'MPEG-DASH',
//     columnId: 'column-1',
//     status: EnumTodoStatus.Todo,
//     position: 19,
//   },
//   {
//     id: '',
//     title: 'Axios',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 0,
//   },
//   {
//     id: '',
//     title: 'Webpack',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 1,
//   },
//   {
//     id: '',
//     title: 'Ava/Mocha/Chai/JEST',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 2,
//   },
//   {
//     id: '',
//     title: 'Lodash',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 3,
//   },
//   {
//     id: '',
//     title: 'Underscore',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 4,
//   },
//   {
//     id: '',
//     title: 'Ramda',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 5,
//   },
//   {
//     id: '',
//     title: 'Date-fns',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 6,
//   },
//   {
//     id: '',
//     title: 'Mongoose',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 7,
//   },
//   {
//     id: '',
//     title: 'Express',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 8,
//   },
//   {
//     id: '',
//     title: 'Moment.js',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 9,
//   },
//   {
//     id: '',
//     title: 'JWT',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 10,
//   },
//   {
//     id: '',
//     title: 'Socket.io',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 11,
//   },
//   {
//     id: '',
//     title: 'ZeroMQ',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 12,
//   },
//   {
//     id: '',
//     title: 'Sequalize',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 13,
//   },
//   {
//     id: '',
//     title: 'TypeORM',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 14,
//     isArchive: true,
//   },
//   {
//     id: '',
//     title: 'Swagger',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 15,
//     isArchive: true,
//   },
//   {
//     id: '',
//     title: 'Sentry',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 16,
//     isArchive: true,
//   },
//   {
//     id: '',
//     title: 'Redux',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 17,
//     isArchive: true,
//   },
//   {
//     id: '',
//     title: 'Redux-thunk',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 18,
//     isArchive: true,
//   },
//   {
//     id: '',
//     title: 'Redux-saga',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 19,
//     isArchive: true,
//   },
//   {
//     id: '',
//     title: 'Pino',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 20,
//     isArchive: true,
//   },
//   {
//     id: '',
//     title: 'Knex',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 21,
//     isArchive: true,
//   },
//   {
//     id: '',
//     title: 'Bignumber',
//     columnId: 'column-2',
//     status: EnumTodoStatus.Todo,
//     position: 22,
//     isArchive: true,
//   },
//   {
//     id: '',
//     title: 'Vue.js',
//     columnId: 'column-3',
//     status: EnumTodoStatus.Todo,
//     position: 0,
//   },
//   {
//     id: '',
//     title: 'Nuxt.js',
//     columnId: 'column-3',
//     status: EnumTodoStatus.Todo,
//     position: 1,
//   },
//   {
//     id: '',
//     title: 'Angular 9',
//     columnId: 'column-3',
//     status: EnumTodoStatus.Todo,
//     position: 2,
//   },
//   {
//     id: '',
//     title: 'React',
//     columnId: 'column-3',
//     status: EnumTodoStatus.Todo,
//     position: 3,
//   },
//   {
//     id: '',
//     title: 'Next.js',
//     columnId: 'column-3',
//     status: EnumTodoStatus.Todo,
//     position: 4,
//   },
//   {
//     id: '',
//     title: 'Pug',
//     columnId: 'column-3',
//     status: EnumTodoStatus.Todo,
//     position: 5,
//   },
//   {
//     id: '',
//     title: 'SCSS/SASS',
//     columnId: 'column-3',
//     status: EnumTodoStatus.Todo,
//     position: 6,
//   },
//   {
//     id: '',
//     title: 'Babel',
//     columnId: 'column-3',
//     status: EnumTodoStatus.Todo,
//     position: 7,
//   },
//   {
//     id: '',
//     title: 'Gulp',
//     columnId: 'column-3',
//     status: EnumTodoStatus.Todo,
//     position: 8,
//   },
//   {
//     id: '',
//     title: 'Zeit',
//     columnId: 'column-3',
//     status: EnumTodoStatus.Todo,
//     position: 9,
//   },
//   {
//     id: '',
//     title: 'Nest.js',
//     columnId: 'column-4',
//     status: EnumTodoStatus.Todo,
//     position: 0,
//   },
//   {
//     id: '',
//     title: 'GraphQL',
//     columnId: 'column-4',
//     status: EnumTodoStatus.Todo,
//     position: 1,
//   },
//   {
//     id: '',
//     title: 'RabbitMQ',
//     columnId: 'column-4',
//     status: EnumTodoStatus.Todo,
//     position: 2,
//   },
//   {
//     id: '',
//     title: 'PostgreSQL',
//     columnId: 'column-5',
//     status: EnumTodoStatus.Todo,
//     position: 0,
//   },
//   {
//     id: '',
//     title: 'MongoDB',
//     columnId: 'column-5',
//     status: EnumTodoStatus.Todo,
//     position: 1,
//   },
//   {
//     id: '',
//     title: 'Redis',
//     columnId: 'column-5',
//     status: EnumTodoStatus.Todo,
//     position: 2,
//   },
//   {
//     id: '',
//     title: 'InfluxDB',
//     columnId: 'column-5',
//     status: EnumTodoStatus.Todo,
//     position: 3,
//   },
//   {
//     id: '',
//     title: 'ElasticSearch',
//     columnId: 'column-5',
//     status: EnumTodoStatus.Todo,
//     position: 4,
//   },
//   {
//     id: '',
//     title: 'Cassandra',
//     columnId: 'column-5',
//     status: EnumTodoStatus.Todo,
//     position: 5,
//   },
//   {
//     id: '',
//     title: 'TimescaleDB',
//     columnId: 'column-5',
//     status: EnumTodoStatus.Todo,
//     position: 6,
//   },
//   {
//     id: '',
//     title: 'ClickHouse',
//     columnId: 'column-5',
//     status: EnumTodoStatus.Todo,
//     position: 7,
//   },
//   {
//     id: '',
//     title: 'Linux',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 0,
//   },
//   {
//     id: '',
//     title: 'Bash',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 1,
//   },
//   {
//     id: '',
//     title: 'Docker',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 2,
//   },
//   {
//     id: '',
//     title: 'Docker-compose',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 3,
//   },
//   {
//     id: '',
//     title: 'Portainer',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 4,
//   },
//   {
//     id: '',
//     title: 'Buildkite',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 5,
//   },
//   {
//     id: '',
//     title: 'TeamCity',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 6,
//   },
//   {
//     id: '',
//     title: 'Nginx',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 7,
//   },
//   {
//     id: '',
//     title: 'Envoy',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 8,
//   },
//   {
//     id: '',
//     title: 'Chronograf',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 9,
//   },
//   {
//     id: '',
//     title: 'Telegraf',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 10,
//   },
//   {
//     id: '',
//     title: 'Prometheus',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 11,
//   },
//   {
//     id: '',
//     title: 'Nodeexporter',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 12,
//   },
//   {
//     id: '',
//     title: 'Grafana',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 13,
//   },
//   {
//     id: '',
//     title: 'Launchdarky',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 14,
//   },
//   {
//     id: '',
//     title: 'Firewall',
//     columnId: 'column-6',
//     status: EnumTodoStatus.Todo,
//     position: 15,
//   },
//   {
//     id: '',
//     title: 'npm',
//     columnId: 'column-7',
//     status: EnumTodoStatus.Todo,
//     position: 0,
//   },
//   {
//     id: '',
//     title: 'RxJS',
//     columnId: 'column-7',
//     status: EnumTodoStatus.Todo,
//     position: 1,
//   },
//   {
//     id: '',
//     title: 'Insomnia',
//     columnId: 'column-7',
//     status: EnumTodoStatus.Todo,
//     position: 2,
//   },
//   {
//     id: '',
//     title: 'Jira',
//     columnId: 'column-7',
//     status: EnumTodoStatus.Todo,
//     position: 3,
//   },
//   {
//     id: '',
//     title: 'Confluence',
//     columnId: 'column-7',
//     status: EnumTodoStatus.Todo,
//     position: 4,
//   },
//   {
//     id: '',
//     title: 'Slack',
//     columnId: 'column-7',
//     status: EnumTodoStatus.Todo,
//     position: 5,
//   },
//   {
//     id: '',
//     title: 'Hyper',
//     columnId: 'column-7',
//     status: EnumTodoStatus.Todo,
//     position: 6,
//   },
//   {
//     id: '',
//     title: 'Gitkraken',
//     columnId: 'column-7',
//     status: EnumTodoStatus.Todo,
//     position: 7,
//   },
//   {
//     id: '',
//     title: 'WebStorm',
//     columnId: 'column-7',
//     status: EnumTodoStatus.Todo,
//     position: 8,
//   },
// ].map((el) => ({ ...el, id: `todo-${(count += 1).toString()}` }));

export const TodosReducer = createReducer(initialState, (builder) => builder
  .addCase(TodosActions.setAll, (state, action) => action.payload)
  .addCase(TodosActions.updateTitle, (draft, action) => {
    draft[draft.findIndex((todo) => todo.id === action.payload.id)].title = action.payload.title;
  })
  .addCase(TodosActions.updateDescription, (draft, action) => {
    draft[draft.findIndex((todo) => todo.id === action.payload.id)].description = action.payload.description;
  })
  .addCase(TodosActions.updateCompleteStatus, (draft, action) => {
    draft[draft.findIndex((todo) => todo.id === action.payload.id)].status = action.payload.status;
  })
  .addCase(TodosActions.updateColor, (draft, action) => {
    draft[draft.findIndex((todo) => todo.id === action.payload.id)].color = action.payload.color;
  })
  .addCase(TodosActions.updateIsArchive, (draft, action) => {
    draft[draft.findIndex((todo) => todo.id === action.payload.id)].isArchived = action.payload.isArchived;
  })
  .addCase(TodosActions.updateNotificationEnabled, (draft, action) => {
    draft[draft.findIndex((todo) => todo.id === action.payload.id)].isNotificationsEnabled = action.payload.isNotificationsEnabled;
  })
  .addCase(TodosActions.add, (draft, action) => {
    draft.push(action.payload);
  })
  .addCase(TodosActions.updatePosition, (state, action) => {
    const {
      columnId, sourcePosition, destinationPosition, targetColumnId,
    } = action.payload;
    const sourceColumn = state
      .filter((todo: ITodo) => todo.columnId === columnId)
      .sort((a, b) => a.position - b.position);
    const targetColumn = state
      .filter((todo: ITodo) => todo.columnId === targetColumnId)
      .sort((a, b) => a.position - b.position);
    const filterOtherColumn = targetColumnId
      ? (todo: ITodo) => todo.columnId !== columnId && todo.columnId !== targetColumnId
      : (todo: ITodo) => todo.columnId !== columnId;
    const otherColumns = state.filter(filterOtherColumn);
    const targetTodoIndex = sourceColumn
      .findIndex((todo: ITodo) => todo.position === sourcePosition);
    const targetTodo = sourceColumn[targetTodoIndex];
    sourceColumn.splice(targetTodoIndex, 1);

    if (targetColumnId) {
      targetColumn.splice(destinationPosition, 0, {
        ...targetTodo,
        position: destinationPosition,
        columnId: targetColumnId,
      });
    } else {
      sourceColumn.splice(destinationPosition, 0, {
        ...targetTodo,
        position: destinationPosition,
      });
    }

    const newSourceColumn = sourceColumn.map((todo, index) => ({
      ...todo,
      position: index,
    }));

    if (targetColumnId) {
      const newTargetColumn = targetColumn.map((todo, index) => ({
        ...todo,
        position: index,
      }));
      return [
        ...otherColumns,
        ...newSourceColumn,
        ...newTargetColumn,
      ];
    }
    return [
      ...otherColumns,
      ...newSourceColumn,
    ];
  })
  .addCase(TodosActions.insertInPosition, (state, action) => {
    const { position, columnId } = action.payload;
    const targetColumn = state
      .filter((todo: ITodo) => todo.columnId === columnId)
      .sort((a, b) => a.position - b.position);
    const otherColumns = state
      .filter((todo: ITodo) => todo.columnId !== columnId);
    const spliceIndex = targetColumn.findIndex((todo: ITodo) => todo.position === position);
    const normalizedSpliceIndex = spliceIndex === -1 ? targetColumn.length : spliceIndex;
    const { belowId, ...newTodo } = action.payload;
    targetColumn.splice(normalizedSpliceIndex, 0, newTodo);
    const newTargetColumn = targetColumn.map((todo: ITodo, index) => ({
      ...todo,
      position: index,
    }));
    return [
      ...otherColumns,
      ...newTargetColumn,
    ];
  })
  .addCase(TodosActions.remove, (state, action) => {
    let columnId: number | null = null;
    const todosAfterDelete = state.filter((todo: ITodo) => {
      if (todo.id !== action.payload.id) {
        return true;
      }
      columnId = todo.columnId;
      return false;
    });
    if (columnId) {
      const todosInColumn = todosAfterDelete
        .filter((todo: ITodo) => todo.columnId === columnId)
        .sort((a, b) => a.position - b.position)
        .map((todo: ITodo, index) => ({
          ...todo,
          position: index,
        }));
      const otherTodos = [...todosAfterDelete]
        .filter((todo: ITodo) => todo.columnId !== columnId);
      return [
        ...todosInColumn,
        ...otherTodos,
      ];
    }
    return state;
  })
  .addCase(TodosActions.drawBelow, (state, action) => {
    const { belowId, columnId } = action.payload;
    const todosInColumn = [...state]
      .sort((a, b) => a.position - b.position)
      .filter((todo: ITodo) => todo.columnId === columnId);
    const otherTodos = [...state]
      .filter((todo: ITodo) => todo.columnId !== columnId);
    const spliceIndex = todosInColumn.findIndex((todo: ITodo) => todo.id === belowId);
    todosInColumn.splice(spliceIndex + 1, 0, {
      id: 0,
      columnId,
      belowId,
      position: spliceIndex + 1,
      title: '',
      commentsCount: 0,
      imagesCount: 0,
      attachmentsCount: 0,
    });
    const sortedTodos = todosInColumn
      .map((todo: ITodo, index) => ({
        ...todo,
        position: index,
      }));
    return [
      ...sortedTodos,
      ...otherTodos,
    ];
  })
  .addCase(TodosActions.removeTemp, (state) => {
    const columnIds = new Set();
    state.forEach((todo: ITodo) => columnIds.add(todo.columnId));
    let todos: ITodos = [];
    columnIds.forEach((columnId) => {
      const todosInColumn = state
        .filter((todo: ITodo) => todo.columnId === columnId)
        .filter((todo: ITodo) => todo.belowId === undefined)
        .sort((a: ITodo, b: ITodo) => a.position - b.position)
        .map((todo: ITodo, index) => ({
          ...todo,
          position: index,
        }));
      todos = [...todos, ...todosInColumn];
    });
    return todos;
  }));
