import React, { FC } from 'react';
import { Provider } from 'react-redux';

import { configureAppStore } from '@store/index';

export const Store: FC = ({ children }) => {
  const store = configureAppStore();

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
