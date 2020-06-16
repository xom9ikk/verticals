import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';

interface IHeader {
}

export const Header: FC<IHeader> = () => (
  <header className="header">
    <div className="header__wrapper">
      <div className="header__logo">
        <img src="/svg/logo.svg" alt="logo" />
        <Link to="/">
          Verticals
        </Link>
      </div>
      <Button type="button">Sign Up</Button>
    </div>
  </header>
);
