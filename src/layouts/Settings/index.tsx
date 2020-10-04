/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  FC, useMemo,
} from 'react';
import { RoundedButton } from '@comp/RoundedButton';
import { NavLink } from '@/components/NavLink';

enum EnumMenu {
  Account='account',
  Profile='profile',
}

const menuItems = [{
  icon: '/assets/svg/account.svg',
  text: 'Account',
  type: EnumMenu.Account,
}, {
  icon: '/assets/svg/profile.svg',
  text: 'Profile',
  type: EnumMenu.Profile,
}];

interface ISettings {

}

export const SettingsLayout: FC<ISettings> = ({ children }) => {
  const drawMenu = useMemo(() => menuItems.map((menuItem) => (
    <NavLink
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
          <h1 className="settings__title">Settings</h1>
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
