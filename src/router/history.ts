/* eslint-disable import/no-extraneous-dependencies */
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const forwardTo = (path: string) => {
  history.push(path);
};
