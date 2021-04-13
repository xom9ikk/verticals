import cn from 'classnames';
import React, { FC } from 'react';

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
  const handleClick = () => onClick(color);

  return (
    <button
      className={cn('color-selector', {
        'color-selector--active': isActive,
      })}
      // @ts-ignore
      style={{ '--color-selector-background': color }}
      onClick={handleClick}
    >
      { isActive && <img src="/assets/svg/menu/cross.svg" alt="cross" /> }
    </button>
  );
};
