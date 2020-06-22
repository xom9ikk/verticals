/* eslint-disable no-plusplus */
import { handleActions } from 'redux-actions';
import { TodosActions } from '../actions';
import { ITodo, ITodos } from '../../types';

let count = 0;
const initialState: ITodos = [
  {
    id: '',
    title: 'Javascript',
    columnId: 'column-1',
    isDone: false,
    position: 0,
  },
  {
    id: '',
    title: 'ES6+',
    columnId: 'column-1',
    isDone: false,
    position: 1,
  },
  {
    id: '',
    title: 'Typescript',
    columnId: 'column-1',
    isDone: false,
    position: 2,
  },
  {
    id: '',
    title: 'NodeJS',
    columnId: 'column-1',
    isDone: false,
    position: 3,
  },
  {
    id: '',
    title: 'Semver',
    columnId: 'column-1',
    isDone: false,
    position: 4,
  },
  {
    id: '',
    title: 'WebSocket',
    columnId: 'column-1',
    isDone: false,
    position: 5,
  },
  {
    id: '',
    title: 'Rest API',
    columnId: 'column-1',
    isDone: false,
    position: 6,
  },
  {
    id: '',
    title: 'JSON',
    columnId: 'column-1',
    isDone: false,
    position: 7,
  },
  {
    id: '',
    title: 'Microservices architecture',
    columnId: 'column-1',
    isDone: false,
    position: 8,
  },
  {
    id: '',
    title: 'gRPC',
    columnId: 'column-1',
    isDone: false,
    position: 9,
  },
  {
    id: '',
    title: 'Protobuf',
    columnId: 'column-1',
    isDone: false,
    position: 10,
  },
  {
    id: '',
    title: 'Git',
    columnId: 'column-1',
    isDone: false,
    position: 11,
  },
  {
    id: '',
    title: 'BunnyCDN',
    columnId: 'column-1',
    isDone: false,
    position: 12,
  },
  {
    id: '',
    title: 'Google Cloud',
    columnId: 'column-1',
    isDone: false,
    position: 13,
  },
  {
    id: '',
    title: 'FFmpeg',
    columnId: 'column-1',
    isDone: false,
    position: 14,
  },
  {
    id: '',
    title: 'Cuda',
    columnId: 'column-1',
    isDone: false,
    position: 15,
  },
  {
    id: '',
    title: 'WebRTC',
    columnId: 'column-1',
    isDone: false,
    position: 16,
  },
  {
    id: '',
    title: 'RTMP',
    columnId: 'column-1',
    isDone: false,
    position: 17,
  },
  {
    id: '',
    title: 'HLS',
    columnId: 'column-1',
    isDone: false,
    position: 18,
  },
  {
    id: '',
    title: 'MPEG-DASH',
    columnId: 'column-1',
    isDone: false,
    position: 19,
  },
  {
    id: '',
    title: 'Axios',
    columnId: 'column-2',
    isDone: false,
    position: 0,
  },
  {
    id: '',
    title: 'Webpack',
    columnId: 'column-2',
    isDone: false,
    position: 1,
  },
  {
    id: '',
    title: 'Ava/Mocha/Chai/JEST',
    columnId: 'column-2',
    isDone: false,
    position: 2,
  },
  {
    id: '',
    title: 'Lodash',
    columnId: 'column-2',
    isDone: false,
    position: 3,
  },
  {
    id: '',
    title: 'Underscore',
    columnId: 'column-2',
    isDone: false,
    position: 4,
  },
  {
    id: '',
    title: 'Ramda',
    columnId: 'column-2',
    isDone: false,
    position: 5,
  },
  {
    id: '',
    title: 'Date-fns',
    columnId: 'column-2',
    isDone: false,
    position: 6,
  },
  {
    id: '',
    title: 'Mongoose',
    columnId: 'column-2',
    isDone: false,
    position: 7,
  },
  {
    id: '',
    title: 'Express',
    columnId: 'column-2',
    isDone: false,
    position: 8,
  },
  {
    id: '',
    title: 'Moment.js',
    columnId: 'column-2',
    isDone: false,
    position: 9,
  },
  {
    id: '',
    title: 'JWT',
    columnId: 'column-2',
    isDone: false,
    position: 10,
  },
  {
    id: '',
    title: 'Socket.io',
    columnId: 'column-2',
    isDone: false,
    position: 11,
  },
  {
    id: '',
    title: 'ZeroMQ',
    columnId: 'column-2',
    isDone: false,
    position: 12,
  },
  {
    id: '',
    title: 'Sequalize',
    columnId: 'column-2',
    isDone: false,
    position: 13,
  },
  {
    id: '',
    title: 'TypeORM',
    columnId: 'column-2',
    isDone: false,
    position: 14,
  },
  {
    id: '',
    title: 'Swagger',
    columnId: 'column-2',
    isDone: false,
    position: 15,
  },
  {
    id: '',
    title: 'Sentry',
    columnId: 'column-2',
    isDone: false,
    position: 16,
  },
  {
    id: '',
    title: 'Redux',
    columnId: 'column-2',
    isDone: false,
    position: 17,
  },
  {
    id: '',
    title: 'Redux-thunk',
    columnId: 'column-2',
    isDone: false,
    position: 18,
  },
  {
    id: '',
    title: 'Redux-saga',
    columnId: 'column-2',
    isDone: false,
    position: 19,
  },
  {
    id: '',
    title: 'Pino',
    columnId: 'column-2',
    isDone: false,
    position: 20,
  },
  {
    id: '',
    title: 'Knex',
    columnId: 'column-2',
    isDone: false,
    position: 21,
  },
  {
    id: '',
    title: 'Bignumber',
    columnId: 'column-2',
    isDone: false,
    position: 22,
  },
  {
    id: '',
    title: 'Vue.js',
    columnId: 'column-3',
    isDone: false,
    position: 0,
  },
  {
    id: '',
    title: 'Nuxt.js',
    columnId: 'column-3',
    isDone: false,
    position: 1,
  },
  {
    id: '',
    title: 'Angular 9',
    columnId: 'column-3',
    isDone: false,
    position: 2,
  },
  {
    id: '',
    title: 'React',
    columnId: 'column-3',
    isDone: false,
    position: 3,
  },
  {
    id: '',
    title: 'Next.js',
    columnId: 'column-3',
    isDone: false,
    position: 4,
  },
  {
    id: '',
    title: 'Pug',
    columnId: 'column-3',
    isDone: false,
    position: 5,
  },
  {
    id: '',
    title: 'SCSS/SASS',
    columnId: 'column-3',
    isDone: false,
    position: 6,
  },
  {
    id: '',
    title: 'Babel',
    columnId: 'column-3',
    isDone: false,
    position: 7,
  },
  {
    id: '',
    title: 'Gulp',
    columnId: 'column-3',
    isDone: false,
    position: 8,
  },
  {
    id: '',
    title: 'Zeit',
    columnId: 'column-3',
    isDone: false,
    position: 9,
  },
  {
    id: '',
    title: 'Nest.js',
    columnId: 'column-4',
    isDone: false,
    position: 0,
  },
  {
    id: '',
    title: 'GraphQL',
    columnId: 'column-4',
    isDone: false,
    position: 1,
  },
  {
    id: '',
    title: 'RabbitMQ',
    columnId: 'column-4',
    isDone: false,
    position: 2,
  },
  {
    id: '',
    title: 'PostgreSQL',
    columnId: 'column-5',
    isDone: false,
    position: 0,
  },
  {
    id: '',
    title: 'MongoDB',
    columnId: 'column-5',
    isDone: false,
    position: 1,
  },
  {
    id: '',
    title: 'Redis',
    columnId: 'column-5',
    isDone: false,
    position: 2,
  },
  {
    id: '',
    title: 'InfluxDB',
    columnId: 'column-5',
    isDone: false,
    position: 3,
  },
  {
    id: '',
    title: 'ElasticSearch',
    columnId: 'column-5',
    isDone: false,
    position: 4,
  },
  {
    id: '',
    title: 'Cassandra',
    columnId: 'column-5',
    isDone: false,
    position: 5,
  },
  {
    id: '',
    title: 'TimescaleDB',
    columnId: 'column-5',
    isDone: false,
    position: 6,
  },
  {
    id: '',
    title: 'ClickHouse',
    columnId: 'column-5',
    isDone: false,
    position: 7,
  },
  {
    id: '',
    title: 'Linux',
    columnId: 'column-6',
    isDone: false,
    position: 0,
  },
  {
    id: '',
    title: 'Bash',
    columnId: 'column-6',
    isDone: false,
    position: 1,
  },
  {
    id: '',
    title: 'Docker',
    columnId: 'column-6',
    isDone: false,
    position: 2,
  },
  {
    id: '',
    title: 'Docker-compose',
    columnId: 'column-6',
    isDone: false,
    position: 3,
  },
  {
    id: '',
    title: 'Portainer',
    columnId: 'column-6',
    isDone: false,
    position: 4,
  },
  {
    id: '',
    title: 'Buildkite',
    columnId: 'column-6',
    isDone: false,
    position: 5,
  },
  {
    id: '',
    title: 'TeamCity',
    columnId: 'column-6',
    isDone: false,
    position: 6,
  },
  {
    id: '',
    title: 'Nginx',
    columnId: 'column-6',
    isDone: false,
    position: 7,
  },
  {
    id: '',
    title: 'Envoy',
    columnId: 'column-6',
    isDone: false,
    position: 8,
  },
  {
    id: '',
    title: 'Chronograf',
    columnId: 'column-6',
    isDone: false,
    position: 9,
  },
  {
    id: '',
    title: 'Telegraf',
    columnId: 'column-6',
    isDone: false,
    position: 10,
  },
  {
    id: '',
    title: 'Prometheus',
    columnId: 'column-6',
    isDone: false,
    position: 11,
  },
  {
    id: '',
    title: 'Nodeexporter',
    columnId: 'column-6',
    isDone: false,
    position: 12,
  },
  {
    id: '',
    title: 'Grafana',
    columnId: 'column-6',
    isDone: false,
    position: 13,
  },
  {
    id: '',
    title: 'Launchdarky',
    columnId: 'column-6',
    isDone: false,
    position: 14,
  },
  {
    id: '',
    title: 'Firewall',
    columnId: 'column-6',
    isDone: false,
    position: 15,
  },
  {
    id: '',
    title: 'npm',
    columnId: 'column-7',
    isDone: false,
    position: 0,
  },
  {
    id: '',
    title: 'RxJS',
    columnId: 'column-7',
    isDone: false,
    position: 1,
  },
  {
    id: '',
    title: 'Insomnia',
    columnId: 'column-7',
    isDone: false,
    position: 2,
  },
  {
    id: '',
    title: 'Jira',
    columnId: 'column-7',
    isDone: false,
    position: 3,
  },
  {
    id: '',
    title: 'Confluence',
    columnId: 'column-7',
    isDone: false,
    position: 4,
  },
  {
    id: '',
    title: 'Slack',
    columnId: 'column-7',
    isDone: false,
    position: 5,
  },
  {
    id: '',
    title: 'Hyper',
    columnId: 'column-7',
    isDone: false,
    position: 6,
  },
  {
    id: '',
    title: 'Gitkraken',
    columnId: 'column-7',
    isDone: false,
    position: 7,
  },
  {
    id: '',
    title: 'WebStorm',
    columnId: 'column-7',
    isDone: false,
    position: 8,
  },
].map((el) => ({ ...el, id: `todo-${(count += 1).toString()}` }));

