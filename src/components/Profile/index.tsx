import React, { FC, useState } from 'react';
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
        imageSrc="/assets/svg/dots.svg"
        alt="add"
        imageSize={22}
        size={24}
        isHoverBlock={isHover}
        position="bottom"
        isAbsolute={false}
      >
        <MenuButton
          text="My Profile"
          imageSrc="/assets/svg/menu/my-profile.svg"
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuButton
          text="Add board"
          imageSrc="/assets/svg/menu/add-board.svg"
          hintText="N"
        />
        <MenuButton
          text="Copy link"
          imageSrc="/assets/svg/menu/copy-link.svg"
        />
      </Menu>
    </div>
  );
};
