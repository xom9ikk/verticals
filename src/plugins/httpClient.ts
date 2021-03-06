import { injectable } from 'inversify';
import 'reflect-metadata';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { IHttpClient } from '@inversify/interfaces/httpClient';
import { storage } from '@plugins/storage';
import { AuthRefresher, IAxiosErrorRetry } from '@plugins/authRefresher';

const DEFAULT_CONTENT_TYPE = 'application/json; charset=utf-8';

@injectable()
export class HttpClient implements IHttpClient {
  private readonly client: AxiosInstance;

  private readonly authRefresher: AuthRefresher<IAxiosErrorRetry>;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        'Content-Type': DEFAULT_CONTENT_TYPE,
      },
    });
    this.authRefresher = new AuthRefresher<IAxiosErrorRetry>(this, this.retryRequest.bind(this));

    this.client.interceptors.request.use(
      HttpClient.attachToken,
      (e) => Promise.reject(e),
    );
    this.client.interceptors.response.use(
      (r) => r,
      this.authRefresher.httpResponseInterceptor.bind(this.authRefresher),
    );
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

  private retryRequest(error: AxiosError) {
    console.log('retryRequest');
    const newRequest = {
      ...error.config,
      retry: true,
    };
    return this.client(newRequest);
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
        Authorization: `${process.env.AUTH_PREFIX}${token}`,
      },
    };
  }
}
