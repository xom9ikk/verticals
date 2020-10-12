import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@comp/Menu';
import { MenuButton } from '@comp/MenuButton';
import { Divider } from '@comp/Divider';
import { Submenu } from '@comp/Submenu';
import { AuthActions, SystemActions } from '@/store/actions';
import { EnumLanguage } from '@/types/entities';
import { forwardTo } from '@/router/history';
import { getLanguage } from '@/store/selectors';

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

  const menuButtonClickHandler = (action: EnumToolbarActions, payload?: any) => {
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
          onClick={() => menuButtonClickHandler(EnumToolbarActions.NewWorkspace)}
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
          <MenuButton
            text={`${isPinSidebar ? 'Unpin' : 'Pin'} Sidebar`}
            imageSrc="/assets/svg/menu/hide-sidebar.svg"
            onClick={() => menuButtonClickHandler(EnumToolbarActions.SwitchSidebar)}
          />
          <MenuButton
            text="Account settings"
            imageSrc="/assets/svg/menu/profile-settings.svg"
            onClick={() => menuButtonClickHandler(EnumToolbarActions.AccountSettings)}
          />
          <Divider verticalSpacer={7} horizontalSpacer={10} />

          <Submenu
            text="Language: English"
            imageSrc="/assets/svg/menu/language.svg"
          >
            <MenuButton
              text="English"
              hintImageSrc={getTickSvg(EnumLanguage.English)}
              isColoredHintImage
              onClick={() => menuButtonClickHandler(
                EnumToolbarActions.ChangeLanguage, EnumLanguage.English,
              )}
            />
            <MenuButton
              text="Русский"
              hintImageSrc={getTickSvg(EnumLanguage.Russian)}
              isColoredHintImage
              onClick={() => menuButtonClickHandler(
                EnumToolbarActions.ChangeLanguage, EnumLanguage.Russian,
              )}
            />
            <MenuButton
              text="Français"
              hintImageSrc={getTickSvg(EnumLanguage.French)}
              isColoredHintImage
              onClick={() => menuButtonClickHandler(
                EnumToolbarActions.ChangeLanguage, EnumLanguage.French,
              )}
            />
            <MenuButton
              text="Español"
              hintImageSrc={getTickSvg(EnumLanguage.Spanish)}
              isColoredHintImage
              onClick={() => menuButtonClickHandler(
                EnumToolbarActions.ChangeLanguage, EnumLanguage.Spanish,
              )}
            />
          </Submenu>
          <Submenu
            text="More"
            imageSrc="/assets/svg/dots.svg"
          >
            <MenuButton
              text="Write to developer"
              onClick={() => menuButtonClickHandler(EnumToolbarActions.WriteToDeveloper)}
            />
            <MenuButton
              text="Terms of Service"
              onClick={() => menuButtonClickHandler(EnumToolbarActions.TermsOfService)}
            />
            <MenuButton
              text="Privacy Policy"
              onClick={() => menuButtonClickHandler(EnumToolbarActions.PrivacyPolicy)}
            />
          </Submenu>
          <Divider verticalSpacer={7} horizontalSpacer={10} />
          <MenuButton
            text="Log out"
            imageSrc="/assets/svg/menu/logout.svg"
            onClick={() => menuButtonClickHandler(EnumToolbarActions.Logout)}
          />
        </Menu>
      </div>
    </div>
  );
};
