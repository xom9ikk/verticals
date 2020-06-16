import React, { FC } from 'react';
import { Sidebar } from '../components/Sidebar';

export const Main: FC = () => (
  <div className="container container--horizontal">
    <Sidebar />
    <div>
      content
    </div>
  </div>
);
