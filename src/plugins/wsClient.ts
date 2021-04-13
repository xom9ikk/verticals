import { injectable } from 'inversify';
import 'reflect-metadata';
import { IWSClient } from '@inversify/interfaces/wsClient';
import { storage } from '@plugins/storage';
import { AuthRefresher } from '@plugins/authRefresher';
import { container } from '@inversify/config';
import { TYPES } from '@inversify/types';
import { IHttpClient } from '@inversify/interfaces/httpClient';

@injectable()
export class WSClient implements IWSClient {
  instances: {
    [path: string]: WebSocket;
  };

  listeners: {
    [path: string]: {
      [channel: string]: Array<(data: any) => void>;
    };
  };

  private readonly authRefresher: AuthRefresher<string>;

  constructor() {
    this.instances = {};
    this.listeners = {};

    const httpClient = container.get<IHttpClient>(TYPES.HttpClient);
    this.authRefresher = new AuthRefresher<string>(httpClient, this.handleReconnect.bind(this));
  }

  handleReconnect(path: string) {
    console.log('try reconnect');
    delete this.instances[path];
    this.open(path);
  }

  close(path: string) {
    if (this.instances[path]) {
      this.instances[path].close();
      delete this.instances[path];
      delete this.listeners[path];
    }
  }

  open(path: string) {
    const authQuery = WSClient.getAuthQuery();
    if (this.instances[path]) {
      return;
    }

    this.instances[path] = new WebSocket(`${process.env.WS_URL}${path}${authQuery}`);

    this.instances[path].addEventListener('open', (event) => {
      console.log('opened', path, event);
    });

    this.instances[path].addEventListener('message', (event) => {
      const { channel, data } = JSON.parse(event.data);
      // console.log('message', path, event, this.listeners);
      if (this.listeners?.[path]?.[channel]) {
        this.listeners[path][channel].forEach((callback) => {
          callback(data);
        });
      }
    });

    this.instances[path].addEventListener('error', (event) => {
      console.log('error', path, event);
    });

    this.instances[path].addEventListener(
      'close',
      async (event) => {
        await this.authRefresher.websocketResponseInterceptor(event, path);
      },
    );
  }

  on<T>(path: string, channel: string, callback: T) {
    if (!this.listeners[path]) {
      this.listeners[path] = {};
    }
    if (!this.listeners[path][channel]) {
      this.listeners[path][channel] = [];
    }
    // @ts-ignore
    this.listeners[path][channel].push(callback);
  }

  emit(path: string, method: string, data: Object = {}) {
    console.log('emit', path, method, data);
    if (this.instances[path]) {
      this.instances[path].send(JSON.stringify(data));
    }
  }

  private static getAuthQuery() {
    const token = storage.getToken();
    return `?authorization=${process.env.AUTH_PREFIX}${token}`;
  }
}
