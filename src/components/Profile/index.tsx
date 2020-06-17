import React, { FC, useState } from 'react';
import { Menu } from '../Menu';
import { MenuButton } from '../MenuButton';
import { Divider } from '../Divider';

interface IProfile {
}

export const Profile: FC<IProfile> = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <div
      className="profile"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src="/avatars/default.jpeg"
        alt="avatar"
        className="profile__avatar"
      />
      <Menu
        imageSrc="/svg/dots.svg"
        alt="add"
        imageSize={22}
        size={24}
        isHoverBlock={isHover}
        position="bottom"
      >
        <MenuButton
          text="My Profile"
          imageSrc="/svg/menu/my-profile.svg"
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuButton
          text="Add board"
          imageSrc="/svg/menu/add-board.svg"
          hintText="N"
        />
        <MenuButton
          text="Copy link"
          imageSrc="/svg/menu/copy-link.svg"
        />
      </Menu>
    </div>
  );
};
