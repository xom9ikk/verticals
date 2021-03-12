import React from 'react';
import ReactDOM from 'react-dom';
import ReactTooltip from 'react-tooltip';

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

setInterval(() => {
  // console.log('rebuild');
  ReactTooltip.rebuild(); // TODO: move to data-tip update hook useEffect(() => {})
}, 2000);
