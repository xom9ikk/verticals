import { AxiosError, AxiosRequestConfig } from 'axios';
import { IRefreshResponse } from '@type/api';
import { IHttpClient } from '@inversify/interfaces/httpClient';
import { storage } from '@plugins/storage';

const UNAUTHORIZED_HTTP_STATUS = 401;
const UNAUTHORIZED_WS_CODE = 1011;
const DEFAULT_ERROR_MESSAGE = 'Internal error';
const REFRESH_ROUTE = '/auth/refresh';

interface IPairTokens {
  readonly token: string;
  readonly refreshToken: string;
}

export type IAxiosErrorRetry = {
  config: {
    retry: boolean;
  } & AxiosRequestConfig;
} & AxiosError;

export class AuthRefresher<T extends string | IAxiosErrorRetry> {
  private refreshRequest?: Promise<IRefreshResponse>;

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly retryRequest: (ctx: T) => void,
  ) {}

  async refreshTokens(ctx: T) {
    try {
      const pairTokens = await this.getNewPairTokens();
      AuthRefresher.setTokenData(pairTokens);
      return this.retryRequest(ctx);
    } catch (e) {
      throw new Error();
    } finally {
      delete this.refreshRequest;
    }
  }

  async websocketResponseInterceptor(event: CloseEvent, ctx: T) {
    try {
      if (event.code === UNAUTHORIZED_WS_CODE) {
        await this.refreshTokens(ctx);
      }
    } catch (e) {
      this.retryRequest(ctx);
    }
  }

  async httpResponseInterceptor(ctx: T) {
    const error = ctx as IAxiosErrorRetry;
    try {
      if (AuthRefresher.shouldRetry(error)) {
        return this.retryRequest(ctx);
      }

      if (!AuthRefresher.shouldRefresh(error)) {
        throw new Error();
      }

      return await this.refreshTokens(ctx);
    } catch (e) {
      const errorMessage = error?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
      return Promise.reject(errorMessage);
    }
  }

  private async getNewPairTokens() {
    const refreshToken = storage.getRefreshToken();

    if (!this.refreshRequest) {
      this.refreshRequest = this.httpClient.post(REFRESH_ROUTE, { refreshToken });
    }

    const { data } = await this.refreshRequest;
    return data;
  }

  private static setTokenData(pairTokens: IPairTokens) {
    const { token, refreshToken } = pairTokens;
    storage.setToken(token);
    storage.setRefreshToken(refreshToken);
  }

  private static shouldRetry(error: IAxiosErrorRetry) {
    const token = storage.getToken();

    if (!token) {
      return false;
    }
    if (!error.response) {
      return false;
    }
    const rejectedToken = error?.response?.config?.headers?.Authorization?.replace(process.env.AUTH_PREFIX, '');
    return rejectedToken !== token;
  }

  private static shouldRefresh(error: IAxiosErrorRetry) {
    try {
      return error.response?.status === UNAUTHORIZED_HTTP_STATUS && !error.config.retry;
    } catch (e) {
      return false;
    }
  }
}
