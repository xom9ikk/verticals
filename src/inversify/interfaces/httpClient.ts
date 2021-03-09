import { AxiosRequestConfig } from 'axios';

export interface IHttpClient {
  readonly post: <T>(url: string, body?: Object, options?: AxiosRequestConfig) => Promise<T>;
  readonly patch: <T>(url: string, body?: Object, options?: AxiosRequestConfig) => Promise<T>;
  readonly get: <T>(url: string, body?: Object) => Promise<T>;
  readonly put: <T>(url: string, body?: Object, options?: AxiosRequestConfig) => Promise<T>;
  readonly delete: <T>(url: string, body?: Object) => Promise<T>;
}
