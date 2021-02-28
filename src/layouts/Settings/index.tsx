/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  FC, useMemo,
} from 'react';
import { RoundedButton } from '@comp/RoundedButton';
import { NavLink } from '@comp/NavLink';
import { useTranslation } from 'react-i18next';

enum EnumMenu {
  Account='account',
  Profile='profile',
}

export const SettingsLayout: FC = ({ children }) => {
  const { t } = useTranslation();

  const menuItems = [{
    icon: '/assets/svg/account.svg',
    text: t('Account'),
    type: EnumMenu.Account,
  }, {
    icon: '/assets/svg/profile.svg',
    text: t('Profile'),
    type: EnumMenu.Profile,
  }];

  const drawMenu = useMemo(() => menuItems.map((menuItem) => (
    <NavLink
      key={menuItem.type}
      to={`/settings/${menuItem.type}`}
      exact
    >
      {(isActive: boolean) => (
        <RoundedButton
          key={menuItem.type}
          icon={menuItem.icon}
          text={menuItem.text}
          isActive={isActive}
        />
      )}
    </NavLink>
  )), []);

  return (
    <>
      <div className="settings">
        <div className="settings__sidebar">
          <h1 className="settings__title">{t('Settings')}</h1>
          <div>
            { drawMenu }
          </div>
        </div>
        <div className="settings__content">
          <div className="settings__content-inner">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
