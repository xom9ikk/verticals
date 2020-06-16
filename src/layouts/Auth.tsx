import React, { FC } from 'react';
import { Header } from '../components/Header';

import { Login } from '../pages/Login';

export const Auth: FC = () => (
  <div className="container container--vertical">
    <Header />
    <Login />
    {/* <Register /> */}
    {/* <Reset /> */}
  </div>
);
