/* eslint-disable jsx-a11y/accessible-emoji */
import React, { FC } from 'react';
import i18n from '@/i18n';

export const ErrorFallback: FC = () => (
  <div
    className="container container--vertical"
    style={{ alignItems: 'center', justifyContent: 'center' }}
  >
    <h1>
      🔨
      {' '}
      {i18n.t('Something went wrong...')}
    </h1>
    <h1>
      {' '}
      {i18n.t('Please reload page')}
    </h1>
    <br />
    <br />
    <h2>
      {i18n.t('We are already working on fixing this error')}
      {' '}
      🧐
    </h2>
  </div>
);
