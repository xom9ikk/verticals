import React, { FC, useState } from 'react';
import { Menu } from '../Menu';
import { Checkbox } from '../Checkbox';
import { ColorPicker } from '../ColorPicker';
import { MenuButton } from '../MenuButton';
import { Divider } from '../Divider';

interface ICard {
  title: string;
  isDone: boolean;
}

// TODO: move to constants
// TODO: interfaces for todos
const colors = [
  '#ff6a56',
  '#fee930',
  '#9cc447',
  '#32dabc',
  '#5fc1e9',
  '#d8d8d8',
];

export const Card: FC<ICard> = ({ title, isDone }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <div
      className="card"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="card__block">
        <Checkbox isActiveDefault={isDone} />
        <span>{title}</span>
      </div>
      <Menu
        imageSrc="/svg/dots.svg"
        alt="menu"
        imageSize={22}
        size={24}
        isHide
        isHoverBlock={isHover}
      >
        <ColorPicker colors={colors} onClick={console.log} />
        <MenuButton
          text="Edit card"
          imageSrc="/svg/menu/edit.svg"
        />
        <MenuButton
          text="Attach file"
          imageSrc="/svg/menu/attach.svg"
        />
        <MenuButton
          text="Add date"
          imageSrc="/svg/menu/add-date.svg"
        />
        <MenuButton
          text="Complete"
          imageSrc="/svg/menu/complete.svg"
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuButton
          text="Notifications"
          imageSrc="/svg/menu/notifications.svg"
          hintImageSrc="/svg/menu/tick.svg"
        />
        <MenuButton
          text="Copy link"
          imageSrc="/svg/menu/copy-link.svg"
        />
        <MenuButton
          text="Duplicate"
          imageSrc="/svg/menu/duplicate.svg"
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuButton
          text="Add card below"
          imageSrc="/svg/menu/add-card.svg"
        />
        <Divider verticalSpacer={7} horizontalSpacer={10} />
        <MenuButton
          text="Delete"
          imageSrc="/svg/menu/delete.svg"
          hintText="⌫"
        />
      </Menu>
    </div>
  );
};
