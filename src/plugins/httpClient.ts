/* eslint-disable no-underscore-dangle,class-methods-use-this */
import { injectable } from 'inversify';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { storage } from './storage';
import { IHttpClient } from '../inversify.interfaces';
import { IRefreshResponse } from '../types/api';

const baseURL = 'http://0.0.0.0:3000/api/v1';

const STATUS = {
  UNAUTHORIZED: 401,
};

@injectable()
export class HttpClient implements IHttpClient {
  client: AxiosInstance;

  private isRefreshing: boolean = false;

  private failedQueue: Array<any> = [];

  private prefix: string = 'Bearer ';

  // private refreshRequest?: Promise<IRefreshResponse>;

  constructor() {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    this.client.interceptors.request.use(this.attachToken.bind(this), (e) => Promise.reject(e));
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

  private attachToken(config: AxiosRequestConfig) {
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
  }

  private static shouldIntercept(error: any) {
    try {
      return error.response.status === STATUS.UNAUTHORIZED;
    } catch (e) {
      return false;
    }
  }

  private async handleTokenRefresh() {
    const refreshToken = storage.getRefreshToken();
    const response: IRefreshResponse = await this.post('/auth/refresh', { refreshToken });
    const { data } = response;
    return data;
  }

  private processQueue(error: any, token?: string) {
    this.failedQueue.forEach((request) => {
      if (error) {
        request.reject(error);
      } else {
        request.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  private static setTokenData(pairTokens: any) {
    const { token, refreshToken } = pairTokens;
    storage.setToken(token);
    storage.setRefreshToken(refreshToken);
  }

  private async responseInterceptor(error: any) {
    // if (error.response) {
    // const refreshToken = storage.getRefreshToken();
    // if (!refreshToken || error.response.status !== STATUS.UNAUTHORIZED || error.config.retry) {
    //   return Promise.reject(error);
    // }
    if (!HttpClient.shouldIntercept(error)) {
      return Promise.reject(error);
    }

    if (error.config._retry || error.config._queued) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (this.isRefreshing) {
      // maybe delete ()
      return new Promise(((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      })).then(() => { // (token)
        originalRequest._queued = true;
        // this.attachTokenToRequest(originalRequest, token);
        return this.client.request(originalRequest);
      }).catch(() => Promise.reject(error));
    }

    originalRequest._retry = true;
    this.isRefreshing = true;

    return new Promise((resolve, reject) => {
      // this.handleTokenRefresh.call(this.handleTokenRefresh);
      this.handleTokenRefresh()
        .then((newPairTokens) => {
          HttpClient.setTokenData(newPairTokens);
          // this.attachTokenToRequest(originalRequest, newPairTokens.idToken);
          this.processQueue(null, newPairTokens.token);
          resolve(this.client.request(originalRequest));
        })
        .catch((err) => {
          this.processQueue(err, undefined);
          reject(err);
        })
        .finally(() => {
          this.isRefreshing = false;
        });
    });

    // if (!this.refreshRequest) {
    //   this.refreshRequest = this.post('/auth/refresh', { refreshToken });
    // }
    //
    // // HttpClient.clearTokens();
    //
    // try {
    //   const response = await this.refreshRequest;
    //
    //   const {
    //     token: newToken,
    //     refreshToken: newRefreshToken,
    //   } = response.data;
    //
    //   // HttpClient.updateTokens();
    //   storage.setToken(newToken);
    //   storage.setRefreshToken(newRefreshToken);
    //
    //   const newRequest = {
    //     ...error.config,
    //     retry: true,
    //   };
    //
    //   return this.client(newRequest);
    // } catch (e) {
    //   console.log('refresh error', e);
    //   return Promise.reject(e);
    // } finally {
    //   delete this.refreshRequest;
    // }
  }
}
