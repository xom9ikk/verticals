import axios, { AxiosInstance } from 'axios';
import { Warrior } from '../inversify.interfaces';

interface IOptions {
  token: string;
  refreshToken: string;
}

const baseURL = 'http://localhost:3000';

export class Api implements Warrior {
  client: AxiosInstance;

  private prefix: string = 'Bearer ';

  private token: string;

  private refreshToken: string;

  private refreshRequest: any;

  constructor() {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    this.token = localStorage.getItem('token') ?? '';
    this.refreshToken = localStorage.getItem('refreshToken') ?? '';
    this.refreshRequest = null;

    this.client.interceptors.request.use(
      (config) => {
        if (!this.token) {
          return config;
        }

        const newConfig = {
          headers: {},
          ...config,
        };

        newConfig.headers.Authorization = `${this.prefix}${this.token}`;
        return newConfig;
      },
      (e) => Promise.reject(e),
    );

    this.client.interceptors.response.use(
      (r) => r,
      async (error) => {
        if (error.response) {
          if (!this.refreshToken || error.response.status !== 401 || error.config.retry) {
            return Promise.reject(error);
          }
          if (!this.refreshRequest) {
            this.refreshRequest = this.client.post('/auth/refresh', {
              refreshToken: this.refreshToken,
            });
          }

          this.clear();

          try {
            const { data } = await this.refreshRequest;
            this.refreshRequest = null;

            const { token, refreshToken } = data.content;

            this.updateToken(token);
            this.updateRefreshToken(refreshToken);

            const newRequest = {
              ...error.config,
              retry: true,
            };
            return this.client(newRequest);
          } catch (e) {
            return Promise.reject(e);
          }
        }
      },
    );
  }

  private updateToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  private updateRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
  }

  post(url: string, options: Object) {
    return this.client.post(url, options);
  }

  patch(url: string, options: Object) {
    return this.client.patch(url, options);
  }

  get(url: string, options: Object) {
    return this.client.get(url, options);
  }

  put(url: string, options: Object) {
    return this.client.put(url, options);
  }

  delete(url: string, options: Object) {
    return this.client.delete(url, options);
  }

  private clear() {
    this.token = '';
    this.refreshToken = '';
    localStorage.remove('token');
    localStorage.remove('refreshToken');
  }
}
