import React, { FC, useState } from 'react';
import { Menu } from '../Menu';
import { MenuButton } from '../MenuButton';
import { Divider } from '../Divider';
import { Submenu } from '../Submenu';

interface IToolbar {
}

export const Toolbar: FC<IToolbar> = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

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
        >
          <MenuButton
            text="Hide Sidebar"
            imageSrc="/svg/menu/hide-sidebar.svg"
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
