import cn from 'classnames';
import React, { FC, SyntheticEvent } from 'react';

interface ICheckbox {
  isActive: boolean;
  onChange: (event: any) => void;
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
}

export const Checkbox: FC<ICheckbox> = ({
  isActive,
  onChange,
  size = 'small',
  style,
}) => {
  const handleClick = (event: SyntheticEvent) => event.stopPropagation();

  return (
    <div
      className={`checkbox checkbox--${size}`}
      style={style}
      onClick={handleClick}
    >
      <input
        type="checkbox"
        className="checkbox__input"
        defaultChecked={isActive}
        onChange={onChange}
      />
      <div className={cn('checkbox__imitator', {
        'checkbox__imitator--active': isActive,
      })}
      >
        <img src="/assets/svg/tick.svg" alt="tick" />
      </div>
    </div>
  );
};
