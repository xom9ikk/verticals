import React, { FC, useState } from 'react';
import { Menu } from '../Menu';
import { MenuButton } from '../MenuButton';
import { Divider } from '../Divider';
import { ColorPicker } from '../ColorPicker';

interface IBoardItem {
  id: string;
  icon: string;
  text: string;
  isActive: boolean;
  onClick: (id: string)=>void;
}

const colors = [
  '#ff6a56',
  '#fee930',
  '#9cc447',
  '#32dabc',
  '#5fc1e9',
  '#d8d8d8',
];

export const BoardItem: FC<IBoardItem> = ({
  id, icon, text, isActive, onClick,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isMenuClick, setIsMenuClick] = useState<boolean>(false);

  return (
    <button
      className={`board-item ${isActive ? 'board-item--active' : ''}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => { if (!isMenuClick) onClick(id); }}
    >
      <div className="board-item__content">
        <img
          src={`${isActive
            ? icon.replace('item', 'item--active')
            : icon}`}
          alt="ico"
          className="board-item__image"
        />
        <span className="board-item__text">{text}</span>
      </div>
      {
        id !== 'trash' && (
        <Menu
          imageSrc="/svg/dots.svg"
          alt="menu"
          imageSize={22}
          size={24}
          isHide
          isHoverBlock={isHover}
          onClick={() => {
            setIsMenuClick(true);
            console.log('open menu');
          }}
          onMouseEnter={() => setIsMenuClick(true)}
          onMouseLeave={() => setIsMenuClick(false)}
          position="right"
        >
          <ColorPicker colors={colors} onClick={console.log} />
          <MenuButton
            text="Edit board"
            imageSrc="/svg/menu/edit.svg"
            hintText="E"
          />
          <Divider verticalSpacer={7} horizontalSpacer={10} />
          <MenuButton
            text="Card style"
            imageSrc="/svg/menu/rect.svg"
          />
          <MenuButton
            text="Copy link"
            imageSrc="/svg/menu/copy-link.svg"
          />
          <Divider verticalSpacer={7} horizontalSpacer={10} />
          <MenuButton
            text="Add board below"
            imageSrc="/svg/menu/add-board.svg"
          />
          <Divider verticalSpacer={7} horizontalSpacer={10} />
          <MenuButton
            text="Delete"
            imageSrc="/svg/menu/delete.svg"
            hintText="⌫"
          />
        </Menu>
        )
      }
    </button>
  );
};
