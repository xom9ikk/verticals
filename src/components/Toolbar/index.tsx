import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Menu } from '../Menu';
import { MenuButton } from '../MenuButton';
import { Divider } from '../Divider';
import { Submenu } from '../Submenu';
import { SystemActions } from '../../store/actions';

interface IToolbar {
  onChangeDisplaySidebar: (isPinSidebar: boolean) => void;
}

export const Toolbar: FC<IToolbar> = ({ onChangeDisplaySidebar }) => {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isPinSidebar, setIsPinSidebar] = useState<boolean>(true);

  const hidePopup = () => {
    dispatch(SystemActions.setIsOpenPopup(false));
    setIsHover(false);
  };

  return (
    <div
      className="toolbar"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="toolbar__inner">
        <Menu
          imageSrc="/svg/add.svg"
          text="New workspace"
          alt="add"
          isHoverBlock={isHover}
        />
        <Menu
          imageSrc="/svg/filter.svg"
          alt="add"
          isHoverBlock={isHover}
          imageSize={24}
          size={30}
          position="top"
          isAbsolute={false}
        >
          <MenuButton
            text={`${isPinSidebar ? 'Unpin' : 'Pin'} Sidebar`}
            imageSrc="/svg/menu/hide-sidebar.svg"
            onClick={() => {
              setIsPinSidebar((prev) => {
                hidePopup();
                onChangeDisplaySidebar(!prev);
                return !prev;
              });
            }}
          />
          <Divider verticalSpacer={7} horizontalSpacer={10} />

          <Submenu
            text="Language: English"
            imageSrc="/svg/menu/language.svg"
          >
            <MenuButton
              text="Русский"
            />
            <MenuButton
              text="Español"
            />
            <MenuButton
              text="Français"
            />
            <MenuButton
              text="English"
            />
          </Submenu>
          <Submenu
            text="More"
            imageSrc="/svg/dots.svg"
          >
            <MenuButton
              text="Write to developer"
            />
            <MenuButton
              text="Terms of Service"
            />
            <MenuButton
              text="Privacy Policy"
            />
          </Submenu>
          <Divider verticalSpacer={7} horizontalSpacer={10} />
          <MenuButton
            text="Log out"
            imageSrc="/svg/menu/logout.svg"
          />
        </Menu>
      </div>
    </div>
  );
};
