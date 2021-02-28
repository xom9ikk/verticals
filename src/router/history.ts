/* eslint-disable import/no-extraneous-dependencies */
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const redirectTo = (path: string) => {
  history.push(path);
};
