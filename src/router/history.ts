import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const forwardTo = (path: string) => {
  history.push(path);
};
