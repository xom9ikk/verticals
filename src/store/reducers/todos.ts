import {
  ITodos,
} from '@type/entities';
import { createReducer } from '@reduxjs/toolkit';
import { TEMP_ID } from '@/constants';
import { TodosActions } from '../actions';

const initialState: ITodos = {
  entities: [],
  positions: {},
};
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
    const { id, title } = action.payload;
    draft.entities[draft.entities.findIndex((todo) => todo.id === id)].title = title;
  })
  .addCase(TodosActions.updateDescription, (draft, action) => {
    const { id, description } = action.payload;
    draft.entities[draft.entities.findIndex((todo) => todo.id === id)].description = description;
  })
  .addCase(TodosActions.updateCompleteStatus, (draft, action) => {
    const { id, status } = action.payload;
    draft.entities[draft.entities.findIndex((todo) => todo.id === id)].status = status;
  })
  .addCase(TodosActions.updateColor, (draft, action) => {
    const { id, color } = action.payload;
    draft.entities[draft.entities.findIndex((todo) => todo.id === id)].color = color;
  })
  .addCase(TodosActions.updateIsArchive, (draft, action) => {
    const { id, isArchived } = action.payload;
    draft.entities[draft.entities.findIndex((todo) => todo.id === id)].isArchived = isArchived;
  })
  .addCase(TodosActions.updateNotificationEnabled, (draft, action) => {
    const { id, isNotificationsEnabled } = action.payload;
    draft.entities[draft.entities.findIndex((todo) => todo.id === id)].isNotificationsEnabled = isNotificationsEnabled;
  })
  .addCase(TodosActions.add, (draft, action) => {
    const { id, columnId } = action.payload;

    draft.entities.push(action.payload);
    draft.positions[columnId].push(id);
  })
  .addCase(TodosActions.insertInPosition, (draft, action) => {
    const { position, entity } = action.payload;

    draft.entities.push(entity);
    draft.positions[entity.columnId].splice(position, 0, entity.id);
  })
  .addCase(TodosActions.remove, (draft, action) => {
    const { id } = action.payload;

    const entityIndex = draft.entities.findIndex((column) => column.id === id);
    const { columnId } = draft.entities[entityIndex]; // TODO: try move below
    if (entityIndex !== -1) draft.entities.splice(entityIndex, 1);

    const positionIndex = draft.positions[columnId].findIndex((todoId) => todoId === id);
    if (positionIndex !== -1) draft.positions[columnId].splice(positionIndex, 1);
  })
  .addCase(TodosActions.drawBelow, (draft, action) => {
    const { belowId, columnId } = action.payload;

    const positionIndex = draft.positions[columnId].findIndex((todoId) => todoId === belowId);

    draft.entities.push({
      id: TEMP_ID,
      columnId,
      belowId,
      title: '',
      commentsCount: 0,
      imagesCount: 0,
      attachmentsCount: 0,
    });

    draft.positions[columnId].splice(positionIndex + 1, 0, TEMP_ID);
  })
  .addCase(TodosActions.updatePosition, (draft, action) => {
    const {
      columnId, sourcePosition, destinationPosition, targetColumnId,
    } = action.payload;

    if (targetColumnId) {
      const todoId = draft.positions[columnId][sourcePosition];
      draft.entities[draft.entities.findIndex((todo) => todo.id === todoId)].columnId = targetColumnId;
      draft.positions[columnId].splice(sourcePosition, 1);
      draft.positions[columnId].splice(destinationPosition, 0, todoId);
    } else {
      draft.positions[columnId].splice(destinationPosition, 0, draft.positions[columnId].splice(sourcePosition, 1)[0]);
    }
  })
  .addCase(TodosActions.removeTemp, (draft) => {
    const entityIndex = draft.entities.findIndex((todo) => todo.id === TEMP_ID);
    const { columnId } = draft.entities[entityIndex];
    if (entityIndex !== -1) draft.entities.splice(entityIndex, 1);

    const positionIndex = draft.positions[columnId].findIndex((todoId) => todoId === TEMP_ID);
    if (positionIndex !== -1) draft.positions[columnId].splice(positionIndex, 1);
  }));
