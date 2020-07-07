import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '../Menu';
import { MenuButton } from '../MenuButton';
import { Divider } from '../Divider';
import { Submenu } from '../Submenu';
import { SystemActions } from '../../store/actions';
import { IRootState } from '../../store/reducers/state';
import { EnumLanguage } from '../../types';

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

  const getTickSvg = (menuLanguage: EnumLanguage) => (language === menuLanguage ? '/svg/menu/tick-active.svg' : '');

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
          imageSrc="/svg/add.svg"
          text="New workspace"
          alt="add"
          isHoverBlock={isHover}
          onClick={() => menuButtonClickHandler(EnumToolbarActions.NewWorkspace)}
        />
        <Menu
          imageSrc="/svg/filter.svg"
          alt="preferences"
          isHoverBlock={isHover}
          imageSize={24}
          size={30}
          position="top"
          isAbsolute={false}
        >
          <MenuButton
            text={`${isPinSidebar ? 'Unpin' : 'Pin'} Sidebar`}
            imageSrc="/svg/menu/hide-sidebar.svg"
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
            imageSrc="/svg/menu/language.svg"
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
            imageSrc="/svg/dots.svg"
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
            imageSrc="/svg/menu/logout.svg"
            onClick={() => menuButtonClickHandler(EnumToolbarActions.Logout)}
          />
        </Menu>
      </div>
    </div>
  );
};
