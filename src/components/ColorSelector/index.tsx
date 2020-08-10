import React, { FC, useState } from 'react';
import { icons } from '@/icons';

interface IColorSelector {
  color: string;
  onClick: (color: string)=>void;
  isActive: boolean
}

export const ColorSelector: FC<IColorSelector> = ({ color, onClick, isActive }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <button
      className="color-picker__selector"
      style={{
        background: color,
        boxShadow: isHover || isActive
          ? '#ffffff 0 0 0 2px, + 0 0 0 4px'.replace('+', color).replace('+', color)
          : '',
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={() => onClick(color)}
    >
      {
        isActive && isHover && <img src={icons.menu.cross} alt="cross" />
      }
    </button>
  );
};
