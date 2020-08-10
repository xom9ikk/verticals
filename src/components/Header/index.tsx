import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { icons } from '@/icons';
import { Button } from '@comp/Button';

interface IHeader {
}

export const Header: FC<IHeader> = () => (
  <header className="header">
    <div className="header__wrapper">
      <div className="header__logo">
        <img src={icons.logo} alt="logo" />
        <Link to="/">
          Verticals
        </Link>
      </div>
      <Button type="button">Sign Up</Button>
    </div>
  </header>
);
