import React, { FC } from 'react';
import { Header } from '@comp/Header';

export const AuthLayout: FC = ({ children }) => (
  <div className="container container--vertical">
    <Header />
    {children}
  </div>
);
