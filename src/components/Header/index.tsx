import React, { FC } from 'react';

interface IHeader {
  title: string;
}

export const Header: FC<IHeader> = ({ title }) => (
  <header className="header">
    {title}
  </header>
);
