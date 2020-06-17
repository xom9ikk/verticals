import React, { FC, useEffect, useState } from 'react';
import { OpacityButton } from '../OpacityButton';

interface IBoardItem {
  id: string;
  icon: string;
  text: string;
  isActive: boolean;
  onClick: (id: string)=>void;
}

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
      <OpacityButton
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
      />
    </button>
  );
};
