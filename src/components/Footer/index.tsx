import React, { FC } from 'react';
// @ts-ignore
import { version } from '../../../package.json';

export const Footer: FC = () => (
  <footer className="footer">
    <span className="footer__text">
      build:
      {' '}
      {version}
      -
      {process.env.COMMIT_HASH}
    </span>
  </footer>
);
