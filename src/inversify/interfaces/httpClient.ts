import { AxiosRequestConfig } from 'axios';

export interface IHttpClient {
  post: <T>(url: string, body?: Object, options?: AxiosRequestConfig) => Promise<T>;
  patch: <T>(url: string, body?: Object, options?: AxiosRequestConfig) => Promise<T>;
  get: <T>(url: string, body?: Object) => Promise<T>;
  put: <T>(url: string, body?: Object, options?: AxiosRequestConfig) => Promise<T>;
  delete: <T>(url: string, body?: Object) => Promise<T>;
}
