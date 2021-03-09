import React, { FC } from 'react';
import { useHover } from '@use/hover';

interface IColorSelector {
  color: string;
  onClick: (color: string) => void;
  isActive: boolean;
}

export const ColorSelector: FC<IColorSelector> = ({
  color,
  isActive,
  onClick,
}) => {
  const { isHovering, hoveringProps } = useHover();

  return (
    <button
      {...hoveringProps}
      className="color-picker__selector"
      style={{
        background: color,
        boxShadow: isHovering || isActive
          ? '#ffffff 0 0 0 2px, $ 0 0 0 4px'.replace('$', color)
          : '',
      }}
      onClick={() => onClick(color)}
    >
      { isActive && isHovering && <img src="/assets/svg/menu/cross.svg" alt="cross" /> }
    </button>
  );
};
