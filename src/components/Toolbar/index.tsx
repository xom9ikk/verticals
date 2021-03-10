import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@comp/Menu';
import { MenuItem } from '@comp/MenuItem';
import { Divider } from '@comp/Divider';
import { Submenu } from '@comp/Submenu';
import { AuthActions, SystemActions } from '@store/actions';
import { EnumLanguage } from '@type/entities';
import { redirectTo } from '@router/history';
import { getLanguage } from '@store/selectors';
import { ControlButton } from '@comp/ControlButton';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@/constants';

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
  Logout,
}

export const Toolbar: FC<IToolbar> = ({ onChangeDisplaySidebar }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isPinSidebar, setIsPinSidebar] = useState<boolean>(true);
  const language = useSelector(getLanguage);

  const getTickSvg = (menuLanguage: EnumLanguage) => (language === menuLanguage ? '/assets/svg/menu/tick.svg' : '');

  const handleMenuButtonClick = (action: EnumToolbarActions, payload?: any) => {
    switch (action) {
      case EnumToolbarActions.NewWorkspace: {
        // TODO:
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
        dispatch(SystemActions.setLanguage(payload));
        break;
      }
      case EnumToolbarActions.WriteToDeveloper: {
        window.open('https://t.me/xom9ik', '_blank');
        break;
      }
      case EnumToolbarActions.TermsOfService: {
        // TODO:
        break;
      }
      case EnumToolbarActions.PrivacyPolicy: {
        // TODO:
        break;
      }
      case EnumToolbarActions.Logout: {
        dispatch(AuthActions.logout());
        break;
      }
      default: break;
    }
  };

  return (
    <div
      className="toolbar"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <div className="toolbar__inner">
        <ControlButton
          imageSrc="/assets/svg/add.svg"
          text={t('New workspace')}
          alt="add"
          isMaxWidth
          isHoverBlock={isHover}
          onClick={() => handleMenuButtonClick(EnumToolbarActions.NewWorkspace)}
        />
        <Menu
          id="preferences"
          imageSrc="/assets/svg/filter.svg"
          alt="preferences"
          tooltip={t('Preferences')}
          isHoverBlock={isHover}
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
          <Submenu
            text={`${t('Language')}: ${LANGUAGES[language]}`}
            imageSrc="/assets/svg/menu/language.svg"
            maxHeight={170}
            isHideScroll
          >
            {
              LANGUAGES.map((lng, index) => (
                <MenuItem
                  key={lng}
                  text={lng}
                  hintImageSrc={getTickSvg(index)}
                  isColoredHintImage
                  action={EnumToolbarActions.ChangeLanguage}
                  payload={index}
                />
              ))
            }
          </Submenu>
          <Submenu
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
          </Submenu>
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
