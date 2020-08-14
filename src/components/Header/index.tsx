import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@comp/Button';

interface IHeader {
}

export const Header: FC<IHeader> = () => {
  const { pathname } = useLocation();
  const [linkText, setLinkText] = useState<string>('');
  const [link, setLink] = useState<string>('');

  useEffect(() => {
    if (pathname === '/auth/register') {
      setLinkText('Sign In');
      setLink('/auth/login');
    } else {
      setLinkText('Sign Up');
      setLink('/auth/register');
    }
  }, [pathname]);

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo">
          <img src="/assets/svg/logo.svg" alt="logo" />
          <Link to="/">
            Verticals
          </Link>
        </div>
        <Link to={link} className="link">
          <Button type="button">{linkText}</Button>
        </Link>
      </div>
    </header>
  );
};
