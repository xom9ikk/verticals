import React, { FC } from 'react';
import cn from 'classnames';

interface IColorSelector {
  color: string;
  onClick: (color: string) => void;
  isActive: boolean;
}

export const ColorSelector: FC<IColorSelector> = ({
  color,
  isActive,
  onClick,
}) => (
  <button
    className={cn('color-selector', {
      'color-selector--active': isActive,
    })}
    style={{
      // @ts-ignore
      '--color-selector-background': color,
    }}
    onClick={() => onClick(color)}
  >
    { isActive && <img src="/assets/svg/menu/cross.svg" alt="cross" /> }
  </button>
);
