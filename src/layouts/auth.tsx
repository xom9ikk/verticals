import React, { FC } from 'react';
import { Header } from '../components/Header';

import { Login } from '../pages/auth/login';
import { Register } from '../pages/auth/register';

export const AuthLayout: FC = () => (
  <div className="container container--vertical">
    <Header />
    {/* <Login /> */}
    <Register />
    {/* <Reset /> */}
  </div>
);
