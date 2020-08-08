/* eslint-disable class-methods-use-this */
interface IStorage {
  setToken(token: string): void;
  getToken(): string;
  setRefreshToken(token: string): void;
  getRefreshToken(): string;
}

class Storage implements IStorage {
  setToken(token: string) {
    return Storage.set('token', token);
  }

  getToken(): string {
    return Storage.get('token') ?? '';
  }

  setRefreshToken(refreshToken: string) {
    return Storage.set('refreshToken', refreshToken);
  }

  getRefreshToken(): string {
    return Storage.get('refreshToken') ?? '';
  }

  private static set(key: string, value: any) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }

  private static get(key: string) {
    return window.localStorage.getItem(key);
  }

  private static remove(key: string) {
    return window.localStorage.removeItem(key);
  }
}

export const storage = new Storage();
