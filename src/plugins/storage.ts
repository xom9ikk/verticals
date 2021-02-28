/* eslint-disable class-methods-use-this */
import { EnumLanguage } from '@type/entities';

interface IStorage {
  setToken(token: string): void;
  getToken(): string;
  setRefreshToken(token: string): void;
  getRefreshToken(): string;
}

class Storage implements IStorage {
  setLanguage(language: EnumLanguage) {
    console.log('set lss lang', language);
    return Storage.set('language', language);
  }

  getLanguage(): EnumLanguage {
    const languageString = Storage.get('language');
    return parseInt(languageString, 10);
  }

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
    const value = window.localStorage.getItem(key);
    if (value === null) {
      return value;
    }
    return JSON.parse(value);
  }

  private static remove(key: string) {
    return window.localStorage.removeItem(key);
  }
}

export const storage = new Storage();
