import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@comp/Menu';
import { MenuItem } from '@comp/MenuItem';
import { Divider } from '@comp/Divider';
import { Submenu } from '@comp/Submenu';
import { AuthActions, SystemActions } from '@store/actions';
import { EnumLanguage } from '@type/entities';
import { forwardTo } from '@router/history';
import { getLanguage } from '@store/selectors';

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
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isPinSidebar, setIsPinSidebar] = useState<boolean>(true);
  const language = useSelector(getLanguage);

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    setIsHover(false);
  };

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
        forwardTo('/settings/account');
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
    hidePopup();
  };

  return (
    <div
      className="toolbar"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <div className="toolbar__inner">
        <Menu
          imageSrc="/assets/svg/add.svg"
          text="New workspace"
          alt="add"
          isMaxWidth
          isHoverBlock={isHover}
          onClick={() => handleMenuButtonClick(EnumToolbarActions.NewWorkspace)}
        />
        <Menu
          imageSrc="/assets/svg/filter.svg"
          alt="preferences"
          tooltip="Preferences"
          isHoverBlock={isHover}
          imageSize={24}
          size={36}
          position="top"
          isAbsolute={false}
        >
          <MenuItem
            text={`${isPinSidebar ? 'Unpin' : 'Pin'} Sidebar`}
            imageSrc="/assets/svg/menu/hide-sidebar.svg"
            onClick={() => handleMenuButtonClick(EnumToolbarActions.SwitchSidebar)}
          />
          <MenuItem
            text="Account settings"
            imageSrc="/assets/svg/menu/profile-settings.svg"
            onClick={() => handleMenuButtonClick(EnumToolbarActions.AccountSettings)}
          />
          <Divider verticalSpacer={7} horizontalSpacer={10} />

          <Submenu
            text="Language: English"
            imageSrc="/assets/svg/menu/language.svg"
          >
            <MenuItem
              text="English"
              hintImageSrc={getTickSvg(EnumLanguage.English)}
              isColoredHintImage
              onClick={() => handleMenuButtonClick(
                EnumToolbarActions.ChangeLanguage, EnumLanguage.English,
              )}
            />
            <MenuItem
              text="Русский"
              hintImageSrc={getTickSvg(EnumLanguage.Russian)}
              isColoredHintImage
              onClick={() => handleMenuButtonClick(
                EnumToolbarActions.ChangeLanguage, EnumLanguage.Russian,
              )}
            />
            <MenuItem
              text="Français"
              hintImageSrc={getTickSvg(EnumLanguage.French)}
              isColoredHintImage
              onClick={() => handleMenuButtonClick(
                EnumToolbarActions.ChangeLanguage, EnumLanguage.French,
              )}
            />
            <MenuItem
              text="Español"
              hintImageSrc={getTickSvg(EnumLanguage.Spanish)}
              isColoredHintImage
              onClick={() => handleMenuButtonClick(
                EnumToolbarActions.ChangeLanguage, EnumLanguage.Spanish,
              )}
            />
          </Submenu>
          <Submenu
            text="More"
            imageSrc="/assets/svg/dots.svg"
          >
            <MenuItem
              text="Write to developer"
              onClick={() => handleMenuButtonClick(EnumToolbarActions.WriteToDeveloper)}
            />
            <MenuItem
              text="Terms of Service"
              onClick={() => handleMenuButtonClick(EnumToolbarActions.TermsOfService)}
            />
            <MenuItem
              text="Privacy Policy"
              onClick={() => handleMenuButtonClick(EnumToolbarActions.PrivacyPolicy)}
            />
          </Submenu>
          <Divider verticalSpacer={7} horizontalSpacer={10} />
          <MenuItem
            text="Log out"
            imageSrc="/assets/svg/menu/logout.svg"
            onClick={() => handleMenuButtonClick(EnumToolbarActions.Logout)}
          />
        </Menu>
      </div>
    </div>
  );
};
