import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Sidebar } from '../components/Sidebar';
import { Columns } from '../components/Columns';
import { SystemActions } from '../store/actions';

let count = 0;

const data = [
  {
    id: 'id1',
    title: 'The basics',
    description: 'Technologies, frameworks etc. for studying',
    todos: [
      {
        title: 'Javascript',
        isDone: false,
      },
      {
        title: 'ES6+',
        isDone: false,
      },
      {
        title: 'Typescript',
        isDone: false,
      },
      {
        title: 'NodeJS',
        isDone: false,
      },
      {
        title: 'Semver',
        isDone: false,
      },
      {
        title: 'WebSocket',
        isDone: false,
      },
      {
        title: 'Rest API',
        isDone: false,
      },
      {
        title: 'JSON',
        isDone: false,
      },
      {
        title: 'Microservices architecture',
        isDone: false,
      },
      {
        title: 'gRPC',
        isDone: false,
      },
      {
        title: 'Protobuf',
        isDone: false,
      },
      {
        title: 'Git',
        isDone: false,
      },
      {
        title: 'BunnyCDN',
        isDone: false,
      },
      {
        title: 'Google Cloud',
        isDone: false,
      },
      {
        title: 'FFmpeg',
        isDone: false,
      },
      {
        title: 'Cuda',
        isDone: false,
      },
      {
        title: 'WebRTC',
        isDone: false,
      },
      {
        title: 'RTMP',
        isDone: false,
      },
      {
        title: 'HLS',
        isDone: false,
      },
      {
        title: 'MPEG-DASH',
        isDone: false,
      },
    ].map((el) => ({ ...el, id: `id-${(count += 1).toString()}` })),
  },
  {
    id: 'id2',
    title: 'Modules',
    description: 'Modules from npm',
    todos: [
      {
        title: 'Axios',
        isDone: false,
      },
      {
        title: 'Webpack',
        isDone: false,
      },
      {
        title: 'Ava/Mocha/Chai/JEST',
        isDone: false,
      },
      {
        title: 'Lodash',
        isDone: false,
      },
      {
        title: 'Underscore',
        isDone: false,
      },
      {
        title: 'Ramda',
        isDone: false,
      },
      {
        title: 'Date-fns',
        isDone: false,
      },
      {
        title: 'Mongoose',
        isDone: false,
      },
      {
        title: 'Express',
        isDone: false,
      },
      {
        title: 'Moment.js',
        isDone: false,
      },
      {
        title: 'JWT',
        isDone: false,
      },
      {
        title: 'Socket.io',
        isDone: false,
      },
      {
        title: 'ZeroMQ',
        isDone: false,
      },
      {
        title: 'Sequalize',
        isDone: false,
      },
      {
        title: 'TypeORM',
        isDone: false,
      },
      {
        title: 'Swagger',
        isDone: false,
      },
      {
        title: 'Sentry',
        isDone: false,
      },
      {
        title: 'Redux',
        isDone: false,
      },
      {
        title: 'Redux-thunk',
        isDone: false,
      },
      {
        title: 'Redux-saga',
        isDone: false,
      },
      {
        title: 'Pino',
        isDone: false,
      },
      {
        title: 'Knex',
        isDone: false,
      },
      {
        title: 'Bignumber',
        isDone: false,
      },
    ].map((el) => ({ ...el, id: `id-${(count += 1).toString()}` })),
  },
  {
    id: 'id3',
    title: 'Frontend',
    description: 'All for frontend',
    todos: [
      {
        title: 'Vue.js',
        isDone: false,
      },
      {
        title: 'Nuxt.js',
        isDone: false,
      },
      {
        title: 'Angular 9',
        isDone: false,
      },
      {
        title: 'React',
        isDone: false,
      },
      {
        title: 'Next.js',
        isDone: false,
      },
      {
        title: 'Pug',
        isDone: false,
      },
      {
        title: 'SCSS/SASS',
        isDone: false,
      },
      {
        title: 'Babel',
        isDone: false,
      },
      {
        title: 'Gulp',
        isDone: false,
      },
      {
        title: 'Zeit',
        isDone: false,
      },
    ].map((el) => ({ ...el, id: `id-${(count += 1).toString()}` })),
  },
  {
    id: 'id4',
    title: 'Backend',
    description: 'Technologies, frameworks etc. for studying',
    todos: [
      {
        title: 'Nest.js',
        isDone: false,
      },
      {
        title: 'GraphQL',
        isDone: false,
      },
      {
        title: 'RabbitMQ',
        isDone: false,
      },
    ].map((el) => ({ ...el, id: `id-${(count += 1).toString()}` })),
  },
  {
    id: 'id5',
    title: 'Databases',
    description: 'All databases',
    todos: [
      {
        title: 'PostgreSQL',
        isDone: false,
      },
      {
        title: 'MongoDB',
        isDone: false,
      },
      {
        title: 'Redis',
        isDone: false,
      },
      {
        title: 'InfluxDB',
        isDone: false,
      },
      {
        title: 'ElasticSearch',
        isDone: false,
      },
      {
        title: 'Cassandra',
        isDone: false,
      },
      {
        title: 'TimescaleDB',
        isDone: false,
      },
      {
        title: 'ClickHouse',
        isDone: false,
      },
    ].map((el) => ({ ...el, id: `id-${(count += 1).toString()}` })),
  },
  {
    id: 'id6',
    title: 'DevOps',
    description: 'Things for DevOps',
    todos: [
      {
        title: 'Linux',
        isDone: false,
      },
      {
        title: 'Bash',
        isDone: false,
      },
      {
        title: 'Docker',
        isDone: false,
      },
      {
        title: 'Docker-compose',
        isDone: false,
      },
      {
        title: 'Portainer',
        isDone: false,
      },
      {
        title: 'Buildkite',
        isDone: false,
      },
      {
        title: 'TeamCity',
        isDone: false,
      },
      {
        title: 'Nginx',
        isDone: false,
      },
      {
        title: 'Envoy',
        isDone: false,
      },
      {
        title: 'Chronograf',
        isDone: false,
      },
      {
        title: 'Telegraf',
        isDone: false,
      },
      {
        title: 'Prometheus',
        isDone: false,
      },
      {
        title: 'Nodeexporter',
        isDone: false,
      },
      {
        title: 'Grafana',
        isDone: false,
      },
      {
        title: 'Launchdarky',
        isDone: false,
      },
      {
        title: 'Firewall',
        isDone: false,
      },
    ].map((el) => ({ ...el, id: `id-${(count += 1).toString()}` })),
  },
  {
    id: 'id7',
    title: 'Instruments',
    description: 'Just cool instruments for dev',
    todos: [
      {
        title: 'npm',
        isDone: false,
      },
      {
        title: 'RxJS',
        isDone: false,
      },
      {
        title: 'Insomnia',
        isDone: false,
      },
      {
        title: 'Jira',
        isDone: false,
      },
      {
        title: 'Confluence',
        isDone: false,
      },
      {
        title: 'Slack',
        isDone: false,
      },
      {
        title: 'Hyper',
        isDone: false,
      },
      {
        title: 'Gitkraken',
        isDone: false,
      },
      {
        title: 'WebStorm',
        isDone: false,
      },
    ].map((el) => ({ ...el, id: `id-${(count += 1).toString()}` })),
  },
];

const dataV2 = {};
data.forEach((el) => {
  // @ts-ignore
  dataV2[el.id] = {
    title: el.title,
    description: el.description,
    todos: el.todos,
  };
});

export const Main: FC = () => {
  const dispatch = useDispatch();

  const keydownHandler = (event: any) => {
    switch (event.code) {
      case 'Escape': {
        dispatch(SystemActions.setIsOpenPopup(false));
        dispatch(SystemActions.setIsEditableCard(false));
        break;
      }
      default: break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);
  return (
    <div className="container container--horizontal">
      <Sidebar />
      <Columns
            // @ts-ignore
        initialColumns={dataV2}
      />
    </div>
  );
};
