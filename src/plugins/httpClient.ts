/* eslint-disable no-underscore-dangle,class-methods-use-this */
import { injectable } from 'inversify';
import 'reflect-metadata';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IRefreshResponse } from '@type/api';
import { IHttpClient } from '@inversify/interfaces/httpClient';
import { storage } from './storage';

const { API_URL } = process.env;

const AUTH_PREFIX = 'Bearer ';
const DEFAULT_ERROR_MESSAGE = 'Internal error';
const DEFAULT_CONTENT_TYPE = 'application/json; charset=utf-8';
const UNAUTHORIZED_STATUS = 401;
const REFRESH_ROUTE = '/auth/refresh';

interface IPairTokens {
  readonly token: string;
  readonly refreshToken: string;
}

@injectable()
export class HttpClient implements IHttpClient {
  private readonly client: AxiosInstance;

  private refreshRequest?: Promise<IRefreshResponse>;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': DEFAULT_CONTENT_TYPE,
      },
    });
    this.client.interceptors.request.use(HttpClient.attachToken, (e) => Promise.reject(e));
    this.client.interceptors.response.use((r) => r, this.responseInterceptor.bind(this));
  }

  async post(url: string, body?: Object, config?: AxiosRequestConfig) {
    const { data } = await this.client.post(url, body, config);
    return data;
  }

  async patch(url: string, body?: Object, config?: AxiosRequestConfig) {
    const { data } = await this.client.patch(url, body, config);
    return data;
  }

  async get(url: string, body?: Object) {
    const { data } = await this.client.get(url, body);
    return data;
  }

  async put(url: string, body?: Object, config?: AxiosRequestConfig) {
    const { data } = await this.client.put(url, body, config);
    return data;
  }

  async delete(url: string, body?: Object) {
    const { data } = await this.client.delete(url, body);
    return data;
  }

  private retryRequest(error: any) {
    const newRequest = {
      ...error.config,
      retry: true,
    };
    return this.client(newRequest);
  }

  private async getNewPairTokens() {
    const refreshToken = storage.getRefreshToken();

    if (!this.refreshRequest) {
      this.refreshRequest = this.post(REFRESH_ROUTE, { refreshToken });
    }

    const { data } = await this.refreshRequest;
    return data;
  }

  private async responseInterceptor(error: any) {
    try {
      if (HttpClient.shouldRetry(error)) {
        return this.retryRequest(error);
      }

      if (!HttpClient.shouldRefresh(error)) {
        throw new Error();
      }

      try {
        const pairTokens = await this.getNewPairTokens();
        HttpClient.setTokenData(pairTokens);
        return this.retryRequest(error);
      } catch (e) {
        throw new Error();
      } finally {
        delete this.refreshRequest;
      }
    } catch (e) {
      const errorMessage = error?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
      return Promise.reject(errorMessage);
    }
  }

  private static attachToken(config: AxiosRequestConfig) {
    const token = storage.getToken();
    if (!token) {
      return config;
    }
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `${AUTH_PREFIX}${token}`,
      },
    };
  }

  private static setTokenData(pairTokens: IPairTokens) {
    const { token, refreshToken } = pairTokens;
    storage.setToken(token);
    storage.setRefreshToken(refreshToken);
  }

  private static shouldRetry(error: any) {
    const token = storage.getToken();
    if (!token) {
      return false;
    }
    if (!error.response) {
      return false;
    }
    const rejectedToken = error?.response?.config?.headers?.Authorization?.replace(AUTH_PREFIX, '');
    return rejectedToken !== token;
  }

  private static shouldRefresh(error: any) {
    try {
      return error.response.status === UNAUTHORIZED_STATUS && !error.config.retry;
    } catch (e) {
      return false;
    }
  }
}
