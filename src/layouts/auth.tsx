import React, { FC } from 'react';
import { Header } from '../components/Header';

export const AuthLayout: FC = ({ children }) => (
  <div className="container container--vertical">
    <Header />
    {children}
  </div>
);
