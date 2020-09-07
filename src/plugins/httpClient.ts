/* eslint-disable no-underscore-dangle,class-methods-use-this */
import { injectable } from 'inversify';
import 'reflect-metadata';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IHttpClient } from '@/inversify.interfaces';
import { IRefreshResponse } from '@/types/api';
import { storage } from './storage';

const baseURL = process.env.API_URL;

const AUTH_PREFIX = 'Bearer ';
const DEFAULT_CONTENT_TYPE = 'application/json; charset=utf-8';
const UNAUTHORIZED_STATUS = 401;

interface IPairTokens {
  token: string;
  refreshToken: string;
}

@injectable()
export class HttpClient implements IHttpClient {
  client: AxiosInstance;

  private refreshRequest?: Promise<IRefreshResponse>;

  constructor() {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': DEFAULT_CONTENT_TYPE,
      },
    });
    this.client.interceptors.request.use(HttpClient.attachToken, (e) => Promise.reject(e));
    this.client.interceptors.response.use((r) => r, this.responseInterceptor.bind(this));
  }

  async post(url: string, options?: Object) {
    const { data } = await this.client.post(url, options);
    return data;
  }

  async patch(url: string, options?: Object) {
    const { data } = await this.client.patch(url, options);
    return data;
  }

  async get(url: string, options?: Object) {
    const { data } = await this.client.get(url, options);
    return data;
  }

  async put(url: string, options?: Object) {
    const { data } = await this.client.put(url, options);
    return data;
  }

  async delete(url: string, options?: Object) {
    const { data } = await this.client.delete(url, options);
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
      this.refreshRequest = this.post('/auth/refresh', { refreshToken });
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
      const eee = error?.response?.data?.message || 'Internal error';
      return Promise.reject(eee);
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
