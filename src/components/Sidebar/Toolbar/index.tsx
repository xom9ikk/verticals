import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { LANGUAGES } from '@/constants';
import { ControlButton } from '@comp/ControlButton';
import { Divider } from '@comp/Divider';
import { Menu } from '@comp/Menu';
import { MenuItem } from '@comp/Menu/Item';
import { SubMenu } from '@comp/Menu/Sub';
import { redirectTo } from '@router/history';
import { AuthActions, SystemActions } from '@store/actions';
import { getLanguage } from '@store/selectors';
import { EnumLanguage } from '@type/entities';

interface IToolbar {
  onChangeDisplaySidebar: (isPinSidebar: boolean) => void;
}

enum EnumToolbarActions {
  NewWorkspace,
  SwitchSidebar,
  AccountSettings,
  ChangeLanguage,
  WriteToDeveloper,
  TermsOfService,
  PrivacyPolicy,
  About,
  Logout,
}

export const Toolbar: FC<IToolbar> = ({ onChangeDisplaySidebar }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isPinSidebar, setIsPinSidebar] = useState<boolean>(true);
  const language = useSelector(getLanguage);

  const getTickSvg = (menuLanguage: EnumLanguage) => (language === menuLanguage ? '/assets/svg/menu/tick.svg' : '');

  const handleMenuButtonClick = (action: EnumToolbarActions, payload?: any) => {
    switch (action) {
      case EnumToolbarActions.NewWorkspace: {
        // TODO: New workspace
        break;
      }
      case EnumToolbarActions.SwitchSidebar: {
        setIsPinSidebar((prev) => {
          onChangeDisplaySidebar(!prev);
          return !prev;
        });
        break;
      }
      case EnumToolbarActions.AccountSettings: {
        redirectTo('/settings/account');
        break;
      }
      case EnumToolbarActions.ChangeLanguage: {
        dispatch(SystemActions.effect.setLanguage(payload));
        break;
      }
      case EnumToolbarActions.WriteToDeveloper: {
        window.open('https://t.me/xom9ik', '_blank');
        break;
      }
      case EnumToolbarActions.TermsOfService: {
        // TODO: Link to terms of service
        break;
      }
      case EnumToolbarActions.PrivacyPolicy: {
        // TODO: Link to privacy policy
        break;
      }
      case EnumToolbarActions.About: {
        redirectTo('/about');
        break;
      }
      case EnumToolbarActions.Logout: {
        dispatch(AuthActions.effect.logout());
        break;
      }
      default: break;
    }
  };

  const handleNewWorkspaceClick = () => handleMenuButtonClick(EnumToolbarActions.NewWorkspace);

  return (
    <div className="sidebar-toolbar">
      <div className="sidebar-toolbar__inner">
        <ControlButton
          imageSrc="/assets/svg/add.svg"
          text={t('New workspace')}
          alt="add"
          tooltip={t('Soon. Stay tuned for updates in email')}
          isMaxWidth
          onClick={handleNewWorkspaceClick}
        />
        <Menu
          id="preferences"
          imageSrc="/assets/svg/filter.svg"
          alt="preferences"
          tooltip={t('Preferences')}
          imageSize={24}
          size={36}
          position="top"
          isAbsolute={false}
          onSelect={handleMenuButtonClick}
        >
          <MenuItem
            text={`${isPinSidebar ? t('Unpin Sidebar') : t('Pin Sidebar')}`}
            imageSrc="/assets/svg/menu/hide-sidebar.svg"
            action={EnumToolbarActions.SwitchSidebar}
          />
          <MenuItem
            text={t('Account settings')}
            imageSrc="/assets/svg/menu/profile-settings.svg"
            action={EnumToolbarActions.AccountSettings}
          />
          <Divider verticalSpacer={7} horizontalSpacer={10} />
          <SubMenu
            text={`${t('Language')}: ${LANGUAGES[language]}`}
            imageSrc="/assets/svg/menu/language.svg"
            maxHeight={170}
            isHideVerticalScroll={false}
          >
            {LANGUAGES.map((lng, index) => (
              <MenuItem
                key={lng}
                text={lng}
                hintImageSrc={getTickSvg(index)}
                isColoredHintImage
                action={EnumToolbarActions.ChangeLanguage}
                payload={index}
              />
            ))}
          </SubMenu>
          <SubMenu
            text={t('More')}
            imageSrc="/assets/svg/dots.svg"
          >
            <MenuItem
              text={t('Write to developer')}
              action={EnumToolbarActions.WriteToDeveloper}
            />
            <MenuItem
              text={t('Terms of Service')}
              action={EnumToolbarActions.TermsOfService}
            />
            <MenuItem
              text={t('Privacy Policy')}
              action={EnumToolbarActions.PrivacyPolicy}
            />
          </SubMenu>
          <MenuItem
            text={t('About')}
            imageSrc="/assets/svg/menu/copy-link.svg"
            action={EnumToolbarActions.About}
          />
          <Divider verticalSpacer={7} horizontalSpacer={10} />
          <MenuItem
            text={t('Logout')}
            imageSrc="/assets/svg/menu/logout.svg"
            action={EnumToolbarActions.Logout}
          />
        </Menu>
      </div>
    </div>
  );
};
