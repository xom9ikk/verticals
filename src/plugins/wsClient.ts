/* eslint-disable no-underscore-dangle,class-methods-use-this */
import { injectable } from 'inversify';
import 'reflect-metadata';
// import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
// import { IRefreshResponse } from '@type/api';
import { IWSClient } from '@inversify/interfaces/wsClient';
import { storage } from './storage';

const { WS_URL } = process.env;

const AUTH_PREFIX = 'Bearer ';
// const UNAUTHORIZED_STATUS = 401;
// const REFRESH_ROUTE = '/auth/refresh';

// interface IPairTokens {
//   token: string;
//   refreshToken: string;
// }

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

  constructor() {
    this.instances = {};
    this.listeners = {};
    console.log('constructor ws', this.instances);
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

    console.log('path', path);
    console.log('authQuery', authQuery);
    console.log('this.instances', this);
    if (this.instances[path]) {
      return;
    }

    this.instances[path] = new WebSocket(`${WS_URL}${path}${authQuery}`);

    this.instances[path].addEventListener('open', (event) => {
      console.log('opened', path, event);
    });

    this.instances[path].addEventListener('message', (event) => {
      const { channel, data } = JSON.parse(event.data);
      console.log('message', path, event, this.listeners);
      if (this.listeners?.[path]?.[channel]) {
        this.listeners[path][channel].forEach((callback) => {
          callback(data);
        });
      }
    });

    this.instances[path].addEventListener('error', (event) => {
      console.log('error', path, event);
    });

    this.instances[path].addEventListener('close', (event) => {
      console.log('close', path, event);
    });
  }

  on<T>(path: string, channel: string, callback: T) {
    console.log('on', path, channel, callback);
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
    return `?authorization=${AUTH_PREFIX}${token}`;
  }
}
