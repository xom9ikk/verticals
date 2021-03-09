import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@comp/Button';
import { useTranslation } from 'react-i18next';

export const Header: FC = () => {
  const { t } = useTranslation();

  const { pathname } = useLocation();
  const [linkText, setLinkText] = useState<string>('');
  const [link, setLink] = useState<string>('');

  useEffect(() => {
    if (pathname === '/auth/register') {
      setLinkText(t('Sign In'));
      setLink('/auth/login');
    } else {
      setLinkText(t('Sign Up'));
      setLink('/auth/register');
    }
  }, [pathname]);

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo">
          <img src="/assets/svg/logo.svg" alt="logo" />
          <Link to="/auth/login">
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
