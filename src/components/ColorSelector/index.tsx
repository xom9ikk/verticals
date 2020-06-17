import React, { FC, useState } from 'react';

interface IColorSelector {
  color: string;
  onClick: (color: string)=>void;
}

export const ColorSelector: FC<IColorSelector> = ({ color, onClick }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <button
      className="color-picker__selector"
      style={{
        background: color,
        boxShadow: isHover
          ? '#ffffff 0 0 0 2px, + 0 0 0 4px'.replace('+', color).replace('+', color)
          : '',
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => onClick(color)}
    />
  );
};