export const TodosReducer = handleActions<ITodos, any>({
  [TodosActions.Type.SET_TODOS]:
        (state, action) => ([...action.payload]),
  [TodosActions.Type.UPDATE_TITLE]:
      (state, action) => (state.map((todo: ITodo) => (todo.id === action.payload.id
        ? {
          ...todo,
          title: action.payload.title,
        }
        : todo))),
  [TodosActions.Type.UPDATE_DESCRIPTION]:
      (state, action) => (state.map((todo: ITodo) => (todo.id === action.payload.id
        ? {
          ...todo,
          description: action.payload.description,
        }
        : todo))),
  [TodosActions.Type.ADD]:
        (state, action) => ([...state, {
          id: Math.random().toString(),
          ...action.payload,
        }]),
  [TodosActions.Type.UPDATE_COLUMN]:
        (state, action) => {
          const {
            id, sourceColumnId, targetColumnId, position,
          } = action.payload;
          const targetColumn = state
            .filter((todo: ITodo) => todo.columnId === targetColumnId)
            .sort((a, b) => a.position - b.position);
          const sourceColumn = state
            .filter((todo: ITodo) => todo.columnId === sourceColumnId
                && todo.id !== id)
            .sort((a, b) => a.position - b.position);
          const otherColumns = state
            .filter((todo: ITodo) => todo.columnId !== targetColumnId
                && todo.columnId !== sourceColumnId);
          const targetTodo = {
            ...state.filter((todo: ITodo) => todo.id === id)[0],
            columnId: targetColumnId,
            position,
          };

          targetColumn.splice(position, 0, targetTodo);

          let positionCounter: number = position + 1;
          let isInsert = false;

          const newTargetColumn = targetColumn.map((todo: ITodo) => {
            if (todo.id === id) {
              isInsert = true;
              return {
                ...todo,
                columnId: targetColumnId,
                position,
              };
            }
            if (isInsert) {
              return {
                ...todo,
                position: positionCounter++,
              };
            }
            return todo;
          });

          const newSourceColumn = sourceColumn.map((todo: ITodo, index) => ({
            ...todo,
            position: index,
          }));
          return [
            ...otherColumns,
            ...newTargetColumn,
            ...newSourceColumn,
          ];
        },
  [TodosActions.Type.UPDATE_POSITION]:
        (state, action) => {
          const {
            id, position, columnId,
          } = action.payload;
          const targetColumn = state
            .filter((todo: ITodo) => todo.columnId === columnId)
            .sort((a, b) => a.position - b.position);
          const targetTodo = targetColumn
            .filter((todo: ITodo) => todo.id === id)[0];
          const targetTodoIndex = targetColumn
            .findIndex((todo: ITodo) => todo.id === id);
          const otherColumns = state
            .filter((todo: ITodo) => todo.columnId !== columnId);
          targetColumn.splice(targetTodoIndex, 1);
          targetColumn.splice(position, 0, {
            ...targetTodo, position,
          });
          const newTargetColumn = targetColumn.map((todo, index) => ({
            ...todo,
            position: index,
          }));
          return [
            ...otherColumns,
            ...newTargetColumn,
          ];
        },
}, initialState);
