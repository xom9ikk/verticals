import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '@/icons';
import { Menu } from '@comp/Menu';
import { MenuButton } from '@comp/MenuButton';
import { Divider } from '@comp/Divider';
import { Submenu } from '@comp/Submenu';
import { SystemActions } from '@/store/actions';
import { IRootState } from '@/store/reducers/state';
import { EnumLanguage } from '@/types';

interface IToolbar {
  onChangeDisplaySidebar: (isPinSidebar: boolean) => void;
}

enum EnumToolbarActions {
  NewWorkspace,
  SwitchSidebar,
  ChangeLanguage,
  WriteToDevelop,
  TermsOfService,
  PrivacyPolicy,
  Logout,
}

export const Toolbar: FC<IToolbar> = ({ onChangeDisplaySidebar }) => {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isPinSidebar, setIsPinSidebar] = useState<boolean>(true);
  const { language } = useSelector((state: IRootState) => state.system);

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    setIsHover(false);
  };

  const getTickSvg = (menuLanguage: EnumLanguage) => (language === menuLanguage ? icons.menu.tickActive : '');

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
      case EnumToolbarActions.ChangeLanguage: {
        dispatch(SystemActions.setLanguage(payload));
        break;
      }
      case EnumToolbarActions.WriteToDevelop: {
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
        // TODO:
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
          imageSrc={icons.add}
          text="New workspace"
          alt="add"
          isHoverBlock={isHover}
          onClick={() => menuButtonClickHandler(EnumToolbarActions.NewWorkspace)}
        />
        <Menu
          imageSrc={icons.filter}
          alt="preferences"
          isHoverBlock={isHover}
          imageSize={24}
          size={30}
          position="top"
          isAbsolute={false}
        >
          <MenuButton
            text={`${isPinSidebar ? 'Unpin' : 'Pin'} Sidebar`}
            imageSrc={icons.menu.hideSidebar}
            onClick={() => menuButtonClickHandler(EnumToolbarActions.SwitchSidebar)}
            // onClick={() => {
            //   setIsPinSidebar((prev) => {
            //     hidePopup();
            //     onChangeDisplaySidebar(!prev);
            //     return !prev;
            //   });
            // }}
          />
          <Divider verticalSpacer={7} horizontalSpacer={10} />

          <Submenu
            text="Language: English"
            imageSrc={icons.menu.language}
          >
            <MenuButton
              text="English"
              hintImageSrc={getTickSvg(EnumLanguage.English)}
              onClick={() => menuButtonClickHandler(
                EnumToolbarActions.ChangeLanguage, EnumLanguage.English,
              )}
            />
            <MenuButton
              text="Русский"
              hintImageSrc={getTickSvg(EnumLanguage.Russian)}
              onClick={() => menuButtonClickHandler(
                EnumToolbarActions.ChangeLanguage, EnumLanguage.Russian,
              )}
            />
            <MenuButton
              text="Français"
              hintImageSrc={getTickSvg(EnumLanguage.French)}
              onClick={() => menuButtonClickHandler(
                EnumToolbarActions.ChangeLanguage, EnumLanguage.French,
              )}
            />
            <MenuButton
              text="Español"
              hintImageSrc={getTickSvg(EnumLanguage.Spanish)}
              onClick={() => menuButtonClickHandler(
                EnumToolbarActions.ChangeLanguage, EnumLanguage.Spanish,
              )}
            />
          </Submenu>
          <Submenu
            text="More"
            imageSrc={icons.dots}
          >
            <MenuButton
              text="Write to developer"
              onClick={() => menuButtonClickHandler(EnumToolbarActions.WriteToDevelop)}
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
            imageSrc={icons.menu.logout}
            onClick={() => menuButtonClickHandler(EnumToolbarActions.Logout)}
          />
        </Menu>
      </div>
    </div>
  );
};
