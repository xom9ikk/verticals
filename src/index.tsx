import React from 'react';
import ReactDOM from 'react-dom';

import { Sentry } from '@/sentry';
import { Store } from '@/store';
import { App } from '@/app';

ReactDOM.render(
  <Sentry>
    <Store>
      <App />
    </Store>
  </Sentry>,
  document.getElementById('root'),
);
