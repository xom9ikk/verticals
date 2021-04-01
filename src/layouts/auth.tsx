import React, { FC } from 'react';
import { Header } from '@comp/Header';
import { Footer } from '@comp/Footer';

export const AuthLayout: FC = ({ children }) => (
  <div className="container container--vertical">
    <Header />
    {children}
    <Footer />
  </div>
);
