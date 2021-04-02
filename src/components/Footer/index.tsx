import React, { FC } from 'react';
// @ts-ignore
import packageData from '../../../package.json';

export const Footer: FC = () => (
  <footer className="footer">
    <span className="footer__text">
      v.
      {packageData.version}
      -
      {process.env.COMMIT_HASH}
    </span>
  </footer>
);
