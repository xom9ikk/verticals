import { injectable } from 'inversify';
import axios, { AxiosInstance } from 'axios';
import { storage } from './storage';

const baseURL = 'http://0.0.0.0:3000/api/v1';

export interface IHttpClient {
  post: <T>(url: string, options: Object) => Promise<T>;
  patch: <T>(url: string, options: Object) => Promise<T>;
  get: <T>(url: string, options: Object) => Promise<T>;
  put: <T>(url: string, options: Object) => Promise<T>;
  delete: <T>(url: string, options: Object) => Promise<T>;
}

@injectable()
export class HttpClient implements IHttpClient {
  client: AxiosInstance;

  private prefix: string = 'Bearer ';

  private refreshRequest: any;

  constructor() {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    this.refreshRequest = null;

    this.client.interceptors.request.use(
      (config) => {
        const token = storage.getToken();
        if (!token) {
          return config;
        }

        return {
          headers: {
            Authorization: `${this.prefix}${token}`,
          },
          ...config,
        };
      },
      (e) => Promise.reject(e),
    );

    this.client.interceptors.response.use(
      (r) => r,
      async (error) => {
        if (error.response) {
          const refreshToken = storage.getRefreshToken();
          if (!refreshToken || error.response.status !== 401 || error.config.retry) {
            return Promise.reject(error);
          }
          if (!this.refreshRequest) {
            this.refreshRequest = this.client.post('/auth/refresh', {
              refreshToken,
            });
          }

          HttpClient.clearTokens();

          try {
            const { data } = await this.refreshRequest;
            this.refreshRequest = null;

            const {
              token: newToken,
              refreshToken: newRefreshToken,
            } = data.content;

            storage.setToken(newToken);
            storage.setRefreshToken(newRefreshToken);

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

  async post(url: string, options: Object) {
    const { data } = await this.client.post(url, options);
    return data;
  }

  async patch(url: string, options: Object) {
    const { data } = await this.client.patch(url, options);
    return data;
  }

  async get(url: string, options: Object) {
    const { data } = await this.client.get(url, options);
    return data;
  }

  async put(url: string, options: Object) {
    const { data } = await this.client.put(url, options);
    return data;
  }

  async delete(url: string, options: Object) {
    const { data } = await this.client.delete(url, options);
    return data;
  }

  private static clearTokens() {
    storage.setToken('');
    storage.setRefreshToken('');
  }
}
