import cn from 'classnames';
import React, { FC } from 'react';

interface IButton {
  type: 'button' | 'submit',
  modificator?: 'primary' | 'transparent' | 'danger',
  onClick?: (event: React.SyntheticEvent) => void,
  isMaxWidth?: boolean,
  style?: React.CSSProperties,
}

export const Button: FC<IButton> = ({
  type, modificator,
  onClick, isMaxWidth, style, children, ...attrs
}) => (
  <button
    {...attrs}
    className={cn('button', {
      [`button--${modificator}`]: modificator,
      'button--max': isMaxWidth,
    })}
    type={type}
    onClick={onClick}
    style={style}
  >
    <span
      className="button__content"
    >
      {children}
    </span>
  </button>
);
