import React, { FC } from 'react';

import { Footer } from '@comp/Footer';
import { Header } from '@comp/Header';

export const AuthLayout: FC = ({ children }) => (
  <div className="container container--vertical">
    <Header />
    {children}
    <Footer />
  </div>
);
