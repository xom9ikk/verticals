import React, { FC, useState } from 'react';
import { icons } from '@/icons';
import { Menu } from '@comp/Menu';
import { MenuButton } from '@comp/MenuButton';
import { Divider } from '@comp/Divider';
import { Avatar } from '@comp/Avatar';

interface IProfile {
}

export const Profile: FC<IProfile> = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <div
      className="profile"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <Avatar />
      <Menu
        imageSrc={icons.dots}
        alt="add"
        imageSize={22}
        size={24}
        isHoverBlock={isHover}
        position="bottom"
        isAbsolute={false}
      >
        <MenuButton
          text="My Profile"
          imageSrc={icons.menu.myProfile}
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuButton
          text="Add board"
          imageSrc={icons.menu.addBoard}
          hintText="N"
        />
        <MenuButton
          text="Copy link"
          imageSrc={icons.menu.copyLink}
        />
      </Menu>
    </div>
  );
};
